import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import Avatar from '../../../assets/avatar.jpeg'
import {Button, List, NavBar, Result, WhiteSpace, Modal} from "antd-mobile";
import Cookies from 'js-cookie'
import {createResetUserAction} from "../../../redux/actions";
import {getPictureUrl} from "../../../utils/tools";
import './index.css'

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toSetting = () => {
    const user_id = Cookies.get("user_id")
    if (!user_id) {
      this.props.history.replace("/login")
    } else {
      this.props.history.push("/setting")
    }
  }

  logout = () => {
    Modal.alert("提示", "确定要退出登录?",
      [
        {
          text: '取消'
        },
        {
          text: '退出',
          onPress: ()=>{
            Cookies.remove('user_id')
            this.props.createResetUserAction()
            this.props.history.replace('/login')
          }
        }]
    )
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <NavBar>我的</NavBar>
        <Result
          img={<img src={user.avatar ? getPictureUrl(user.avatar) : Avatar} alt='头像' className='avatar' onClick={this.toSetting}/>}
          title={user.username}
          message={user.company}
        />
        <WhiteSpace />
        <List>
          <List.Item multipleLine>
            <List.Item.Brief>职位：{user.post}</List.Item.Brief>
            <List.Item.Brief>简介：{user.info}</List.Item.Brief>
            <List.Item.Brief>月薪：{user.salary}</List.Item.Brief>
          </List.Item>
        </List>
        <WhiteSpace />
        <List >
          <Button type="warning" onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {createResetUserAction}
)(withRouter(Me))
