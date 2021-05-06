const express = require('express');
const router = express.Router();

const OK = 0;
const NODATA = 4000;

router.post('/register',(req, res, next) => {
  const {username, password, password2, type} = req.body
  if (!username || !password || !password2 || !type) {
    res.send({
      code: NODATA, msg: '缺少必要参数'
    })
  }
  res.send({
    code: OK
  })
})

module.exports = router;
