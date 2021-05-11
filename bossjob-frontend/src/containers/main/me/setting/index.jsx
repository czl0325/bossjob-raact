import React, {Component} from 'react';
import {connect} from "react-redux";
import {List, NavBar, TextareaItem, ImagePicker, Button, WhiteSpace, Icon, Toast, InputItem} from "antd-mobile";
import {getUserInfo, updateUser} from "../../../../api/api";
import {createUpdateUserAction} from "../../../../redux/actions";
import {getPictureUrl} from "../../../../utils/tools";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatars: []
    };
  }

  componentDidMount() {
    getUserInfo().then(res=>{
      this.setState({
        avatars: res.avatar ? [{url:getPictureUrl(res.avatar), id:0}] : [],
      })
    })
  }

  onChangeAvatar = (files, operationType, index) => {
    if (operationType === 'add') {
      this.setState({avatars: files})
    } else if (operationType === 'remove') {
      this.setState({avatars: []})
    }
  }

  updateSetting = () => {
    const {avatars} = this.state
    const {user} = this.props
    let file = null
    if (avatars.length > 0) {
      file = avatars[0].file
    }
    updateUser(file, user).then(res=>{
      Toast.success("更新信息成功")
      this.setState({
        avatars: res.avatar ? [{url:getPictureUrl(res.avatar), id:0}] : [],
      })
      this.props.createUpdateUserAction(res)
    })
  }

  render() {
    const {avatars} = this.state
    const {user} = this.props
    return (
      <div>
        <NavBar icon={<Icon type="left" />} onClick={()=>this.props.history.goBack()}>设置</NavBar>
        <List>
          <List.Item extra={
            <ImagePicker
              length="1"
              multiple={false}
              selectable={avatars.length<1}
              files={avatars}
              onChange={this.onChangeAvatar}/>}>头像</List.Item>
          <InputItem placeholder='请输入所在公司' value={user.company ? user.company : ''} onChange={(val)=>this.setState({user: {...user, company:val}})}>所在公司:</InputItem>
          <InputItem placeholder='请输入职位' value={user.post ? user.post : ''} onChange={(val)=>this.setState({user: {...user, post:val}})}>职位:</InputItem>
          <InputItem placeholder='请输入月薪' value={user.salary ? user.salary : ''} onChange={(val)=>this.setState({user: {...user, salary:val}})}>月薪:</InputItem>
          <TextareaItem value={user.info ? user.info : ''} title="个人简介" autoHeight labelNumber={5} rows="5" placeholder="填写个人简介" onChange={(val)=>{this.setState({...user, info: val})}}/>
          <WhiteSpace size="xl"/>
          <Button type="primary" onClick={this.updateSetting}>更新设置</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {createUpdateUserAction}
)(Setting)
