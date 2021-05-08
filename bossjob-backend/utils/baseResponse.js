
class BaseResponse {
  code = 0;
  message = "";
  data = null;

  constructor() {
  }

  static createErrorMessage(code, message) {
    const res = new BaseResponse()
    res.code = code;
    res.message = message;
    res.data = null;
    return res
  }

  static createSuccessMessage(data) {
    const res = new BaseResponse()
    res.code = 0;
    res.message = "请求成功";
    res.data = data;
    return res
  }
}

module.exports = BaseResponse;
