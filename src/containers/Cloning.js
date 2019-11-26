import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import imageLogo from "../images/gibraltar-bsn.png";
import FormLayoutDemo from "../components/listing/Listing";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ProductCloning extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo-img">
            <img width={200} src={imageLogo} alt="Gibraltar BSN" />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
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
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <FormLayoutDemo />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            GBSN ©2019 Created by WikiLab
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default ProductCloning;
