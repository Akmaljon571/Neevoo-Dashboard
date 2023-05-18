import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, message, Result } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { host } from '../../../content/start'

function ListVideo(obj) {
  const [coursId, setCourseId] = useState(obj.children);
  const img_url = 'https://storage.googleapis.com/course_hunter/'
  const [messageApi, contextHolder] = message.useMessage()
  const [active, setActive] = useState(false)
  const [video, setVideo] = useState([])
  const token = JSON.parse(localStorage.getItem('adminToken'))
  const key = 'updatable'
  const [course, setCourse] = useState([])
  const videoRef = useRef(null)

  useEffect(() => {
    fetch(host + '/courses')
      .then(re => re.json())
      .then(data => {
        setCourse(data)
        setCourseId(data[0].id)
      })
  }, [setCourse, token,])

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
  }, [coursId, setVideo, token])

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
    // videoRef.current?.src = img_url + link
    // videoRef.current.load();
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
              <tr onClick={() => handleOpenVideo(e.link)} key={i}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 700 }}>{e.text}</td>
                <td>{e.duration}</td>
                <td>{e.sequence} chi</td>
                <td>
                  <Popconfirm
                    title="O'chirmoqchimisz?"
                    onConfirm={() => videoDelete(e.video_id)}
                    onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <DeleteOutlined
                      style={{
                        color: 'red',
                        cursor: 'pointer',
                        fontSize: '22px'
                      }}
                    />
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
      {active ? (
        <>
          <video
            controls
            muted
            onCanPlayThrough={() => videoRef.current?.play()}
            ref={videoRef}
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
