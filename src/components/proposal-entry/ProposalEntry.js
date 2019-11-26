import React from 'react';
import {
  Row,
  Col,
  Select,
  Spin,
  Input,
  DatePicker,
  Button,
  notification,
  Icon
} from 'antd';
import './proposal-entry-form.css';
import product1 from '../../images/product1.png';

const { Option } = Select;
const { TextArea } = Input;

export class ProposalEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fetching: false,
      proposalEntry: null,
      isLoading: false,
      product: this.props.product || {},
      sumAssured: '',
      age: 0,
      name: '',
      dob: '',
      address: '',
      state: '',
      country: '',
      zip: '',
      premium: 'RM 2000'
    };
  }

  fetchUser = value => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = value => {
    this.setState({
      product: value,
      data: [],
      fetching: false
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    let proposalEntry = Object.assign({}, this.state.proposalEntry);
    proposalEntry[name] = value;

    this.setState({ proposalEntry });
  };

  onValueChange = e => {
    const { value } = e.target;
    if (value.match(/^\d+$/) || value === '') {
      this.setState({ sumAssured: value });
    }
  };

  onDateChange = (date, dateString) => {
    if (date) {
      this.setState({
        age: -1 * date.diff(Date.now(), 'years'),
        dob: dateString
      });
    }
  };

  checkDisabled = () => {
    return !(
      this.state.sumAssured &&
      this.state.age &&
      this.state.name &&
      this.state.dob &&
      this.state.address &&
      this.state.state &&
      this.state.country &&
      this.state.zip
    );
  };

  onButtonClick = () => {
    console.log({
      name: this.state.name,
      dob: this.state.dob,
      age: this.state.age,
      address: this.state.address,
      state: this.state.state,
      country: this.state.country,
      zip: this.state.zip,
      sumAssured: this.state.sumAssured,
      premium: this.state.premium
    });

    notification.open({
      message: 'Success',
      description: 'Successfully submitted your entry.',
      icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
    });

    this.setState({
      name: '',
      dob: '',
      age: 0,
      address: '',
      state: '',
      country: '',
      zip: '',
      sumAssured: '',
      premium: ''
    });
  };

  render() {
    const { product, fetching, data } = this.state;

    return (
      <div className="proposal-entry-form">
        <h1 className="proposal-entry-form__heading-1">Proposal Entry</h1>
        <div className="proposal-entry-form__product">
          <Row>
            <div className="proposal-entry-form__product-container">
              <h2 className="proposal-entry-form__heading-2">Products</h2>
            </div>
            <Col span={16}>
              <div className="prlg">
                <span className="label">{'Product'}</span>
                <Select
                  mode="default"
                  showSearch
                  allowClear
                  labelInValue
                  value={product}
                  placeholder="Select Product Code "
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchUser}
                  onChange={this.handleChange}
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  {data.map(d => (
                    <Option key={d.value}>{d.text}</Option>
                  ))}
                </Select>

                <span className="label mtsm">{'Sum Assured'}</span>
                <Input
                  {...this.props}
                  placeholder="Enter value"
                  maxLength={25}
                  style={{ marginTop: '10px' }}
                  onChange={this.onValueChange}
                  value={this.state.sumAssured}
                />

                <span className="label mtsm">{'Premium'}</span>
                <h3 className="proposal-entry-form__heading-3">RM 2000</h3>
              </div>
            </Col>
            <Col span={8}>
              <img
                src={product1}
                alt="first product"
                className="proposal-entry-form__image"
              />
            </Col>
          </Row>
        </div>

        <div className="proposal-entry-form__lbta">
          <Row>
            <div className="proposal-entry-form__product-container">
              <h2 className="proposal-entry-form__heading-2">
                Life to be assured
              </h2>
            </div>

            <Col span={12} className="prlg">
              <span className="label">{'Name'}</span>
              <Input
                className="mbsm"
                placeholder="Enter name"
                onChange={e => this.setState({ name: e.target.value })}
                style={{ marginTop: '10px' }}
                value={this.state.name}
              />
              <span className="label">{'DOB'}</span>
              <DatePicker
                className="mbsm"
                onChange={this.onDateChange}
                style={{ marginTop: '10px', width: '100%' }}
              />
              <span className="label">{'Age'}</span>
              <Input style={{ marginTop: '10px' }} value={this.state.age} />
            </Col>
            <Col span={12}>
              <span className="label">{'Address'}</span>
              <TextArea
                onChange={e => this.setState({ address: e.target.value })}
                style={{ marginTop: '10px' }}
                rows={4}
                value={this.state.address}
              />
              <Input
                className="mtsm"
                addonBefore={
                  <div className="proposal-entry-form__input-before">State</div>
                }
                placeholder="Selangor"
                onChange={e => this.setState({ state: e.target.value })}
                value={this.state.state}
              />
              <Input
                className="mtsm"
                addonBefore={
                  <div className="proposal-entry-form__input-before">
                    Country
                  </div>
                }
                placeholder="Malaysia"
                onChange={e => this.setState({ country: e.target.value })}
                value={this.state.country}
              />
              <Input
                className="mtsm"
                addonBefore={
                  <div className="proposal-entry-form__input-before">
                    Zip Code
                  </div>
                }
                placeholder="25300"
                onChange={e => this.setState({ zip: e.target.value })}
                value={this.state.zip}
              />
            </Col>
          </Row>
        </div>

        <div className="proposal-entry-form__submit">
          <div className="proposal-entry-form__button">
            <Button
              size="large"
              type="primary"
              disabled={this.checkDisabled()}
              onClick={this.onButtonClick}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
