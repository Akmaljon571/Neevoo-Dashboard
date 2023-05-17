import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { host } from './content/start';
import { useNavigate } from 'react-router-dom';

function Public() {
    const [messageApi, contextHolder] = message.useMessage();
    const emailInput = useRef()
    const passwordInput = useRef()
    const [count, setCount] = useState(0);
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('adminToken'))
        if (token) {
            window.location.reload(true)
        } else {
            navigate('/')
        }
    }, [count, navigate]);

    const clickHandle = () => {
        const key = 'updatable';
        const email = String(emailInput.current.value)
        const password = String(passwordInput.current.value)

        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        
        if (email && password) {
            fetch(host + '/users/login/admin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(re => re.json())
            .then(data => {
                if (data.status === 201) {
                    localStorage.setItem('adminToken', JSON.stringify(data.token))
                    setCount(count + 1)
                } else {
                    setTimeout(() => {
                        messageApi.open({
                          key,
                          type: 'error',
                          content: "Siz Admin emassiz!",
                          duration: 2,
                        });
                      }, 1000);
                }
            })
        } else {
            setTimeout(() => {
                messageApi.open({
                  key,
                  type: 'error',
                  content: "Ma'lumot To'lliq kiriting!",
                  duration: 2,
                });
              }, 1000);
        }
    }

    return ( 
        <div className="login">
            <h1>Kirish</h1>
            <input ref={emailInput} type="email" placeholder="E-mail" />
            <input ref={passwordInput} type="password" placeholder="*****" />
            <button onClick={clickHandle}>Kirish</button>
            {contextHolder}
        </div>   
    );
}

export default Public;