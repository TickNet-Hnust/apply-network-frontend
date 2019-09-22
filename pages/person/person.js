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
  next_to: () => {
    wx.navigateTo({
      url: '../modify_psw/modify_psw',
    })
  },
  logout: function() {
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'http://' + getApp().globalData.url + '/network/public/index.php/api/network/close?number=' + this.data.phoneNum+'&code=007' ,
      success :function(res){
        wx.hideLoading();
        if(res.data.error_code == 0){
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
        }else{
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
      fail:function(res){
        wx.hideLoading();
        wx.showToast({
          title: '网络出错',
          icon: 'none'
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showNavigationBarLoading({
    //   success:function(){
    //     setTimeout(
    //     ()=> {
    //       wx.hideNavigationBarLoading()
    //        wx.showToast({
    //         title: '加载成功',
    //         duration: 1000,
    //       })
    //     },1000)
    //   }
    // })
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