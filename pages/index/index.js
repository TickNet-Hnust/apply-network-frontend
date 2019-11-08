//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    phoneNum: '', //191905010101
    password: '', //123456,
    pswname: '上网密码',
    idname: '上网账号',
    isPsw: true,
    loginUrl: 'http://192.168.254.226',
    Y: '',
    M: '',
    D: '',
    H: '',
    F: '',
    S: '',
    deadline: '', //2019年10月10日12：30
    tobeknow: {
      header: '上网使用须知：',
      first: '1.首先连接上iHNUST的校园网，会弹出登录窗口，如果没有弹出，请点击',
      second: '2.根据给出的登陆账号和登录密码进行登录',
      third1: '3.本账号有效期至',
      third2: '，失效后需要重新注册'
    }
  },
  tophp: () => {
    wx.request({
      url: 'http://www.willdove.top/coom/test.php',
      dataType: "GET",
      success: res => {
        app.log(res)
      }
    })
  },
  toOut: () => {
    wx.navigateTo({
      url: '../out/out',
    })
  },
  showPsw() {
    this.setData({
      isPsw: !this.data.isPsw
    })
  },
  onShow: function() {
    console.log(new Date().getTime())
    var _this = this
    wx.getStorage({
      key: 'phoneNum',
      success: function(res) {
        if (new Date().getTime() > res.data.deadline) {
          wx.showToast({
            title: '身份验证过期',
            icon:'none',
            success: function() {
              wx.clearStorage()
              setTimeout(function() {
                wx.redirectTo({
                  url: '../register/register',
                })
              }, 1000)
            }
          })
        }
        _this.setData({
          phoneNum: app.decode(res.data.phoneNum),
          password: app.decode(res.data.password),
          Y: new Date(res.data.deadline).getFullYear(),
          M: new Date(res.data.deadline).getMonth() + 1,
          D: new Date(res.data.deadline).getDate(),
          H: new Date(res.data.deadline).getHours(),
          F: new Date(res.data.deadline).getMinutes(),
          S: new Date(res.data.deadline).getSeconds()
        })
      },
      fail: function() {
        wx.showToast({
          title: '身份验证已过期',
          image: '../../images/error.png'
        })
        setTimeout(function() {
          wx.redirectTo({
            url: '../register/register',
          })
        }, 1000)
      }
    })
  },
  onReady: function() {},
})