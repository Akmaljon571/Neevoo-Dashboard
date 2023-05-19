import {
    ReconciliationOutlined,
    LineChartOutlined,
    ScheduleOutlined,
    UsergroupAddOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import home from '../img/logo.svg'
import { Main, Header } from '../components';
import { useLocation, useNavigate } from 'react-router-dom';
import './layout.scss'

const { Sider, Content } = Layout;

const LayOut = () => {
    const defaultLocation = useLocation().pathname
    const [collapsed, setCollapsed] = useState(false);
    const [location, setLocation] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        switch (defaultLocation) {
            case '/':
                setLocation('Xisobot')
                break;
            case '/category':
                setLocation('Category')
                break;
            case '/course':
                setLocation('Course')
                break;
            case '/video':
                setLocation('Videos')
                break;
            case '/users':
                setLocation('Users')
                break;
            default:
                setLocation('Xisobot')
                break;
        }
    }, [defaultLocation, setLocation]);

    const handleNavigate = (e) => {
        const token = JSON.parse(localStorage.getItem('adminToken'))
        if (!token) {
            window.location.reload(true)
        } 
        switch (e.key) {
            case 'Xisobot':
                navigate('/')
                break;
            case 'Category':
                navigate('/category')
                break;
            case 'Course':
                navigate('/course')
                break;
            case 'Videos':
                navigate('/video')
                break;
            case 'Users':
                navigate('/users')
                break;
            default:
                navigate('/')
                break;
        }
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div onClick={() => setCollapsed(!collapsed)} className='home'>
                    <img className='home-icon' src={home} alt="" />
                    <span className='home-span'>{!collapsed ? 'CRM PANEL' : ''}</span>
                </div>
                <hr className='home-border' />
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={handleNavigate}
                    defaultSelectedKeys={[defaultLocation === '/' ? 'Xisobot' : defaultLocation === '/category' ? 'Category' : defaultLocation === '/course' ? 'Course' : defaultLocation === '/course' ? "Course" : defaultLocation === '/video' ? 'Videos' : defaultLocation === '/user' ? 'Users' : 'Xisobot']}
                    items={[
                        {
                            key: 'Xisobot',
                            icon: <LineChartOutlined style={{ fontSize: '20px' }} />,
                            label: 'Xisobot',
                        },
                        {
                            key: 'Category',
                            icon: <ReconciliationOutlined style={{ fontSize: '20px' }} />,
                            label: 'Category',
                        },
                        {
                            key: 'Course',
                            icon: <ScheduleOutlined style={{ fontSize: '20px' }} />,
                            label: 'Course',
                        },
                        {
                            key: 'Videos',
                            icon: <VideoCameraAddOutlined style={{ fontSize: '20px' }} />,
                            label: 'Videos',
                        },
                        {
                            key: 'Users',
                            icon: <UsergroupAddOutlined style={{ fontSize: '20px' }} />,
                            label: 'Users',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header>{location}</Header>
                <Content
                    style={{
                        margin: '0px 16px',
                        minHeight: 280,
                        background: 'transparent',
                    }}
                >
                    <Main />
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayOut;