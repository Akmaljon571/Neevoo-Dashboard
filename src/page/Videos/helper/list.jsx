import { Popconfirm, message, Result, Popover } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { host } from '../../../content/start'
import dot from "../../../img/more.png";

function ListVideo({children}) {
  const img_url = 'https://storage.googleapis.com/course_hunter/'
  const [coursId, setCourseId] = useState(0);
  const [messageApi, contextHolder] = message.useMessage()
  const [active, setActive] = useState(false)
  const [value, setValue] = useState({});
  const [count, setCount] = useState(0)
  const [video, setVideo] = useState([])
  const key = 'updatable'
  const token = JSON.parse(localStorage.getItem('adminToken'))
  const [course, setCourse] = useState([])
  const shef = useRef()
  const updateTitle = useRef()
  const updateDaqiqa = useRef()
  const updateKetmaKet = useRef()

  useEffect(() => {
    fetch(host + '/courses')
      .then(re => re.json())
      .then(data => {
        setCourse(data)
        if (!course.length) {
          setCourseId(data[0].id)
        }
      })
  }, [setCourse, token, count, children])

  useEffect(() => {
    if (coursId) {
      fetch(host + '/video/admin/' + coursId, {
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

  const handleOpenVideo = (link, id) => {
    if (value?.id !== id) {
      setActive(true)
      setTimeout(() => {
        shef.current.src = img_url + link
        shef.current.load();
      }, 10);
    }
  }

  const handleUpdate = (text, id, daqiqa, ketma) => {
    const obj = {
      text,
      daqiqa,
      ketma,
      id
    }
    setValue(obj)
  }

  const update = (id) => {
    const video_text = updateTitle.current.value
    const video_duration = updateDaqiqa.current.value
    const sequence = Number(updateKetmaKet.current.value)
    setValue({})
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })

    fetch(host + '/video/update/' + id, {
      method: 'PATCH',
      headers: {
        autharization: token,
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        video_text,
        video_duration,
        sequence
      })
    })
    .then(data => {
      if (data.ok) {
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

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      const video_text = updateTitle.current.value
    const video_duration = updateDaqiqa.current.value
    const sequence = Number(updateKetmaKet.current.value)
    setValue({})
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })

    fetch(host + '/video/update/' + id, {
      method: 'PATCH',
      headers: {
        autharization: token,
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        video_text,
        video_duration,
        sequence
      })
    })
    .then(data => {
      if (data.ok) {
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
                <td onClick={() => handleOpenVideo(e.link, e.id)}>{i + 1}</td>
                <td onClick={() => handleOpenVideo(e.link, e.id)} style={{ fontWeight: 700, maxWidth: '300px' }}>{value?.id !== e.id ? e.text : <input ref={updateTitle} onKeyUp={(evt) => handleKeyUp(evt, e.id)} className='updateInput' defaultValue={value?.text} type='text'/>}</td>
                <td onClick={() => handleOpenVideo(e.link, e.id)}>{value?.id !== e.id ? e.duration : <input ref={updateDaqiqa} onKeyUp={(evt) => handleKeyUp(evt, e.id)} className='updateInput' defaultValue={value?.daqiqa} type='text'/>}</td>
                <td onClick={() => handleOpenVideo(e.link, e.id)}>{value?.id !== e.id ? e.sequence : <input ref={updateKetmaKet} onKeyUp={(evt) => handleKeyUp(evt, e.id)} className='updateInput' defaultValue={value?.ketma} type='number'/>}chi</td>
                <td>
                {value.id !== e.id ?
                    <Popover
                      content={
                        <div>
                          <div>
                            <button onClick={() => handleUpdate(e.text, e.id, e.duration, e.sequence)} className="upd">Update</button>
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
                    : <>
                      <button style={{borderRadius: '8px', marginRight: '10px'}} className="dlt" onClick={() => setValue({})}>Cancel</button>
                      <button onClick={() => update(e.id)} style={{borderRadius: '8px'}} className='upd'>Send</button>
                  </>}
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
