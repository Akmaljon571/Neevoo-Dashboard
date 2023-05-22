import { useRef, useState } from "react";
import "./category.scss";
import { ImageIcon } from "../../assets/icons";
import axios from "../../utils/axios";
import CategoryList from "./category_list";
import { message } from "antd";

function Category() {
  const [file, setFile] = useState('');
  const shef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [count, setCount] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const submit = async (e) => {
    e.preventDefault();
    let title = titleRef.current.value.trim();
    let description = descriptionRef.current.value.trim();

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    if (title !== "" && description !== "" &&  file !== '') {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);
      let result = await axios.post("/categories/create", formData);
      if (result) {
        setCount(count + 1)
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'success',
            content: 'Loaded!',
            duration: 2,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'error',
            content: "Malumot qoshilmadi!",
            duration: 2,
          });
        }, 1000);
      }
    } else {
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'error',
          content:  "Ma'lumotlar kirit!",
          duration: 2,
        });
      }, 1000);
    }
    titleRef.current.value = ''
    descriptionRef.current.value = ''
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="categories">
      {contextHolder}
      <h2 className="category_title">Yangi o’quvchi qo’shish</h2>
      <form action="" onSubmit={submit}>
        <div className="title_wrapper">
          <label>
            <span className="span_category">Kategoriya nomi</span>
            <input
              ref={titleRef}
              className="title_input"
              type="text"
              placeholder="Category name"
            />
          </label>
          <div className="area">
            <p className="p span_category">Course description </p>
            <textarea
              className="textarea title_input"
              ref={descriptionRef}
              placeholder="Description"
            ></textarea>
          </div>
          <label>
            <span className="span_category">Kategoriya rasmi</span>
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
          <div className="div__button">
            <button className="add_button">
              <p className="button_text">Qo'shish</p>
            </button>
          </div>
        </div>
      </form>
      <CategoryList>{count}</CategoryList>
    </div>
  );
}

export default Category;
