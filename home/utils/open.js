function getOpenid() {
  wx.login({
    success: function (loginCode) {
      var open = require("../config.js");
      var key = open.getOpen()
      var appid = key.appid
      var secret = key.secret
      //调用request请求api转换登录凭证  
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.setStorageSync('openid', res.data.openid); // 单独存储openid
        }
      })
    }
  })
}
module.exports.getOpenid = getOpenid;