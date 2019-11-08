// pages/register/register.js
var app = getApp();
Page({

  data: {
    r_data: '',
    phoneNum: '',
    validation: '',
    codename: '获取验证码',
    disabled: false,
    isShow: true,
    isAgree: false,
    error:''
  },
  login: function () {
    wx.showLoading({
      title: '拼命加载中...',
    })
    wx.setStorage({
      key: 'phoneNum',
      data: {
        deadline: new Date().getTime() + 20 * 60 * 60 * 1000,
        phoneNum: app.encode("13373727862"),
        password: app.encode("123456")
      }
    })
    setTimeout(()=>{
      wx.reLaunch({
        url: '../index/index',
      })
    },1000)
    
  },
  bindAgreeChange: function () {
    this.setData({
      isAgree: !this.data.isAgree
    })
    // console.log(this.data.isAgree)
  },
  inputNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
    getApp().globalData.phoneNum = e.detail.value
  },
  inputValid: function (e) {
    this.setData({
      validation: e.detail.value
    })
  },
  /*
   发送验证码：要求有正确的手机号码
 */
  getData: function () {
    wx.login({
      success: res => {
        console.log(res);
        getApp().globalData.appCode = res.code
      }
    });
   
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.phoneNum.trim() == '' || !myreg.test(this.data.phoneNum.trim())) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
    }else{
      var that = this;
      var num = app.globalData.sendMail;
      wx.showLoading({
        title: '加载中',
      });
      
      wx.request({
        url: app.globalData.url + '/apply-network-server/public/api/Sendms' ,
        data:{
          number: that.data.phoneNum,
          appCode: getApp().globalData.appCode
        },
        success: function (res) {
          if (res.statusCode == 404 || res.statusCode == 500) {
            wx.showToast({
              title: res.statusCode + '请求错误',
              icon: 'none'
            })
          }else{
            var _this = that
            if (res.data.error_code) {
              wx.hideLoading()
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000,
                success: function () {
                  _this.setData({
                    disabled: true,
                    codename: num + "s后再获取"
                  })
                }
              })
              var timer = setInterval(function () {
                num--;
                if (num <= 0) {
                  clearInterval(timer);
                  _this.setData({
                    codename: '获取验证码',
                    disabled: false
                  })
                } else {
                  _this.setData({
                    codename: num + "s后再获取",
                    disabled: true
                  })
                }
              }, 1000)
            } else {
              setTimeout(function () {
                wx.showToast({
                  title: '网络请求错误',
                  icon: 'none'
                })
              }, 2000)
            }
          }
        },
        fail: function (res) {
          setTimeout(function(){
            wx.showToast({
              title: '网络请求错误',
              icon:'none'
            })
          },2000)
        }
      })
    }
    
  },

  /*
    注册信息：要求有正确的手机号码和正确的验证码
  */
  register: function () {
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    let n = /^\d{4}$/;
    if (this.data.phoneNum.trim() == '' || !myreg.test(this.data.phoneNum.trim())) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.validation.trim() == '' || !n.test(this.data.validation.trim())) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        duration: 1000
      })
      return 0;
    } else if (this.data.isAgree == false) {
      wx.showToast({
        title: '请同意《相关条款》',
        icon: 'none',
        duration: 1000
      })
      return 0;
    } else {
      wx.showLoading({
        title: '',
      })
      wx.login({
        success: res => {
          console.log(res);
          getApp().globalData.appCode = res.code
        }
      })
      let temp = new Date();
      getApp().globalData.phoneNum = this.data.phoneNum.trim();
      getApp().globalData.validation = this.data.validation.trim();
      getApp().globalData.setTime = (temp.getHours()) * 60 * 60 + (temp.getMinutes()) * 60 + temp.getSeconds();
      getApp().globalData.clearSto = 24 * 60 * 60 * 1000 * 2 - getApp().globalData.setTime * 1000;
      console.log(temp.getHours());
      console.log(temp.getMinutes());
      console.log(temp.getSeconds());
      wx.request({
        url: getApp().globalData.url + '/apply-network-server/public/api/network/create',
        data: {
          number: getApp().globalData.phoneNum,
          messageCode: getApp().globalData.validation,
          appCode: getApp().globalData.appCode,
          nickName: getApp().globalData.userInfo.nickName,
          gender: getApp().globalData.userInfo.gender,
          province: getApp().globalData.userInfo.province,
          city: getApp().globalData.userInfo.city,
          country: getApp().globalData.userInfo.country
        },
        success: function (res) {
          if (res.statusCode == 404 || res.statusCode == 500) {
            wx.showToast({
              title: res.statusCode + '请求错误',
              icon: 'none'
            })
          } else {
          if (res.data.error_code == "0") {
            wx.hideLoading();
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              success: function () {
                setTimeout(function () {
                  wx.setStorage({
                    key: 'phoneNum',
                    data: {
                      deadline: new Date().getTime() + getApp().globalData.clearSto,
                      phoneNum: app.encode(res.data.account),
                      password: app.encode(res.data.password)
                    }
                  })
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 1000)
              }
            })
          }else{
            wx.hideLoading()
            wx.showToast({
              title: res.data.message ? res.data.message : "网络出错",
              icon: 'none',
            })
          }
          }
        },
        fail: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '出错',
            icon:'none'
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
onShow:function(){
  try {
    const res = wx.getStorage({
      key: 'phoneNum',
      success: function (res) {
        // console.log(res.data.phoneNum)
        if (new Date().getTime() > res.data.deadline) {
          wx.showToast({
            title: '身份验证过期,请重新获取账号',
            icon:'none',
            success: function () {
              wx.clearStorage()
              return;
            }
          })
        } else {
          if (res.data.phoneNum) {
            wx.showLoading({
              title: '正在登录',
            })
            setTimeout(function () {
              wx.hideLoading()
              wx.switchTab({
                url: '../index/index',
              })
            }, 1000)
          } else {
            console.log('无缓存')
          }
        }

      },
      fail: function () {
      }
    })
  } catch (e) {
    // Do something when catch error
  }
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 页面的初始数据
   */
})