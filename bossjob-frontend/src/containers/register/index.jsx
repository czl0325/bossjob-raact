import React, {Component, Fragment} from 'react';
import {NavBar, Button, InputItem, List, Radio, WingBlank, WhiteSpace, Toast} from "antd-mobile";
import Logo from "../../assets/logo.jpeg"
import {registerRequest} from "../../api/api";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      type: 1
    };
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  onRegister = () => {
    const {username, password, password2, type} = this.state
    if (!username || !password || !password2) {
      Toast.fail("缺少必填字段")
      return true
    }
    if (password !== password2) {
      Toast.fail("两次输入的密码不一致")
      return true
    }
    registerRequest(username, password, type).then(res=>{
      this.props.history.replace("/")
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
    return (
      <Fragment>
        <NavBar>注册用户</NavBar>
        <img src={Logo} alt="Logo" width="240" height="240" style={{display: 'block', margin: '20px auto'}}/>
        <List>
          <WingBlank>
            <InputItem placeholder="请输入用户名" onChange={(val) => this.handleChange("username", val)}>用户名:</InputItem>
          </WingBlank>
          <WingBlank>
            <InputItem type="password" placeholder="请输入密码"
                       onChange={(val) => this.handleChange("password", val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
          </WingBlank>
          <WingBlank>
            <InputItem type="password" placeholder="请再次输入密码"
                       onChange={(val) => this.handleChange("password2", val)}>确认密码:</InputItem>
          </WingBlank>
          <WingBlank>
            <List.Item>
              <span>用户类型:</span>&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 1} onChange={() => this.handleChange("type", 1)}>求职者</Radio>&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 2} onChange={() => this.handleChange("type", 2)}>招聘者</Radio>
            </List.Item>
          </WingBlank>
          <WhiteSpace/>
          <Button type="primary" onClick={this.onRegister}>注册</Button>
          <WhiteSpace/>
          <Button onClick={this.toLogin}>已有账户</Button>
        </List>
      </Fragment>
    )
  }
}
