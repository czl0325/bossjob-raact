import React, {Component, Fragment} from 'react';
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import Logo from "../../assets/logo.jpeg";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onLogin = () => {

  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
    return (
      <Fragment>
        <NavBar>注册用户</NavBar>
        <img src={Logo} width="240" height="240" style={{display: 'block', margin: '20px auto'}}/>
        <List>
          <WingBlank>
            <InputItem placeholder="请输入用户名" onChange={(val) => this.handleChange("username", val)}>用户名:</InputItem>
          </WingBlank>
          <WingBlank>
            <InputItem type="password" placeholder="请输入密码"
                       onChange={(val) => this.handleChange("password", val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
          </WingBlank>
          <WhiteSpace/>
          <Button type="primary" onClick={this.onLogin}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.toRegister}>还没有账户</Button>
        </List>
      </Fragment>
    )
  }
}
