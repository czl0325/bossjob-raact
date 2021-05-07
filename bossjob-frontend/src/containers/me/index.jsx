import React, {Component} from 'react';
import {NavLink, Route, withRouter} from 'react-router-dom'
import Avatar from '../../assets/avatar.jpeg'
import {List, NavBar} from "antd-mobile";
import Setting from "./setting";

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.history)
    return (
      <div>
        <NavBar>我的</NavBar>
        <img style={{width:'60px',height:'60px',display:'block',margin:'30px auto',borderRadius:'50%'}} src={Avatar}/>

        <List >
          <NavLink to='/setting'>
            <List.Item arrow="horizontal">设置</List.Item>
          </NavLink>
        </List>
      </div>
    )
  }
}

export default withRouter(Me)
