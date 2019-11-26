import React from "react";

import {
  Select,
  Row,
  Col,
  Spin,
  Input,
  Card,
  List,
  Icon,
  Tooltip,
  Modal,
  notification
} from "antd";
import debounce from "lodash/debounce";
import "./listing-style.css";
import { ProductList } from "../../constants/mockData";

const { Option } = Select;

const openNotificationWithIcon = (type, description) => {
  notification[type]({
    message: "Notification",
    description: description || "Clone Product successful!"
  });
};

export default class FormLayoutDemo extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);

    this.state = {
      data: [],
      value: [],
      fetching: true,
      cloneName: "",
      products: [],
      product: { id: 0, name: "", description: "", img: "" }
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = value => {
    //const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    let data = [...ProductList];

    if (value && value !== "")
      data = data.filter(p =>
        p.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    this.setState({ products: data, fetching: false });
  };

  sortAndFilter = value => {
    let data = [...ProductList];
    if (value && value !== "")
      data = data.filter(p =>
        p.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    this.setState({ products: data, fetching: false });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    if (name === "cloneName") this.setState({ cloneName: value });
  };

  showModal = product => {
    this.setState({
      visible: true,
      product
    });
  };

  handleOk = e => {
    const { img, description } = this.state.product;
    if (this.state.cloneName === "")
      return openNotificationWithIcon("error", "Product name can't be empty!");
    debugger;
    const newProduct = {
      id: this.state.products.length,
      name: this.state.cloneName,
      description,
      img
    };
    const products =
      this.state.products.length > 0
        ? [newProduct, ...this.state.products]
        : [newProduct];

    this.setState({
      products,
      cloneName: "",
      product: {},
      value: [],
      visible: false
    });
    openNotificationWithIcon("success");
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  renderPopup = e => {
    const { product, cloneName } = this.state;
    return (
      <div className="clone-popup">
        <Modal
          title="Cloning Product"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="Clone"
          onCancel={this.handleCancel}
        >
          <Row className="clone-form-row">
            <Col span={10}>
              <span className="label">From Product</span>
            </Col>
            <Col span={14}>
              <span className="italic">{product.name}</span>
            </Col>
          </Row>
          {/* <Row>
            <Col span={6}>
              <span className="label italic">Old description</span>
            </Col>
            <Col span={18}>
              <span className="italic">{product.description}</span>
            </Col>
          </Row> */}
          <Row className="clone-form-row">
            <Col span={10}>
              <span className="label">New Product Name</span>
            </Col>
            <Col span={14}>
              <Input
                name="cloneName"
                placeholder="New Product Name"
                value={cloneName || ""}
                onChange={this.onChange}
              />
            </Col>
          </Row>
          {/* <Row>
            <Col span={6}>
              <span className="label">New Description</span>
            </Col>
            <Col span={18}>
              <Input
                name="description"
                placeholder="Clone to new Product with new description"
                value={description || ""}
                onChange={this.onChange}
              />
            </Col>
          </Row> */}
        </Modal>
      </div>
    );
  };

  render() {
    const { fetching, data, value, products } = this.state;

    return (
      <div className="listing">
        <Row>
          <Col span={2}>
            <span className="label" style={{ lineHeight: "32px" }}>
              {"Product"}
            </span>
          </Col>
          <Col span={10}>
            <Select
              mode="default"
              showSearch
              allowClear
              labelInValue
              value={value}
              placeholder="Search Product"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchUser}
              onChange={this.handleChange}
              style={{ width: "100%" }}
            >
              {data.map(d => (
                <Option key={d.value}>{d.text}</Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Listing */}
        <Row className="list-table">
          {fetching ? (
            <Spin />
          ) : (
            <List
              grid={{
                gutter: 24,
                column: 3
              }}
              dataSource={products}
              renderItem={p => (
                <List.Item>
                  <Card
                    actions={[
                      <Tooltip placement="bottom" title={"View detail"}>
                        <Icon type="read" key="read" />
                      </Tooltip>,
                      <Tooltip placement="bottom" title={"Edit"}>
                        <Icon type="edit" key="edit" />
                      </Tooltip>,
                      <Tooltip placement="bottom" title={"Clone"}>
                        <Icon
                          onClick={this.showModal.bind(this, p)}
                          type="copy"
                          key="copy"
                        />
                      </Tooltip>
                    ]}
                  >
                    <Tooltip placement="bottom" title={p.name}>
                      <img
                        width={"100%"}
                        height={"100%"}
                        alt="hi"
                        src={p.img}
                      />
                      <p className="product-name">{p.name}</p>
                      <Card.Meta
                        className="product-desc"
                        style={{
                          textAlign: "initial",
                          paddingTop: 10,
                          fontStyle: "italic"
                        }}
                        description={p.description}
                      />
                    </Tooltip>
                  </Card>
                </List.Item>
              )}
              className="product-list"
            />
          )}
        </Row>

        {this.renderPopup()}
      </div>
    );
  }
}
