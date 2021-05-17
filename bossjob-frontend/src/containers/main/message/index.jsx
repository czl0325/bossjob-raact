import React, {Component} from 'react';
import {NavBar} from "antd-mobile";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar>消息</NavBar>
        <div className='container'>

        </div>
      </div>
    )
  }
}
