var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var url = require("../../utils/url.js");
var api = require("../../utils/api.js");

Page({

  data: {
    navLeftItems: [],
    navRightItems: [],
    setCheckedTmp: [],
    curNav: 1,
    curIndex: 0,
    tabs: ["一键添加", "基本信息", "基因"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    form: {},
    gene: {},
  },

  radio: function (e) {
    var curIndex = this.data.curIndex
    var index = e.currentTarget.dataset.index; //获取当前点击的下标
    var r
    //cruIndex为0（预设基因组）单选项
    if (curIndex == 0) {
      var rArr = this.data.setCheckedTmp; //选项集合
      if (rArr[curIndex].tree.nodes[index].checked == true) {
        r = true //单选为true标志位
      }
      this.setChecked() //因为是单选按钮 其他所有值初始化为false
    }
    var checkboxArr = this.data.setCheckedTmp; //选项集合
    if (checkboxArr[curIndex].tree.nodes[index].checked == true || r == true) { //已选中则反选
      checkboxArr[curIndex].tree.nodes[index].checked = false
    } else {
      checkboxArr[curIndex].tree.nodes[index].checked = true; //改变当前选中的checked值
    }

    console.log(checkboxArr[curIndex].tree.nodes[index])


    this.setData({
      navRightItems: checkboxArr
    });
  },
  detailChange: function (e) {
    var tmp = this.data.form
    switch (e.currentTarget.dataset.detail) {
      case 'name':
        tmp['name'] = e.detail.value
        break;
      case 'group':
        tmp['group'] = e.detail.value
        break;
      case 'remarks':
        tmp['remarks'] = e.detail.value
        break;
      case 'sex':
        tmp['sex'] = e.detail.value
        break;
      default:
        console.log(e.currentTarget.dataset);
        break;
    }
    this.setData({
      form: tmp
    })
  },
  getgene: function () {
    var tmp = {} //{}
    // var tmp = []//[]
    var g = this.data.navRightItems;
    for (var i = 0; i < g.length; i++) {
      for (var j = 0; j < g[i].tree.nodes.length; j++) {
        if (true == g[i].tree.nodes[j].checked) {
          tmp[g[i].tree.nodes[j].desc2] = g[i].tree.nodes[j].checked //{}
          //  tmp.push({[g[i].tree.nodes[j].desc2]:g[i].tree.nodes[j].checked})//[]
        }
      }
    }
    // console.log(JSON.stringify(tmp))
    // console.log(tmp)
    return tmp;
  },


  //每个基因植入为false 的checked元素
  setChecked: function () {
    var gene = wx.getStorageSync('gene')
    var setCheck = gene;
    var setChecked = [];
    //不能操作dom不知道怎么办了呀
    for (var j = 0; j < setCheck.length; j++) {
      for (var k = 0; k < setCheck[j].tree.nodes.length; k++) {
        setCheck[j].tree.nodes[k].checked = false
        setChecked[j] = setCheck[j]
      }
    }
    this.setData({
      setCheckedTmp: setChecked
    })
  },

  onLoad: function () {
    var that = this;
    var openid = wx.getStorageSync('openid') || "获取openid失败";
    this.setData({
      openid: openid
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.setChecked() //往原始数据里添加单多选判定值

    var gene = wx.getStorageSync('gene')
    that.setData({
      navLeftItems: gene,
      navRightItems: gene
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //事件处理函数 
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值 
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index 
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  confirm: function () { // 提交
    //update gene
    var gene = this.getgene()
    var tmp = this.data.form
    tmp['gene'] = gene

    console.log(tmp = JSON.stringify(tmp))
    var authorization = wx.getStorageSync('authorization');
    api.reqs(url.leopardCreate, 'post', tmp, api.leopardCreate, authorization)
  },
});