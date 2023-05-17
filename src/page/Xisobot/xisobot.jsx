import { useEffect, useState } from 'react';
import xisobotIcon from '../../img/icon.svg'
import { host } from '../../content/start';
import './xisobot.scss'

function Xisobot() {
    const [count, setCount] = useState({});

    useEffect(() => {
        fetch(host +  '/history/count')
        .then(re => re.json())
        .then(data => setCount(data))
    }, [setCount]);

    return (  
        <div className='xisobot'>
            <ul>
                <li>
                    <span>Jami O'quvchilar:</span>
                    <p>{count?.user} ta</p>
                    <img src={xisobotIcon} alt="" />
                </li>
                <li>
                    <span>Jami Videolar:</span>
                    <p>{count?.video} ta</p>
                    <img src={xisobotIcon} alt="" />
                </li>
                <li>
                    <span>Jami Yo'nalishlar:</span>
                    <p>{count?.yonalish} ta</p>
                    <img src={xisobotIcon} alt="" />
                </li>
                <li>
                    <span>Jami Kurslar:</span>
                    <p>{count?.course} ta</p>
                    <img src={xisobotIcon} alt="" />
                </li>
            </ul>
        </div>
    );
}

export default Xisobot;