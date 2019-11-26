import React from "react";

import { Layout, Menu, Icon } from "antd";
import FormLayoutDemo from "../components/listing/Listing";
import imageLogo from "../images/gibraltar-bsn.png";
import smallLogon from "../images/small-logo.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends React.Component {
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
          <div className="logo-img" style={{ textAlign: "center" }}>
            {this.state.collapsed ? (
              <img
                width={60}
                height={40}
                src={smallLogon}
                alt="Gibraltar BSN"
              />
            ) : (
              <img width={200} src={imageLogo} alt="Gibraltar BSN" />
            )}
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Our products</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
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
export default Home;
