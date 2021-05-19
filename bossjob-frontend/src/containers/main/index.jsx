import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavBar, TabBar} from 'antd-mobile';
import PubSub from 'pubsub-js';
import '../../assets/iconfont/iconfont.css'
import Home from './home'
import Me from './me'
import Message from './message'
import {createTabAction, createUpdateUserAction} from "../../redux/actions";
import Cookie from "js-cookie";
import {getUserInfo} from "../../api/api";
import BossSocket from "../../utils/socket";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const {user} = this.props
    if (!user._id) {
      const user_id = Cookie.get("user_id")
      if (user_id) {
        getUserInfo().then(res=>{
          BossSocket.getInstance().connectServer(user_id)
          this.props.createUpdateUserAction(res)
          PubSub.publish("reloadHome")
        })
      }
    }
  }

  mainTitle = () => {
    if (this.props.tab === 'home') {
      return '首页'
    } else if (this.props.tab === 'message') {
      return '消息'
    } else {
      return '我的'
    }
  }

  render() {
    return (
      <div>
        <NavBar>{this.mainTitle()}</NavBar>
        <div style={{ position: 'fixed', height: 'calc(100% - 45px)', width: '100%', bottom: 0 }} >
          <TabBar tintColor="#53beb8" tabBarPosition="bottom">
            <TabBar.Item title="首页" icon={<i style={{fontSize: '28px'}} className="iconfont icon-Homehomepagemenu"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-Homehomepagemenu"/>} key="home" selected={this.props.tab==="home"} onPress={()=>{ this.props.createTabAction("home") }} >
              <Home />
            </TabBar.Item>
            <TabBar.Item title="消息" key="message" icon={<i style={{fontSize: '28px'}} className="iconfont icon-message"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-message"/>} selected={this.props.tab==="message"} onPress={()=>{ this.props.createTabAction("message") }}>
              <Message />
            </TabBar.Item>
            <TabBar.Item title="我的" key="me" icon={<i style={{fontSize: '28px'}} className="iconfont icon-me"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-me"/>} selected={this.props.tab==="me"} onPress={()=>{ this.props.createTabAction("me") }}>
              <Me/>
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    tab: state.tab,
    user: state.user
  }),
  {createTabAction, createUpdateUserAction}
)(Main)
