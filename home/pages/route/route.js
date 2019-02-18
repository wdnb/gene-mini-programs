var url = require("../../utils/url.js");

Page({
  onLoad: function (options) {

    var openid = wx.getStorageSync('openid') || false;
    //防止异步 wx.request 请求未返回openid 够牛逼就来个死循环
    if (openid == false) {
      wx.navigateTo({
        url: './route'
      })
    } else {
      var api = require("../../utils/api.js");
      var data = {
        username: openid,
      }
      var authorization = wx.getStorageSync('authorization');
      
      if (!authorization) {
        authorization = ''//undefined
      }
      api.reqs(url.inquire, 'post', data, api.inquire, authorization)

      //获取基因列表
      // var authorization = wx.getStorageSync('authorization');
      api.reqs(url.baseGeneLoad, 'post', "", api.baseGeneLoad, authorization)
    }

  },
})
