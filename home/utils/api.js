function reqs(url, method, data, callback, authorization) {
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/json',
      'authorization': authorization
    },
    method: method,
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      // console.log(res.data)
      callback(res.data)
    },
    fail: function (res) {
      console.log(res.data)
    },
    complete: function (res) {
      // console.log(res.data)
    },
  })
}

function login(data) {
  // console.log(data)
  let code = data.code;
  if (code == 200) {
    wx.setStorage({
      key: 'authorization',
      data: data.message.token,
    })

    wx.navigateTo({
      url: '../route/route'
    })
  } else {
    wx.hideLoading()
    wx.showToast({
      title: data.message,
    })
  }
}

function register(data) {
  let code = data.code;
  if (code == 200) {
    wx.setStorage({
      key: 'authorization',
      data: data.message.token,
    })

    wx.navigateTo({
      url: '../route/route'
    })
  } else {
    wx.hideLoading()
    wx.showToast({
      title: data.message,
    })
  }
}
//查询用户状态
function inquire(data) {
  if (200 == data.code) { //用户状态正常
    wx.setStorage({
      key: 'reged',
      data: data.code,
    })
  } else if (401 == data.code) { //jwt未授权
    wx.setStorage({
      key: 'reged',
      data: data.code,
    })
  } else if (403 == data.code) { //用户未注册
    wx.setStorage({
      key: 'reged',
      data: data.code,
    })
  } else { //系统内部异常
    wx.setStorage({
      key: 'reged',
      data: data.code,
    })
  }
  //跳转到用户页面
  wx.navigateTo({
    url: '../main/index'
  })
}
//写入豹纹基因库
function leopardCreate(data) {
  console.log(data)
  if (200 == data.code) {

  } else if(400==data.code){

  }
}
//无http状态码接口
function baseGeneLoad(data) {
  wx.setStorageSync('gene', data)
  // console.log(data)
}

module.exports = {
  inquire: inquire,
  login: login,
  register: register,
  leopardCreate: leopardCreate,
  baseGeneLoad: baseGeneLoad,
  reqs: reqs
}