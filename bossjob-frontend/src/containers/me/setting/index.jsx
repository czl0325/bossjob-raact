import React, {Component} from 'react';
import {List, NavBar, TextareaItem, ImagePicker, Button, WhiteSpace, Icon, Toast} from "antd-mobile";
import {getUserInfo, updateUser} from "../../../api/api";
import {getPictureUrl} from "../../../utils/tools";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      avatars: [],
      info: ''
    };
  }

  onChangeAvatar = (files, operationType, index) => {
    if (operationType === 'add') {
      this.setState({avatars: files})
    } else if (operationType === 'remove') {
      this.setState({avatars: []})
    }
  }

  updateSetting = () => {
    const {avatars, info} = this.state
    let file = null
    if (avatars.length > 0) {
      file = avatars[0].file
    }
    updateUser(file, info).then(res=>{
      Toast.success("更新信息成功")
      this.setState({
        user: res,
        avatars: res.avatar ? [{url:getPictureUrl(res.avatar), id:0}] : [],
        info: res.info || ''
      })
    })
  }

  componentDidMount() {
    getUserInfo().then(res=>{
      this.setState({
        user: res,
        avatars: res.avatar ? [{url:getPictureUrl(res.avatar), id:0}] : [],
        info: res.info || ''
      })
    })
  }

  render() {
    const {avatars, info} = this.state
    return (
      <div>
        <NavBar icon={<Icon type="left" />} onClick={()=>this.props.history.goBack()}>设置</NavBar>
        <List>
          <List.Item extra={
            <ImagePicker
              length="1"
              multiple={false}
              selectable={avatars<1}
              files={avatars}
              onChange={this.onChangeAvatar}/>}>头像</List.Item>
          <TextareaItem
            ref={c => this.infoRef = c}
            value={info}
            title="个人简介"
            autoHeight
            labelNumber={5}
            rows="5"
            placeholder="填写个人简介"
            onChange={(val)=>{this.setState({info: val})}}
          />
          <WhiteSpace size="xl"/>
          <Button type="primary" onClick={this.updateSetting}>更新设置</Button>
        </List>
      </div>
    )
  }
}
