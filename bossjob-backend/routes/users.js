
var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const path = require('path')
const formidable = require('formidable')

const {UserModel} = require("../db/models")
const tools = require("../utils/tools")
const BaseResponse = require("../utils/baseResponse")

const filter = {password: 0, __v: 0}

function packUser(user) {
  delete user["password"]
  delete user["__v"]
  return user
}

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
        res.cookie("user_id", user._id, {maxAge: 1000*60*60*24*365})
        res.send(BaseResponse.createSuccessMessage(user))
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
        res.cookie("user_id", user._id, {maxAge: 1000*60*60*24*365})
        res.send(BaseResponse.createSuccessMessage(packUser(user)));
      } else {
        res.send(BaseResponse.createErrorMessage(4003, "密码错误"));
      }
    } else {
      res.send(BaseResponse.createErrorMessage(4002, "查无此用户"));
    }
  })
})

router.get('/get', function (req, res) {
  const user_id = req.cookies.user_id
  if (!user_id) {
    res.send(BaseResponse.createErrorMessage(5000, "未登录"))
  }
  UserModel.findOne({_id: user_id}, filter, function (err, user) {
    res.send(BaseResponse.createSuccessMessage(user))
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
    UserModel.findByIdAndUpdate({_id: user_id}, user, {new: true}, function (err, user) {
      if (!user) {
        res.clearCookie("user_id")
        res.send({code: 5000, message: '未登录'});
      } else {
        res.send({code: 0, data: user})
      }
    })
  })
})

module.exports = router;
