import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import home from '../img/logo.svg'
import { Main, Header } from '../components';
import './layout.scss'

const { Sider, Content } = Layout;

const LayOut = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [navbar, setNavbar] = useState('Home');
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                    defaultSelectedKeys={['home']}
                    items={[
                        {
                            key: 'home',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header>{navbar}</Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Main/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayOut;