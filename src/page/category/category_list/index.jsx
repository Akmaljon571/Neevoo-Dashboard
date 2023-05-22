import { useEffect, useRef, useState } from "react";
import { host } from "../../../content/start";
import { Popover, Popconfirm, Result, message } from "antd";
import dot from "../../../img/more.png";
import search from "../../../img/search.svg";
import "./list.scss";
import axios from "axios";

function CategoryList({ children }) {
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState(0);
  const [beforeValue, setBeforeValue] = useState(categories)
  const [changeTag, setChangeTag] = useState("");
  const [file, setFile] = useState();
  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable'

  const token = localStorage.getItem("adminToken");
  const img_url = "https://storage.googleapis.com/course_hunter/";

  const updateTitleRef = useRef();
  const updateDescRef = useRef();

  const handleSearch = async (e) => {
    await fetch(host + `/categories/${e.target.value}`, {
      method: "GET",
      headers: {
        autharization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (e.target.value !== '') {
          setCategories(data)
        } else {
          setCategories(beforeValue)
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(host + "/categories/list")
      .then((re) => re.json())
      .then((data) => {
        setBeforeValue(data)
        setCategories(data)
      });
  }, [state, children]);

  const deleteCategory = async (id) => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })

    fetch(host + `/categories/delete/${id}`, {
      method: "DELETE",
      headers: {
        autharization: JSON.parse(token),
      },
    })
      .then((re) => {
        if (re.ok) {
          setState(state + 1)
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: 'Loaded!',
              duration: 2
            })
          }, 1000)
        } else {
          messageApi.open({
            key,
            type: 'error',
            content: 'Loaded!',
            duration: 2
          })
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    setChangeTag(id);
  };

  const cancelUpdate = () => {
    setChangeTag(!changeTag);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdateCategory = async (id) => {
    const title = updateTitleRef.current.value;
    const description = updateDescRef.current.value;

    if (!file) {
      const updateData = {
        title,
        description,
        image: file,
      };

      await axios.patch(host + `/categories/update/${id}`, updateData);
      setChangeTag(!changeTag);
      setState(state + 1)
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      await axios.patch(host + `/categories/update/${id}`, formData);
      setChangeTag(!changeTag);
      setState(state + 1)
    }
  };

  return (
    <div className="list__wrapper">
      {contextHolder}
      <div className="list__header">
        <h2 className="list__title">Mavjud Kategoriyalar</h2>
        <div className="absulute">
          <img src={search} alt="search img" />
          <input
            type="search"
            onChange={handleSearch}
            name=""
            placeholder="Search"
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "10px" }} className="th">№</th>
            <th className="th">Title</th>
            <th className="th">Description</th>
            <th className="th" style={{ marginLeft: "220px", marginRight: "60px" }}>Image</th>
            <th className="th" style={{ marginRight: "-700px" }}>More</th>
          </tr>
        </thead>
        <tbody>
          {categories.length ? 
            categories.map((e, i) => 
              <tr 
                  className={i % 2 !== 0 ? "list_item2" : `list_item`}
                  key={e.id}
                  style={{ width: "50px", textAlign: "start" }}
              >
                  <td>
                    {++i}
                  </td>
                  <td>
                    {changeTag !== e.id ? 
                      <>
                        {e?.title}
                      </>
                     : (
                      <input
                        style={{ marginLeft: "-2px" }}
                        defaultValue={e.title}
                        ref={updateTitleRef}
                        className="edit_input"
                      />
                    )}
                  </td>
                  <td>
                    {changeTag !== e.id ? 
                    <>
                      {e?.description}
                    </>
                    : (
                      <input
                        defaultValue={e.description}
                        ref={updateDescRef}
                        className="edit_input"
                      />
                    )}
                  </td>
                  <td>
                      {changeTag !== e.id ? (
                        <img
                          width={50}
                          height={50}
                          src={img_url + e.image}
                          alt="category_image"
                        />
                      ) : (
                        <label className="label_updateImg">
                          <img
                            width={30}
                            height={30}
                            style={{ marginLeft: "320px" }}
                            src={img_url + e.image}
                            alt=""
                          />
                          <i style={{display: 'block', marginLeft: "320px"}}>Update Image</i>
                          <input
                            style={{ marginLeft: "200px", display: "none" }}
                            onChange={handleFileChange}
                            type="file"
                          />
                        </label>
                      )}
                  </td>
                  <td>
                    {changeTag !== e.id ? (
                      <Popover
                        trigger="click"
                        content={
                          <div>
                            <div>
                              <button
                                onClick={() => handleEdit(e.id)}
                                className="upd"
                              >
                                Update
                              </button>
                            </div>

                            <Popconfirm
                              title="Kategorini o`chirmoqchimisiz"
                              onConfirm={() => deleteCategory(e.id)}
                              onCancel={() => {}}
                              okText="Yes"
                              cancelText="No"
                            >
                              <button className="dlt">Delete</button>
                            </Popconfirm>
                          </div>
                        }
                      >
                        <img src={dot} alt="" width={20} height={20} />
                      </Popover>
                    ) : (
                      <div className="box_editButton">
                        <button
                          className="edit_button"
                          style={{ backgroundColor: "red" }}
                          onClick={cancelUpdate}
                        >
                          cancel
                        </button>
                        <button
                          className="edit_button"
                          style={{ backgroundColor: "blue" }}
                          onClick={() => handleUpdateCategory(e.id)}
                        >
                          update
                        </button>
                      </div>
                    )}
                  </td>
              </tr>
            ) : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              />
            )}
        </tbody>
      </table>
    </div>
  );
}
export default CategoryList;
