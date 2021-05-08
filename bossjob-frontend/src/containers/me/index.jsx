import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import Avatar from '../../assets/avatar.jpeg'
import {List, NavBar} from "antd-mobile";
import Cookie from 'js-cookie'

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    return (
      <div>
        <NavBar>我的</NavBar>
        <img alt="头像" style={{width:'60px',height:'60px',display:'block',margin:'30px auto',borderRadius:'50%'}} src={Avatar} onClick={this.toSetting}/>

        <List >
          <List.Item arrow="horizontal" onClick={this.toSetting}>设置</List.Item>
        </List>
      </div>
    )
  }
}

export default withRouter(Me)
