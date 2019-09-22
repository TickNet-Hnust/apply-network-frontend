 // pages/modify_psw/modify_psw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password1:'',
    password2:'',
    phoneNum:'',
    deadline:''
  },
  new1:function(event){
    this.setData({password1:event.detail.value})
  },
  new2: function (event) {
    this.setData({ password2: event.detail.value })
  },
  confirm:function(){
    wx.showLoading({
      title: '',
    })
    if(this.data.password1.trim()!=''&&this.data.password2.trim()!=''){
      if (this.data.password1.trim() == this.data.password2.trim()){
        wx.request({
          url: 'http://' + getApp().globalData.url +'/network/public/index.php/api/network/modify?number='+this.data.phoneNum+'&password='+this.data.password1+'&code=002',
          success:function(res){
            wx.hideLoading();
            if(res.data.error_code == 0){
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                success:function(){
                  setTimeout(function(){
                    wx.navigateBack();
                  },1200)
                }
              })
            }else{
              wx.showToast({
                title: res.data.message,
                image:'../../images/error.png'
              })
            }
            
          }
        })
        var _get = wx.getStorageSync('phoneNum')
        _get.password = this.data.password1
        wx.setStorageSync('phoneNum', _get)
        // wx.showToast({
        //   title: '修改成功',
        //   icon:'success',
        //   success:function(){
        //     setTimeout(function () {
        //       wx.navigateBack()
        //     },1000)
        //   }
        // })
      }else{
        wx.hideLoading();
        wx.showToast({
          title: '密码输入不一致',
          image: '../../images/error.png'
        })
      }
    }else{
      wx.hideLoading();
      wx.showToast({
        title: '输入不能为空',
        image:'../../images/error.png'
      })
    }
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
    var _this=this
    wx.getStorage({
      key: 'phoneNum',
      success:function(res){
        _this.setData({
          phoneNum:res.data.phoneNum,
          deadline:res.data.deadline
        })
      },
      fail: function () {
        wx.showToast({
          title: '身份验证已过期',
          image: '../../images/error.png'
        }),
          setTimeout(function () {
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