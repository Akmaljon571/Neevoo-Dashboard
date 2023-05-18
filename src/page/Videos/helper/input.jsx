import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import yukla from '../../../img/bx_download.svg'
import { host } from '../../../content/start'
import ListVideo from './list'
import '../videos.scss'

function InputVideo () {
  const sar = useRef()
  const pri = useRef()
  const bgc = useRef()
  const rasmi = useRef()
  const seq = useRef()
  const token = JSON.parse(localStorage.getItem('adminToken'))
  const [messageApi, contextHolder] = message.useMessage()
  const [courseId, setCourseId] = useState(0);
  const [course, setCourse] = useState([])
  const [count, setCount] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    fetch(host + '/courses')
      .then(re => re.json())
      .then(data => {
        setCourse(data)
        setCourseId(data[0].id)
      })
  }, [setCourse, token,])

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const sent = () => {
    const title = sar.current.value
    const price = pri.current.value
    const bgcolor = bgc.current.value
    const sequence = seq.current.value
    const file = rasmi.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    if (title && price && bgcolor && sequence && file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('video_text', title)
      formData.append('sequence', sequence)
      formData.append('video_duration', price)
      formData.append('video_course', bgcolor)
 
      fetch(host + '/video/create', {
        method: 'POST',
        headers: {
          autharization: token
        },
        body: formData
      }).then(data => {
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
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'error',
              content: 'Loaded!',
              duration: 2
            })
          }, 1000)
        }
      })
    } else {
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'error',
          content: 'Loaded!',
          duration: 2
        })
      }, 1000)
    }
  }

  return (
    <>
      <div className='inputs_course'>
        <h1>Yangi video qo'shish</h1>
        <ul>
          <li>
            <span>Text</span>
            <input ref={sar} type='text' placeholder='3-dars' />
          </li>
          <li>
            <span>Davomiyligi...</span>
            <input ref={pri} type='text' placeholder='30:00' />
          </li>
          <li>
            <span>Course</span>
            <select ref={bgc}>
              {course.length
                ? course.map((e, i) => (
                    <option key={i} value={e?.course_id}>
                      {e?.title}
                    </option>
                  ))
                : null}
            </select>
          </li>
          <li>
            <span>Ketma-ketligi</span>
            <input ref={seq} type='number' placeholder='1' />
          </li>
          <li className='rasm'>
            <span>Video</span>
            <label htmlFor='rasm'>
              <i className="file_name">{file?.name ? file?.name : 'Yukla'}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input
              className="title_input"
              style={{ display: "none" }}
              ref={rasmi}
              type="file"
              onChange={handleFileChange}
              placeholder="category image"
              id='rasm'
            />
          </li>
          <li>
            <button onClick={sent}>Qo'shish</button>
          </li>
        </ul>
        {contextHolder}
      </div>
      <ListVideo>{courseId}</ListVideo>
    </>
  )
}

export default InputVideo
