import React, {Component} from 'react';
import {NavBar, ListView, PullToRefresh} from "antd-mobile";
import {getUserList} from "../../../api/api";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      isLoading: true,
      users: []
    };
  }

  componentDidMount() {
    getUserList(1).then(res=>{
      this.setState({users: res})
    })
  }

  render() {
    return (
      <div>
        <NavBar>首页</NavBar>
        {/*<ListView*/}
        {/*  ref={el => this.listViewRef = el}*/}
        {/*  dataSource={this.state.users}*/}
        {/*  renderHeader={() => <span>下拉刷新</span>}*/}
        {/*  renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>*/}
        {/*    {this.state.isLoading ? '加载中' : '加载完成'}*/}
        {/*  </div>)}*/}
        {/*  pullToRefresh={<PullToRefresh*/}
        {/*    refreshing={this.state.refreshing}*/}
        {/*    onRefresh={this.onRefresh}*/}
        {/*  />}*/}
        {/*  onEndReached={this.onEndReached}*/}
        {/*  pageSize={5}*/}
        {/*/>*/}
      </div>
    )
  }
}
