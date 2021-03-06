import React, {Component} from 'react';
import {connect} from "react-redux";
import {Grid, InputItem, Icon, NavBar, Toast} from "antd-mobile";
import QueueAnim from 'rc-queue-anim';
import {createReceiveMessageListAction, createSendMessageAction} from "../../redux/actions";
import ChatItem from "../../components/ChatItem";
import {getChatMessageList} from "../../api/api";
import {getUserId} from "../../utils/tools";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      showEmoji: false
    };
  }

  componentDidMount() {
    const emojis = ['π', 'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£','π'
      ,'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£'
      ,'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£'
      ,'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£','π', 'π', 'π€£']
    this.emojis = emojis.map(emoji => ({text: emoji}))

    const to_id = this.props.match.params.user_id
    getChatMessageList(to_id).then(res=>{
      this.props.createReceiveMessageListAction(res)
      setTimeout(()=>{
        console.log('θ§¦ε')
        window.scrollTo(0, document.body.scrollHeight)
      }, 100)
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo(0, document.body.scrollHeight)
  }

  toggleShow = () => {
    const showEmoji = !this.state.showEmoji
    this.setState({showEmoji}, ()=>{
      if (showEmoji) {
        setTimeout(()=>{
          window.dispatchEvent(new Event("resize"))
        },100)
      }
    })
  }

  handleSend = () => {
    const from_id = this.props.user._id || getUserId()
    const to_id = this.props.match.params.user_id
    const content = this.state.content.trim()
    if (!content) {
      Toast.fail("ζΆζ―δΈθ½δΈΊη©Ί")
      return true
    }
    this.props.createSendMessageAction({from_id, to_id, content})
    this.setState({
      content: '',
      showEmoji: false
    })
  }

  render() {
    const {showEmoji, content} = this.state
    const from_id = this.props.user._id || getUserId()
    const to_id = this.props.match.params.user_id
    const chat_id = [from_id, to_id].sort().join('_')
    const {chat} = this.props
    const messageList = chat[chat_id]
    let message = null
    if (Array.isArray(messageList)) {
      messageList.forEach(msg => {
        if (msg.to_id !== from_id) {
          message = msg
          return true
        }
      })
    }
    return (
      <div>
        <NavBar icon={<Icon type="left" />} onLeftClick={()=>this.props.history.goBack()}>{message ? message.to_name : 'θε€©εθ‘¨'}</NavBar>
        <div className='container' style={{marginBottom: showEmoji?'232px':'47px'}}>
          {
            Array.isArray(messageList) ?
              messageList.map(message => {
                return (
                    <ChatItem key={message._id} chat={message} />
                  )
              }) : null
          }
        </div>
        <div className="am-tab-bar" style={{position:'fixed', bottom:0, width: '100%', left: 0, height: "inherit"}}>
          <InputItem
            placeholder='θ―·θΎε₯ζ¨θ¦ειηζΆζ―'
            value={this.state.content}
            onChange={val=>this.setState({content: val})}
            onFocus={()=>this.setState({showEmoji: false})}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{marginRight:10}}>π</span>
                <span onClick={this.handleSend}>ει</span>
              </span>
          }/>
          {
            showEmoji ? <Grid data={this.emojis} columnNum={8} carouselMaxRow={4} isCarousel={true} onClick={item=>this.setState({content: content+item.text})}/> : null
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {createReceiveMessageListAction, createSendMessageAction}
)(Chat)
