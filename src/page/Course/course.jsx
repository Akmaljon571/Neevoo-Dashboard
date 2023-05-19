import "./course.scss";
import { useEffect, useRef, useState } from "react";
import { host } from "../../content/start";
import dot from "../../img/more.png";
import download from "../../img/bx_download.svg";
import { Popconfirm, Popover, message } from "antd";

function Course() {
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [count, setCount] = useState(0);
  const [one, setOne] = useState({});
  const [update, setUpdate] = useState("");
  const [inputFile, setFile] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const langRef = useRef();
  const categoryRef = useRef();
  const file = useRef();
  const token = JSON.parse(localStorage.getItem("adminToken"));
  const img_url = "https://storage.googleapis.com/course_hunter/";
  const key = "dsfsds";

  useEffect(() => {
    fetch(host + "/categories/list")
      .then((re) => re.json())
      .then((data) => {
        setCategory(data);
        setOne(data[0]);
      });
  }, [count]);

  useEffect(() => {
    if (one?.id) {
      fetch(host + "/courses/bycategory/" + one?.id)
        .then((re) => re.json())
        .then((data) => {
          setCourse(data);
        });
    }
  }, [one]);

  const change = (e) => {
    fetch(host + `/courses/bycategory/${e}`)
      .then((re) => re.json())
      .then((data) => setCourse(data));
  };

  const deleteCourse = (id) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    fetch(host + `/courses/delete/${id}`, {
      method: "DELETE",
      headers: {
        autharization: token,
        "Content-Type": "application/json",
      },
    }).then((data) => {
      if (data.ok) {
        setCount(count + 1);
        setTimeout(() => {
          messageApi.open({
            key,
            type: "success",
            content: "Loaded!",
            duration: 2,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          messageApi.open({
            key,
            type: "error",
            content: "Loaded!",
            duration: 2,
          });
        }, 1000);
      }
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const send = (e) => {
    e.preventDefault();

    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });

    const title = titleRef.current.value;
    const category = categoryRef.current.value;
    const lang = langRef.current.value;
    const description = descriptionRef.current.value;
    const filePhoto = file.current.files[0];

    if (title && category && lang && description && filePhoto) {
      let formData = new FormData();
      formData.append("file", filePhoto);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("lang", lang);
      formData.append("description", description);

      fetch(host + "/courses/create", {
        method: "POST",
        headers: {
          autharization: token,
        },
        body: formData,
      }).then((data) => {
        if (data.ok) {
          setCount(count + 1);
          setTimeout(() => {
            messageApi.open({
              key,
              type: "success",
              content: "Loaded!",
              duration: 2,
            });
          }, 1000);
        } else {
          setTimeout(() => {
            messageApi.open({
              key,
              type: "error",
              content: "Loaded!",
              duration: 2,
            });
          }, 1000);
        }
      });
    } else {
      setTimeout(() => {
        messageApi.open({
          key,
          type: "error",
          content: "Malumot kiriting!",
          duration: 2,
        });
      }, 1000);
    }
  };

  const updateCourse = async (id) => {
    const course_title = titleRef.current.value;
    const course_lang = langRef.current.value;
    const course_description = descriptionRef.current.value;
    const newFile = file.current.value;
    if (newFile === "") {
      fetch(host + "/courses/update/" + id, {
        method: "PATCH",
        headers: {
          autharization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: course_title,
          lang: course_lang,
          description: course_description,
        }),
      }).then((re) => {
        if (re.ok) {
          setUpdate("");
          setCount(count + 1);
          setTimeout(() => {
            messageApi.open({
              key,
              type: "success",
              content: "Loaded!",
              duration: 2,
            });
          }, 1000);
        } else {
          setTimeout(() => {
            messageApi.open({
              key,
              type: "error",
              content: "Loaded!",
              duration: 2,
            });
          }, 1000);
        }
      });
    } else {
      const formData = new FormData();
      formData.append("title", course_title);
      formData.append("lang", course_lang);
      formData.append("description", course_description);
      formData.append("file", file);

      fetch(host + "/courses/update/" + id, {
        method: "PATCH",
        headers: {
          autharization: token,
        },
        body: formData,
      }).then((re) => {
        if (re.ok) {
          setUpdate("");
          setCount(count + 1);
          setTimeout(() => {
            messageApi.open({
              key,
              type: "success",
              content: "Loaded!",
              duration: 2,
            });
          }, 1000);
        } else {
          setTimeout(() => {
            messageApi.open({
              key,
              type: "error",
              content: "Loaded!",
              duration: 2,
            });
          }, 1000);
        }
      });
    }
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      const course_title = titleRef.current.value;
      const course_lang = langRef.current.value;
      const course_description = descriptionRef.current.value;
      const newFile = file.current.value;
      messageApi.open({
        key,
        type: "loading",
        content: "Loading...",
      });

      if (newFile === "") {
        fetch(host + "/courses/update/" + id, {
          method: "PATCH",
          headers: {
            autharization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: course_title,
            lang: course_lang,
            description: course_description,
          }),
        }).then((re) => {
          if (re.ok) {
            setUpdate("");
            setCount(count + 1);
            setTimeout(() => {
              messageApi.open({
                key,
                type: "success",
                content: "Loaded!",
                duration: 2,
              });
            }, 1000);
          } else {
            setTimeout(() => {
              messageApi.open({
                key,
                type: "error",
                content: "Loaded!",
                duration: 2,
              });
            }, 1000);
          }
        });
      } else {
        const formData = new FormData();
        formData.append("title", course_title);
        formData.append("lang", course_lang);
        formData.append("description", course_description);
        formData.append("file", file);

        fetch(host + "/courses/update/" + id, {
          method: "PATCH",
          headers: {
            autharization: token,
          },
          body: formData,
        }).then((re) => {
          if (re.ok) {
            setCount(count + 1);
            setTimeout(() => {
              messageApi.open({
                key,
                type: "success",
                content: "Loaded!",
                duration: 2,
              });
            }, 1000);
            setUpdate("");
          } else {
            setTimeout(() => {
              messageApi.open({
                key,
                type: "error",
                content: "Loaded!",
                duration: 2,
              });
            }, 1000);
          }
        });
      }
    }
  };

  const handleChangeUpdate = (id) => {
    setUpdate(id);
  };

  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <>
      <div className="course">
        <h2>Yangi o’quvchi qo’shish</h2>
        {contextHolder}
        <form>
          <div>
            <p>Course nomi</p>
            <input ref={titleRef} type="text" placeholder="Nomi" />
          </div>

          <div>
            <p>Course tili</p>
            <select ref={langRef} name="">
              <option value="uz">Uz</option>
              <option value="en">Ru</option>
              <option value="ru">En</option>
            </select>
          </div>

          <div>
            <p>Course category</p>
            <select ref={categoryRef}>
              {category &&
                category.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  );
                })}
            </select>
          </div>

          <label>
            <p>Course yuklash</p>
            <p className="file">
              {inputFile?.name ? inputFile?.name : "Yuklash"}
              <img src={download} alt="" />
            </p>
            <input
              ref={file}
              onChange={handleFileChange}
              style={{ display: "none" }}
              type="file"
              placeholder="Yuklash"
            />
          </label>

          <div className="box">
            <p>Course description </p>
            <textarea ref={descriptionRef} placeholder="Description"></textarea>
          </div>

          <div>
            <button onClick={send}>Qo’shish</button>
          </div>
        </form>

        <div className="wrapper">
          <div>
            <select
              style={{ cursor: "pointer" }}
              name=""
              onClick={(e) => change(e.target.value)}
            >
              {category &&
                category.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <ul>
          <li>
            <p style={{ display: "flex", gap: "70px", alignItems: "center" }}>
              № <span style={{ margin: 0 }}>Image</span>
            </p>

            <p>Title</p>
            <p>Language</p>
            <p>Description</p>
            <p className="more">More</p>
          </li>
          {course &&
            course.map((e, i) => {
              return (
                <li
                  className={i % 2 !== 0 ? "list_item2" : `list_item`}
                  key={e.id}
                >
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "18px",
                    }}
                  >
                    {++i}{" "}
                    {update !== e.id ? (
                      <img
                        style={{
                          borderRadius: "5px",
                          marginRight: "90px",
                          marginTop: "10px",
                        }}
                        src={img_url + e.image}
                        alt=""
                        width={50}
                        height={50}
                      />
                    ) : (
                      <label className="file_img" style={{ marginTop: "20px" }}>
                        <p className="filee">
                          <img
                            style={{ margin: "0px" }}
                            src={download}
                            alt=""
                          />
                          {inputFile?.name ? inputFile?.name : "Rasm"}
                        </p>
                        <input
                          ref={file}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          type="file"
                          placeholder="Yuklash"
                        />
                      </label>
                    )}
                  </p>

                  {update !== e.id ? (
                    <p> {e.title}</p>
                  ) : (
                    <input
                      className="update_inp"
                      ref={titleRef}
                      defaultValue={e.title}
                      onKeyUp={(evt) => handleKeyUp(evt, e.id)}
                    />
                  )}
                  {update !== e.id ? (
                    <p>{e.lang}</p>
                  ) : (
                    <select
                      ref={langRef}
                      style={{ marginLeft: "28px" }}
                      className="update_inp"
                    >
                      <option value="uz">Uz</option>
                      <option value="en">En</option>
                      <option value="ru">Ru</option>
                    </select>
                  )}
                  {update !== e.id ? (
                    <p
                      style={{
                        height: "40px",
                        overflow: "auto",
                        marginTop: "7px",
                      }}
                    >
                      {e.description}
                    </p>
                  ) : (
                    <input
                      ref={descriptionRef}
                      onKeyUp={(evt) => handleKeyUp(evt, e.id)}
                      style={{ marginLeft: "28px" }}
                      className="update_inp"
                      defaultValue={e.description}
                    />
                  )}
                  {update !== e.id ? (
                    <Popover
                      content={
                        <div>
                          <div>
                            <button
                              className="upd"
                              onClick={() => handleChangeUpdate(e.id)}
                            >
                              Update
                            </button>
                          </div>
                          <Popconfirm
                            title="O'chirmoqchimisz?"
                            onConfirm={() => deleteCourse(e.id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button className="dlt">Delete</button>
                          </Popconfirm>
                        </div>
                      }
                      trigger="click"
                    >
                      <img src={dot} alt="" width={20} height={20} />
                    </Popover>
                  ) : (
                    <div className="flex">
                      <button
                        className="btn_update"
                        style={{ background: "#d21111" }}
                        onClick={handleChangeUpdate}
                      >
                        cancel
                      </button>{" "}
                      <button
                        onClick={() => updateCourse(e.id)}
                        className="btn_update"
                        style={{ background: "11d255" }}
                      >
                        send
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default Course;
