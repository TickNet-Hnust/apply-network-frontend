//app.js
App({
  data: {

  },
  globalData: { 
    //设置请求url
    url:'n2n74f.natappfree.cc',
    //手机号码和登录账号、登录密码、验证码
    phoneNum: '',
    password:'',
    validation: '',

    //设置短信发送间隔
    sendMail:60,
    //设置本地缓存清理周期
    clearSto:'',

    //设置注册时间
    setTime:''

  },
  onLaunch: function() {
    // 展示本地存储能力
    
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           console.log(res)
    //           //this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  getVaild: function(e, cb) {
    wx.request({
      url: 'http://84wstj.natappfree.cc/thinkphp/public/index/index/func?phoneNum=' + e,
      success: function(res) {
        console.log(res)
        cb(res.data)
      },
      fail: function() {

      }
    })
  }
})