// pages/getUserInfo/getUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId

              setTimeout(function () {
                wx.redirectTo({
                  url: '../register/register',
                })
              }, 1000)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.hideLoading()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onGotUserInfo: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              wx.showToast({
                title: '授权成功',
                icon:'success',
                duration:1000,
                success:function(){
                  getApp().globalData.userInfo.nickName = res.userInfo.nickName;
                  getApp().globalData.userInfo.img = res.userInfo.avatarUrl;
                  getApp().globalData.userInfo.country = res.userInfo.country;
                  getApp().globalData.userInfo.gender = res.userInfo.gender;
                  getApp().globalData.userInfo.province = res.userInfo.province;
                  getApp().globalData.userInfo.city = res.userInfo.city;
                  wx.setStorage({
                    key: 'userInfo',
                    data: {
                      nickName: res.userInfo.nickName,
                      img: res.userInfo.avatarUrl,
                      country: res.userInfo.country,
                      gender: res.userInfo.gender,
                      province: res.userInfo.province,
                      city: res.userInfo.city
                    }
                  })
                  setTimeout(()=>{
                    wx.redirectTo({
                      url: '../register/register',
                    })
                    // console.log("授权成功")
                  },1000)
                }
              })
              // console.log(res)
              //授权成功之后再跳转到首页
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.showToast({
            title: '未授权无法使用，授权之后方可使用',
            icon:'none',
            duration:1500
          })
        }
      }
    })
  }
})