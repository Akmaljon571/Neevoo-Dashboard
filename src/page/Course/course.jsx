import { useEffect, useRef, useState } from "react";
import { host } from "../../content/start";
import search2 from "../../img/search.svg";
import dot from "../../img/more.png";
import download from "../../img/bx_download.svg";
import "./course.scss";
import { Popconfirm, Popover, message } from "antd";
import axios from "../../utils/axios";

function Course() {
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [count, setCount] = useState(0);
  const [one, setOne] = useState({});
  const [inputFile, setFile] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const langRef = useRef();
  // const shef = useRef();
  const key = "dsfsds";
  const categoryRef = useRef();
  const file = useRef();
  const input = useRef();
  const token = JSON.parse(localStorage.getItem("adminToken"));

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
    fetch(host + `/courses/delete/${id}`, {
      method: "DELETE",
      headers: {
        autharization: token,
        "Content-Type": "application/json",
      },
    }).then(() => setCount(count - 1));
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
          content: "Loaded!",
          duration: 2,
        });
      }, 1000);
    }
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

          <label style={{ marginTop: "20px" }}>
            <p>Course yuklash</p>
            <p className="file">
              Yuklash
              <img src={download} alt="" />
            </p>
            <p>{inputFile?.title}</p>
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
          <div className="absulute">
            <img src={search2} alt="search img" />
            <input type="search" ref={input} placeholder="Search" />
          </div>
        </div>

        <ul>
          <li>
            <p>№</p>
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
                  <p>{++i}</p>
                  <p>{e.title}</p>
                  <p>{e.lang}</p>
                  <p>{e.description}</p>
                  <Popover
                    content={
                      <div>
                        <div>
                          <button className="upd">Update</button>
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
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default Course;
