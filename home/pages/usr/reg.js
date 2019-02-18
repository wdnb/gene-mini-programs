var url = require("../../utils/url.js");
var api = require("../../utils/api.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userPassword: '',
  },
  //登录
  oLogin: function () {
    let openid = wx.getStorageSync('openid');
    var data = {
      username: openid,
    }
    api.reqs(url.register, 'post', data, api.register)
  },
})