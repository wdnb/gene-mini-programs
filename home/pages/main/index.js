Page({

  onLoad: function () {

    
    //检测是否为注册用户
    var reged = wx.getStorageSync('reged');
    if (200==reged){
      reged=''
    } else if(401==reged){
      reged = '尚未登陆'
    } else if (403 == reged){
      reged = '尚未注册'
    } else{
      reged = '系统内部异常'
    }
    this.setData({
      reged: reged
    })
  },

    data: {
        grids: [0]
    }

});