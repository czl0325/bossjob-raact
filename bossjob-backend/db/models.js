const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/boss", {useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
  console.log('------数据库连接成功！------')
})
const conn = mongoose.connection
conn.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

const userSchema = mongoose.Schema({
  username: {type: String, required: true},   // 用户名
  password: {type: String, required: true},   // 密码
  type: {type: Number, required: true},       // 用户类型: 1求职者/2招聘者
  avatar: {type: String},                     // 头像名称
  post: {type: String},                       // 职位
  info: {type: String},                       // 个人或职位简介
  company: {type: String},                    // 公司名称
  salary: {type: String}                      // 月薪
})

const userModel = mongoose.model("user", userSchema)
exports.UserModel = userModel

const chatSchema = mongoose.Schema({
  from: {type: String, required: true},     // 发送用户的id
  to: {type: String, required: true},       // 接收用户的id
  chat_id: {type: String, required: true},  // from和to组成的字符串
  content: {type: String, required: true},  // 内容
  read: {type:Boolean, default: false},     // 标识是否已读
  create_time: {type: Number}               // 创建时间
})
const chatModel = mongoose.model('chat', chatSchema) // 集合为: chats
exports.ChatModel = chatModel
