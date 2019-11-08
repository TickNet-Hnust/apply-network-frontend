// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    modify_psw: '修改密码',
    logout: '注销'
  },
  //跳转到修改密码页面；现在废弃，使用navigator组件跳转
  next_to: () => {
    wx.navigateTo({
      url: '../modify_psw/modify_psw'
    })
  },
  //注销
  logout: function() {
    wx.showLoading({
      title: '',
    })
    wx.login({
      success: res => {
        console.log(res);
        getApp().globalData.appCode = res.code
      }
    })
    var that = this;
    try{
      wx.request({
        url: getApp().globalData.url + '/apply-network-server/public/api/network/close',
        data: {
          number: that.data.phoneNum,
          appCode: getApp().globalData.appCode
        },
        success: function (res) {
          if (res.statusCode == 404 || res.statusCode == 500){
            wx.showToast({
              title: res.statusCode + '请求错误',
              icon: 'none'
            })
          }else{
            wx.hideLoading();
            if (res.data.error_code == 0) {
              wx.removeStorage({
                key: 'phoneNum'
              })
              wx.showToast({
                title: res.data.message,
                duration: 1000,
                success: () => {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '../register/register',
                    })
                  }, 1000)
                }
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
          }
          
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '网络出错',
            icon: 'none'
          })
        }
      })
    }catch(err){
      console.log(err)
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    wx.getStorage({
      key: 'phoneNum',
      success: function(res) {
        if (new Date().getTime() > res.data.deadline) {
          wx.showToast({
            title: '身份验证过期',
            image: '../../images/error.png',
            success: function () {
              wx.clearStorage()
              setTimeout(function () {
                wx.redirectTo({
                  url: '../register/register',
                })
              }, 1000)
            }
          })
        }else{
          _this.setData({
            phoneNum: res.data.phoneNum,
          })
        }
        // wx.getStorage({
        //   key: 'phoneNum',
        //   success: function() {
        //     _this.setData({
        //       phoneNum: res.data.phoneNum,
        //     })
        //   }
        // })
      },
      fail: function() {
        wx.showToast({
            title: '身份验证已过期',
            image: '../../images/error.png'
          }),
          setTimeout(function() {
            wx.redirectTo({
              url: '../register/register',
            })
          }, 1000)

      }
    })
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

  }
})