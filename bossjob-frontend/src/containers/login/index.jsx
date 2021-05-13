import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank, Toast} from "antd-mobile";
import Logo from "../../assets/logo.jpeg";
import {loginRequest} from "../../api/api";
import {createUpdateUserAction, createResetUserAction} from "../../redux/actions";
import BossSocket from "../../utils/socket";

class Login extends Component {
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
      this.props.createUpdateUserAction(res)
      BossSocket.getInstance().connectServer(res._id)
      this.props.history.replace("/")
    }).catch(err=>{
      this.props.createResetUserAction()
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
    return (
      <Fragment>
        <NavBar>用户登录</NavBar>
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

export default connect(
  state => ({user: state.user}),
  {createUpdateUserAction, createResetUserAction}
)(Login)
