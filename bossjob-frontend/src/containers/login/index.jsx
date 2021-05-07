import React, {Component, Fragment} from 'react';
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank, Toast} from "antd-mobile";
import Logo from "../../assets/logo.jpeg";
import {loginRequest} from "../../api/api";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  onLogin = () => {
    const {username, password} = this.state
    if (!username || !password) {
      Toast.fail("缺少必填字段!")
      return true
    }
    loginRequest(username, password).then(res=>{
      this.props.history.replace("/")
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
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
          <WhiteSpace/>
          <Button type="primary" onClick={this.onLogin}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.toRegister}>还没有账户</Button>
        </List>
      </Fragment>
    )
  }
}
