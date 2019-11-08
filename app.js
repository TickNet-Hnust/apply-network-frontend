//app.js
import {Base64} from './utils/base64.js'
App({
  data: {

  },
  globalData: {
    //设置请求url
    url: 'http://a2xfvt.natappfree.cc',
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
      img:''
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
  encode:(data)=>{
    return Base64.encode(data.toString());
  },
  decode:(data)=>{
    return Base64.decode(data.toString());
  },
  log: (data) => {
    console.log(data)
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
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    wx.showLoading({
      title: '拼命加载...',
      duration: 1000,
    })
    // console.log("loading未获取")
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // console.log("已授权")
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log("app.js")
        }
      }
    })

  }
})