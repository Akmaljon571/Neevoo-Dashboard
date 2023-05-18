import { useEffect, useRef, useState } from "react";
import { host } from "../../content/start";
import search from "../../img/search.svg";
import dot from "../../img/more.png";
import download from "../../img/bx_download.svg";
import "./course.scss";
import { Popover } from "antd";

function Course() {
  const [category, setCategory] = useState([]);
  const [course, setCourse] = useState([]);
  const [count, setCount] = useState(0);
  const [one, setOne] = useState({});

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
    const token = JSON.parse(localStorage.getItem("adminToken"));
    fetch(host + `/courses/delete/${id}`, {
      method: "DELETE",
      headers: {
        autharization: token,
      },
    })
      .then((data) => setCount(count + 1));
  };


  return (
    <>
      <div className="course">
        <h2>Yangi o’quvchi qo’shish</h2>

        <form>
          <div>
            <p>Course nomi</p>
            <input type="text" name="" placeholder="Nomi" />
          </div>

          <div>
            <p>Course tili</p>
            <select name="">
              <option value="uz">Uz</option>
              <option value="en">Ru</option>
              <option value="ru">En</option>
            </select>
          </div>

          <div>
            <p>Course category</p>
            <input type="text" name="" placeholder="Category" />
          </div>

          <label style={{ marginTop: "20px" }}>
            <p>Course yuklash</p>
            <p className="file">
              Yuklash
              <img src={download} alt="" />
            </p>
            <input
              style={{ display: "none" }}
              type="file"
              name=""
            />
          </label>

          <div className="box">
            <p>Course description </p>
            <textarea name="" placeholder="Description"></textarea>
          </div>

          <div>
            <button>Qo’shish</button>
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
            <img src={search} alt="search img" />
            <input type="search" name="" placeholder="Search" />
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
