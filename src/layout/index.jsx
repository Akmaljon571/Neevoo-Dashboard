import {
    ReconciliationOutlined,
    LineChartOutlined,
    ScheduleOutlined,
    UsergroupAddOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import home from '../img/logo.svg'
import { Main, Header } from '../components';
import './layout.scss'

const { Sider, Content } = Layout;

const LayOut = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [navbar, setNavbar] = useState('Xisobot');

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
                    onClick={(e) => setNavbar(e.key)}
                    defaultSelectedKeys={['Xisobot']}
                    items={[
                        {
                            key: 'Xisobot',
                            icon: <LineChartOutlined style={{fontSize: '20px'}} />,
                            label: 'Xisobot',
                        },
                        {
                            key: 'Category',
                            icon: <ReconciliationOutlined style={{fontSize: '20px'}} />,
                            label: 'Category',
                        },
                        {
                            key: 'Course',
                            icon: <ScheduleOutlined style={{fontSize: '20px'}} />,
                            label: 'Course',
                        },
                        {
                            key: 'Videos',
                            icon: <VideoCameraAddOutlined style={{fontSize: '20px'}} />,
                            label: 'Videos',
                        },
                        {
                            key: 'Users',
                            icon: <UsergroupAddOutlined style={{fontSize: '20px'}} />,
                            label: 'Users',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header>{navbar}</Header>
                <Content
                    style={{
                        margin: '0px 16px',
                        minHeight: 280,
                        background: 'transparent',
                    }}
                >
                    <Main/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayOut;