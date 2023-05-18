import { useEffect, useRef, useState } from "react";
import { host } from "../../content/start";
import search2 from "../../img/search.svg";
import dot from "../../img/more.png";
import download from "../../img/bx_download.svg";
import "./course.scss";
import { Popover } from "antd";
import axios from "../../utils/axios";

function Course() {
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState([]);
  const [count, setCount] = useState(0);
  const [one, setOne] = useState({});
  const [file, setFile] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const langRef = useRef();
  const shef = useRef();
  const categoryRef = useRef();
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
          console.log(data);
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

  const send = () => {
    const title = titleRef.current.value;
    const categoryRef = titleRef.current.value;
    const langRef = titleRef.current.value;
    const descriptionRef = titleRef.current.value;
    const file = photo.current.files[0];

    if (titleRef && categoryRef && langRef && descriptionRef && file) {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("category ", category);
      formData.append("lang", langRef);
      formData.append("description", descriptionRef);
      formData.append("file", file);

      fetch(host + "/courses/create", {
        method: "POST",
        headers: {
          autharization: token,
        },
        body: formData,
      }).then((data) => {
        if (data.ok) {
          setCount(count + 1);
        }
      });
    }
  };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       autharization: token,
  //     },
  //     body: formData,
  //   };

  //   let response = await axios.post("/courses/create", formData);
  //   console.log(response);
  //   // fetch(host + "/categories/create", requestOptions)
  //   //   .then((re) => re.ok && re.json())
  //   //   .then((data) => console.log(data));
  // };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };



  return (
    <>
      <div className="course">
        <h2>Yangi o’quvchi qo’shish</h2>

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
            <input ref={categoryRef} type="text" placeholder="Category" />
          </div>

          <label style={{ marginTop: "20px" }}>
            <p>Course yuklash</p>
            <p className="file">
              Yuklash
              <img src={download} alt="" />
            </p>
            <input
              ref={shef}
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
            <input
              type="search"
              ref={input}
              placeholder="Search"
            />
          </div>
        </div>

        <ul>
          <li>
            <p>№</p>
            <p>Title</p>
            <p>Language</p>
            <p>Description</p>
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
                        <button
                          onClick={() => deleteCourse(e?.id)}
                          className="dlt"
                        >
                          Delete
                        </button>
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
