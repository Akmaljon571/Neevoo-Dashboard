import { useRef, useState } from "react";
import "./category.scss";
import { ImageIcon } from "../../assets/icons";
import axios from "../../utils/axios";
import CategoryList from "./category_list";

function Category() {
  const [file, setFile] = useState();
  const shef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const token = localStorage.getItem("adminToken");

  const submit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("file", file);

    let response = await axios.post("/categories/create", formData);
    console.log(response);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="categories">
      <h2 className="category_title">Yangi o’quvchi qo’shish</h2>
      <form action="" onSubmit={submit}>
        <div className="title_wrapper">
          <label>
            <span className="span_category">kategoriya nomi</span>
            <input
              ref={titleRef}
              className="title_input"
              type="text"
              placeholder="category name"
            />
          </label>
          <div className="area">
            <p className="p span_category">Course description </p>
            <textarea
              className="textarea title_input"
              name=""
              ref={descriptionRef}
              placeholder="Description"
            ></textarea>
          </div>
          <label>
            <span className="span_category">kategoriya rasmi</span>
            <p className="title_input">
              <span className="placeholder_title">
                <ImageIcon />
              </span>
              <i className="file_name"> {file?.name ? file.name : "Yuklash"}</i>
            </p>
            <input
              className="title_input"
              style={{ display: "none" }}
              ref={shef}
              type="file"
              onChange={handleFileChange}
              placeholder="category image"
            />
          </label>
        </div>
        <div className="box">
          <div className="div">
            <button className="add_button">
              <p className="button_text">Qo'shish</p>
            </button>
          </div>
        </div>
      </form>
      <CategoryList />
    </div>
  );
}

export default Category;
