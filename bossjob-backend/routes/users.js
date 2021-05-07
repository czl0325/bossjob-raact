var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const path = require('path')
const formidable = require('formidable')

const {UserModel} = require("../db/models")
const tools = require("../utils/tools")

router.post('/register', function (req, res) {
  const {username, password, type} = req.body
  if (!username || !password || !type) {
    res.send({code: 4000, message: '缺少必要参数'});
  }
  UserModel.findOne({username}, function (err, user) {
    if (user) {
      res.send({code: 4001, message: '用户已存在'});
    } else {
      new UserModel({username, type, password:md5(password)}).save(function (err, user) {
        res.cookie("user_id", user._id, {maxAge: 60*60*24*365})
        res.send({code: 0, message: "获取用户成功", data: user})
      })
    }
  })
})

router.post('/login', function (req, res) {
  const {username, password} = req.body
  if (!username || !password) {
    res.send({code: 4000, message: '缺少必要参数'});
  }
  UserModel.findOne({username}, function (err, user) {
    if (user) {
      if (user.password === md5(password)) {
        res.send({code: 0, message: '成功', data: user});
      } else {
        res.send({code: 4003, message: '密码错误'});
      }
    } else {
      res.send({code: 4002, message: '查无此用户'});
    }
  })
})

router.post('/update', function (req, res) {
  const user_id = req.cookies.user_id
  if (!user_id) {
    res.send({code: 5000, message: '未登录'});
  }
  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname + "/../public/images");
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.parse(req, function (err, fields, files) {
    let avatar = ""
    if (files.file) {
      avatar = files.file._writeStream.path
      avatar = avatar.match(/public\/images\/(\S*)/)[1];
    }
    const {post, info, company, salary} = fields
    let user = {avatar, post, info, company, salary}
    user = tools.deleteNullProperty(user)
    UserModel.findByIdAndUpdate({_id: user_id}, user, function (err, oldUser) {
      if (!oldUser) {
        res.clearCookie("user_id")
        res.send({code: 5000, message: '未登录'});
      } else {
        res.send({code: 0, data: user})
      }
    })
  })
})

module.exports = router;
