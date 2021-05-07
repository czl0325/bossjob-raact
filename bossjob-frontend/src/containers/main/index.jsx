import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import '../../assets/iconfont/iconfont.css'
import Me from '../me'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTab: "home"
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
          <TabBar.Item title="首页" icon={<i style={{fontSize: '28px'}} className="iconfont icon-Homehomepagemenu"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-Homehomepagemenu"/>} key="home" selected={this.state.selectTab==="home"} onPress={()=>{ this.setState({selectTab: "home"}) }} >{this.renderContent("首页")}</TabBar.Item>
          <TabBar.Item title="消息" key="message" icon={<i style={{fontSize: '28px'}} className="iconfont icon-message"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-message"/>} selected={this.state.selectTab==="message"} onPress={()=>{ this.setState({selectTab: "message"}) }}>{this.renderContent("消息")}</TabBar.Item>
          <TabBar.Item title="我的" key="me" icon={<i style={{fontSize: '28px'}} className="iconfont icon-me"/>} selectedIcon={<i style={{fontSize: '28px'}} className="iconfont icon-me"/>} selected={this.state.selectTab==="me"} onPress={()=>{ this.setState({selectTab: "me"}) }}>
            <Me/>
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}
