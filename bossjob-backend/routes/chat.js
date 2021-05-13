const express = require('express');
const router = express.Router();

const {UserModel, ChatModel} = require("../db/models")
const BaseResponse = require("../utils/baseResponse")

router.get('/list', function (req, res) {
  const user_id = req.cookies.user_id
  if (user_id) {
    res.send(BaseResponse.createErrorMessage(5000, "未登录"))
  }
  ChatModel.find({'$or': [{'from_id': user_id}, {'to_id': user_id}]}, function (err, chatList) {
    res.send(BaseResponse.createSuccessMessage(chatList))
  })
})

router.post('/read', function (req, res) {
  const from_id = req.body.from_id
  const to_id = req.cookies.user_id
  ChatModel.updateMany({from_id, to_id, read :false}, {read: true}, {multi: true}, function (err, data) {
    res.send(BaseResponse.createSuccessMessage({updated: data}))
  })
})

router.get('/msgList', function (req, res) {

})

module.exports = router;
