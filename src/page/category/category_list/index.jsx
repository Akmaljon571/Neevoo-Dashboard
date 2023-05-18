import { useEffect, useState } from "react"
import { host } from "../../../content/start"
import {Popover} from 'antd'
import dot from '../../../img/more.png'
import './list.scss'
import axios from "axios"


function CategoryList() {
    const [categories, setCategories] = useState([])
    const [state, setState] = useState(0)
    const token = localStorage.getItem('adminToken')
      useEffect(() => {
      fetch(host +  '/categories/list')
      .then(re => re.json())
      .then(data => {
        data.length ? setCategories(data) : setCategories([])
        setState(state + 1)
      })
  }, [state])

  const deleteCategory = async(id) => {
    console.log(token);
    fetch(host + `/categories/delete/${id}`, {
        method: "DELETE",
        headers: {
            autharization: JSON.parse(token)
        }
      })
        .then((res) => res.json())
        .then((data) => setState(state + 1))
        .catch((err) => console.log(err));
    console.log(id);
  }

  return (
    <div className="list__wrapper">
        <h2>Mavjud Kategoriyalar</h2>
        <ul>
          <li>
            <p>№</p>
            <p>Title</p>
            <p>Language</p>
            <p>Description</p>
          </li>
          {categories.length &&
            categories.map((e, i) => {
              return (
                <li
                  className={i % 2 !== 0 ? "list_item2" : `list_item`}
                  key={e.id}
                >
                  <p>{++i}</p>
                  <p>{e?.title}</p>
                  <p>{e?.description}</p>
                  <Popover
                    content={
                      <div>
                        <div>
                          <button className="upd">Update</button>
                        </div>
                        <button
                          onClick={() => deleteCategory(e?.id)}
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
  )
}
export default CategoryList