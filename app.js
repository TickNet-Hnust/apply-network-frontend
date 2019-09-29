//app.js
App({
  data: {

  },
  globalData: {
    //设置请求url
    url: 'dxnqz7.natappfree.cc',
    //手机号码和登录账号、登录密码、验证码
    phoneNum: '',
    password: '',
    validation: '',

    // 微信用户信息
    userInfo: {
      nickName: '',
      gender: '',
      country: '',
      province: '',
      city: '',
      province: '',
    },
    //AppCode
    appCode:'',
    //设置短信发送间隔
    sendMail: 60,
    //设置本地缓存清理周期
    clearSto: '',

    //设置注册时间
    setTime: ''

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
        getApp().globalData.appCode = res.code
        // wx.request({
        //   url: 'http://dxnqz7.natappfree.cc/apply-network-server/public/api/test?appCode='+res.code,
        //   success:(res)=>{
        //     console.log(res)
            
        //   }
        // })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // console.log("已授权")
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              //console.log(res)
              getApp().globalData.userInfo.nickName = res.userInfo.nickName,
              getApp().globalData.userInfo.country = res.userInfo.country,
              getApp().globalData.userInfo.province = res.userInfo.province,
              getApp().globalData.userInfo.city = res.userInfo.city;
              getApp().globalData.userInfo.gender = res.userInfo.gender;
              wx.reLaunch({
                url: '/pages/register/register',
                success: function() {
                  console.log("跳转成功")
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log("未授权")
          wx.reLaunch({
            url: '/pages/getUserInfo/getUserInfo',
          })
        }
      }
    })
  }
})