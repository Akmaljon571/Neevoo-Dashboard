import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, message, Result, Popover } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { host } from '../../../content/start'
import dot from "../../../img/more.png";

function ListVideo() {
  const [coursId, setCourseId] = useState(0);
  const img_url = 'https://storage.googleapis.com/course_hunter/'
  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable'
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(0)
  const [video, setVideo] = useState([])
  const token = JSON.parse(localStorage.getItem('adminToken'))
  const [course, setCourse] = useState([])
  const shef = useRef()

  useEffect(() => {
    fetch(host + '/courses')
      .then(re => re.json())
      .then(data => {
        setCourse(data)
        if (!course.length) {
          setCourseId(data[0].id)
        }
      })
  }, [setCourse, token, count])

  useEffect(() => {
    if (coursId) {
      fetch(host + '/video/by_course/' + coursId, {
        headers: {
          autharization: token,
          "Content-Type": "application/json",
        }
      })
        .then(re => re.json())
        .then(data => setVideo(data))
    }
  }, [coursId, setVideo, token, count])

  const videoDelete = id => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    fetch(host + '/video/delete/' + id, {
      method: 'DELETE',
      headers: {
        autharization: token,
        "Content-Type": "application/json",
      }
    }).then(baza => {
      if (baza.ok) {
        setCount(count + 1)
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
  }

  const cancel = e => {
    message.error('Click on No')
  }

  const handleOpenVideo = (link) => {
    setActive(true)
    setTimeout(() => {
      shef.current.src = img_url + link
      shef.current.load();
      console.log(shef)
    }, 10);
  }

  return (
    <>
      {contextHolder}
      <select
        className='videoSelect'
        onClick={e => setCourseId(e?.target?.value)}
      >
        {course.length
          ? course.map((e, i) => (
            <option key={i} value={e?.id}>
              {e?.title}
            </option>
          ))
          : null}
      </select>
      <table className='table'>
        <thead>
          <tr>
            <th style={{ width: '10px' }} className='th'>№</th>
            <th className='th'>Title</th>
            <th className='th'>Daqiqa...</th>
            <th className='th'>Ketma-Ketligi</th>
            <th className='th'>More</th>
          </tr>
        </thead>
        <tbody>
          {video.length ? (
            video.map((e, i) => (
              <tr key={i}>
                <td onClick={() => handleOpenVideo(e.link)}>{i + 1}</td>
                <td onClick={() => handleOpenVideo(e.link)} style={{ fontWeight: 700 }}>{e.text}</td>
                <td onClick={() => handleOpenVideo(e.link)}>{e.duration}</td>
                <td onClick={() => handleOpenVideo(e.link)}>{e.sequence} chi</td>
                <td>

                  <Popover
                    content={
                      <div>
                        <div>
                          <button className="upd">Update</button>
                        </div>
                        <Popconfirm
                          title="O'chirmoqchimisz?"
                          onConfirm={() => videoDelete(e.id)}
                          onCancel={cancel}
                          okText='Yes'
                          cancelText='No'
                        >
                          <button
                            className="dlt"
                          >
                            Delete
                          </button>
                        </Popconfirm>
                      </div>
                    }
                    trigger="click"
                  >
                    <img src={dot} alt="" width={20} height={20} />
                  </Popover>
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
      {active ? (
        <>
          <video
            controls
            ref={shef}
            muted
            onCanPlayThrough={() => shef.current.play()}
            autoPlay={'autoplay'}
            preload='auto'
            loop
            className='video_tag'
          >
            <source src={''} type='video/mp4' />
          </video>
          <span onClick={() => setActive(false)} className='video_fixed'></span>
        </>
      ) : null}
    </>
  )
}

export default ListVideo
