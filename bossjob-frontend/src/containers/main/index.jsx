import React, {Component} from 'react';
import {connect} from "react-redux";
import { TabBar } from 'antd-mobile';
import '../../assets/iconfont/iconfont.css'
import Me from '../me'
import {createTabAction} from "../../redux/actions";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderContent(pageText) {
    return (
      <div style={{ height: '100%', textAlign: 'center' }}>{pageText}</div>
    )
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }} >
        <TabBar tintColor="#53beb8" tabBarPosition="bottom">
          <TabBar.Item title="首页" icon={<i style={{fontSize: '28px'}} className="iconfont icon-Homehomepagemenu"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-Homehomepagemenu"/>} key="home" selected={this.props.tab==="home"} onPress={()=>{ this.props.createTabAction("home") }} >{this.renderContent("首页")}</TabBar.Item>
          <TabBar.Item title="消息" key="message" icon={<i style={{fontSize: '28px'}} className="iconfont icon-message"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-message"/>} selected={this.props.tab==="message"} onPress={()=>{ this.props.createTabAction("message") }}>{this.renderContent("消息")}</TabBar.Item>
          <TabBar.Item title="我的" key="me" icon={<i style={{fontSize: '28px'}} className="iconfont icon-me"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-me"/>} selected={this.props.tab==="me"} onPress={()=>{ this.props.createTabAction("me") }}>
            <Me/>
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

export default connect(
  state => ({
    tab: state.tab
  }),
  {createTabAction}
)(Main)
