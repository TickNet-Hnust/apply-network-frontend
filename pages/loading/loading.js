// pages/loading/loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:"adawdawdawdawd"
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
  log:(data)=>{
    console.log(data)
  },
  onShow: function () {
    wx.showLoading({
      title: '拼命加载...',
      duration : 1000,
    })
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res)
              wx.setStorage({
                key: 'userInfo',
                data: {
                  nickName: res.userInfo.nickName,
                  img: res.userInfo.avatarUrl,
                  country: res.userInfo.country,
                  gender: res.userInfo.gender,
                  province: res.userInfo.province,
                  city: res.userInfo.city
                },
                success:res=>{
                  this.log(this.data.x)
                }
              })
              wx.redirectTo({
                url: '../register/register',
                success: function () {
                  console.log("loading跳转成功")
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
          console.log("loading未授权")
          wx.redirectTo({
            url: '../getUserInfo/getUserInfo',
          })
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

  }
})