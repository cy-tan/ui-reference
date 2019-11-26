import React from "react";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import imageLogo from "../images/gibraltar-bsn.png";
import ProductEntry from "./Entry";
import Home from "./Home";

const { Header, Content, Footer, Sider } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <div className="app-content">
        <Router>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo-img">
                <img width={200} src={imageLogo} alt="Gibraltar BSN" />
              </div>
              <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
                <Menu.Item key="0">
                  <Link to={"/"}>
                    <Icon type="home" />
                    <span className="menu-item">Dashboard</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="1">
                  <Link to={"/entry"}>
                    <Icon type="file-text" />
                    <span className="menu-item">Product Entry</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }} />
              <Content style={{ margin: "0 16px" }}>
                <Switch>
                  <Route path="/entry" component={ProductEntry} />
                  <Route history path="/" component={Home} />
                </Switch>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                GBSN ©2019 Created by WikiLab
              </Footer>
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}
