import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import Avatar from '../../assets/avatar.jpeg'
import {Button, List, NavBar} from "antd-mobile";
import Cookie from 'js-cookie'
import {createUpdateUserAction, createResetUserAction} from "../../redux/actions";
import {getUserInfo} from "../../api/api";

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {user} = this.props
    if (!user._id) {
      const user_id = Cookie.get("user_id")
      if (user_id) {
        getUserInfo().then(res=>{
          this.props.createUpdateUserAction(res)
        })
      }
    }
  }

  toSetting = () => {
    const user_id = Cookie.get("user_id")
    if (!user_id) {
      this.props.history.replace("/login")
    } else {
      this.props.history.push("/setting")
    }
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <NavBar>我的</NavBar>
        <img alt="头像" style={{width:'60px',height:'60px',display:'block',margin:'30px auto',borderRadius:'50%'}} src={Avatar} onClick={this.toSetting}/>
        <span>{user.username}</span>

        <List >
          <Button type="warning">退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {createUpdateUserAction, createResetUserAction}
)(withRouter(Me))
