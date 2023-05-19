import React, { useEffect, useRef, useState } from "react";
import { host } from "../../content/start";

import { DeleteIcon } from "../../assets/icons";

import "./users.scss";
import { Popconfirm, Result, message } from "antd";
const Users = () => {
    const key = "updatable";

    const [ActiveUsers, setActiveUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [openModal, setOpenModal] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const month = useRef();
    const price = useRef();
    const user = useRef();

    useEffect(() => {
        fetch(host + `/take/all`, {
            headers: {
                accept: "*/*",
                autharization: JSON.parse(localStorage.getItem("adminToken")),
            },
        })
            .then((res) => res.json())
            .then((data) => setActiveUsers(data));
    }, [allUsers]);

    useEffect(() => {
        fetch(host + `/users/admin/getall`, {
            headers: {
                accept: "*/*",
                autharization: JSON.parse(localStorage.getItem("adminToken")),
            },
        })
            .then((res) => res.json())
            .then((data) => setAllUsers(data));
    }, [ActiveUsers]);

    const setActive = (evt) => {
        messageApi.open({
            key,
            type: "loading",
            content: "Loading...",
        });

        evt.preventDefault();
        const token = JSON.parse(localStorage.getItem("adminToken"));
        const obj = {
            month: Number(month.current.value),
            price: price.current.value,
            user: user.current.value,
        };
        fetch(host + `/take/create`, {
            method: "POST",
            headers: {
                autharization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        }).then((res) => {
            console.log(res);
            res.status === 201
                ? setTimeout(() => {
                      messageApi.open({
                          key,
                          type: "success",
                          content: "Loaded!",
                          duration: 2,
                      });
                  }, 1000)
                : setTimeout(() => {
                      messageApi.open({
                          key,
                          type: "error",
                          content: "Loaded!",
                          duration: 2,
                      });
                  }, 1000);
        });
    };

    const handleDelete = (id) => {
        console.log(id);

        messageApi.open({
            key,
            type: "loading",
            content: "Loading...",
        });

        fetch(host + `/take/delete/${id}`, {
            method: "DELETE",
            headers: {
                autharization: JSON.parse(localStorage.getItem("adminToken")),
                accept: "*/*",
            },
        }).then((res) => {
            res.status === 204
                ? setTimeout(() => {
                      messageApi.open({
                          key,
                          type: "success",
                          content: "Loaded!",
                          duration: 2,
                      });
                  }, 1000)
                : setTimeout(() => {
                      messageApi.open({
                          key,
                          type: "error",
                          content: "Loaded!",
                          duration: 2,
                      });
                  }, 1000);
        });
    };
    return (
        <>
            <div className="users">
                <h2 className="users__title">Yangi o'quvchi qo'shish</h2>
                {contextHolder}

                <form className="users__form ">
                    <label className="users__form__label">
                        <p className="users__form__label__p">Course Muddati</p>
                        <select
                            className="users__form__label__select"
                            ref={month}
                        >
                            <option value="3">3 oy</option>
                            <option value="6">6 oy</option>
                            <option value="9">9 oy</option>
                            <option value="12">12 oy</option>
                        </select>
                    </label>

                    <label className="users__form__label">
                        <p className="users__form__label__p">Course Narxi</p>
                        <select
                            className="users__form__label__select"
                            ref={price}
                        >
                            <option value="300">100 ming</option>
                            <option value="600">200 ming</option>
                            <option value="900">300 ming</option>
                            <option value="1200">400 ming</option>
                            <option value="1300">500 ming</option>
                        </select>
                    </label>

                    <label className="users__form__label">
                        <p className="users__form__label__p">Userlar</p>
                        <select
                            className="users__form__label__select"
                            ref={user}
                        >
                            {allUsers &&
                                allUsers.map((user, i) => (
                                    <option value={user.id} key={user.id}>
                                        {user.email}
                                    </option>
                                ))}
                        </select>
                    </label>

                    <button className="users__form__button" onClick={setActive}>
                        Qo’shish
                    </button>
                </form>

                <table className="users__table">
                    <thead className="users__table__thead">
                        <tr className="users__table__thead__tr">
                            <th className="users__table__thead__tr__th">№</th>
                            <th className="users__table__thead__tr__th">
                                Email
                            </th>
                            <th className="users__table__thead__tr__th">
                                Price
                            </th>
                            <th className="users__table__thead__tr__th">
                                Month
                            </th>
                            <th className="users__table__thead__tr__th"></th>
                        </tr>
                    </thead>
                    <tbody className="users__table__tbody">
                        {ActiveUsers.length ? (
                            ActiveUsers.map((user, i) => (
                                <tr
                                    className={`users__table__tbody__tr  ${
                                        i % 2 === 0 ? "light" : "dark"
                                    }`}
                                    key={user.id}
                                >
                                    <td className="users__table__tbody__tr__td">
                                        {++i}
                                    </td>
                                    <td className="users__table__tbody__tr__td">
                                        {user.take_user.email}
                                    </td>
                                    <td className="users__table__tbody__tr__td">
                                        {user.price}
                                    </td>
                                    <td className="users__table__tbody__tr__td">
                                        {user.month}
                                    </td>
                                    <td className="users__table__tbody__tr__td">
                                        <Popconfirm
                                            title="O'chirmoqchimisz?"
                                            onConfirm={() =>
                                                handleDelete(user.id)
                                            }
                                            onCancel={() => {}}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className="users__table__tbody__tr__td__button">
                                                <DeleteIcon />
                                            </button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                              <td></td>
                              <td></td>
                              <td>
                                <Result
                                  status='404'
                                  title='404'
                                  subTitle='Sorry, the page you visited does not exist.'
                                />
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                          )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Users;
