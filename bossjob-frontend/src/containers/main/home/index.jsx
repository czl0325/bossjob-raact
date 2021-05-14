import React, {Component} from 'react';
import {NavBar, ListView, PullToRefresh, WhiteSpace, Card} from "antd-mobile";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {getUserList} from "../../../api/api";
import {getPictureUrl} from "../../../utils/tools";
import Avatar from '../../../assets/avatar.jpeg'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    this.state = {
      dataSource,
      refreshing: false,
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.requestUserList(true)
  }

  onRefresh = () => {
    this.requestUserList(true)
  }

  onEndReached = () => {
    this.setState({
      loading: true
    })

  }

  pageNum = 0
  requestUserList = (refresh) => {
    const {user} = this.props
    if (refresh) {
      this.pageNum = 0
    } else {
      this.pageNum++
    }
    getUserList((user.type||1)===1?2:1, this.pageNum).then(res=>{
      this.setState({
        users: res,
        refreshing: false
      })
    })
  }

  render() {
    const {dataSource, users, refreshing, loading} = this.state
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowData._id}>
          <WhiteSpace />
          <Card style={{margin: '0 10px'}} onClick={()=>this.props.history.push(`/chat/${rowData._id}`)}>
            <Card.Header
              thumb={<img src={rowData.avatar ? getPictureUrl(rowData.avatar) : Avatar} alt='头像' width='40'/>}
              extra={rowData.username}
            />
            <Card.Body>
              <div>职位: {rowData.post || ''}</div>
              <div>公司: {rowData.company || ''}</div>
              <div>月薪: {rowData.salary || ''}</div>
            </Card.Body>
          </Card>
          <WhiteSpace />
        </div>
      )
    }

    return (
      <div>
        <NavBar>首页</NavBar>
        <ListView
          style={{height:'calc(100vh - 92px)',overflow:'auto'}}
          dataSource={dataSource.cloneWithRows(users)}
          renderHeader={null}
          renderFooter={() => (<div style={{ padding: 0, textAlign: 'center' }}>
            {loading ? '加载中' : '加载完成'}
          </div>)}
          renderRow={row}
          pullToRefresh={
            <PullToRefresh
              refreshing={refreshing}
              onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          pageSize={5} />
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(withRouter(Home))
