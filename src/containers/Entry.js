import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import imageLogo from '../images/gibraltar-bsn.png';
import { ProposalEntry } from '../components/proposal-entry/ProposalEntry';

const { Header, Content, Footer, Sider } = Layout;

class ProductEntry extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo-img">
            <img width={200} src={imageLogo} alt="Gibraltar BSN" />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="0">
              <Icon type="home" />
              <span className="menu-item">
                <Link to="/">Dashboard</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="appstore" />
              <span className="menu-item">
                <Link to="/cloning">Product Cloning</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="file-text" />
              <span className="menu-item">
                <Link to="/entry">Product Entry</Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider> */}
        <Layout>
          {/* <Header style={{ background: 'rgb(24,100,160)', padding: 0 }} /> */}
          <div className="proposal-entry-form__header">
            <img src={imageLogo} className="proposal-entry-form__logo" />
          </div>
          <Content style={{ margin: '0 16px' }}>
            <ProposalEntry />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            GBSN ©2019 Created by WikiLab
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default ProductEntry;
