import React, {Component} from 'react';
import {getUserList} from "../../../api/api";
import {NavBar} from "antd-mobile";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getUserList(1).then(res=>{

    })
  }

  render() {
    return (
      <div>
        <NavBar>首页</NavBar>
      </div>
    )
  }
}
