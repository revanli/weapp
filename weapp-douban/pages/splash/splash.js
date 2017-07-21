// 获取全局应用程序实例对象
const Promise = require('../../utils/bluebird')
const app = getApp()

// splash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    loading: true
  },

  getCache () {
    return new Promise(resolve => {
      app.wechat.getStorage('last_splash_data')
        .then(res => {
          // 有缓存，判断是否过期
          if (res.data.expires < Date.now()) {
            // 过期
            console.log('storage expired')
            return resolve(null)
          }
          return resolve(res.data)
        })
        .catch(e => resolve(null))
    })
  },

  handleStart () {
    // switchTab 只能打开tabBar页面
    wx.switchTab({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCache()
      .then(cache => {
        if (cache) {
          return this.setData({ movies: cache.movies, loading: false })
        }

        app.douban.find('coming_soon', 1, 3)
          .then(d => {
            this.setData({ movies: d.subjects, loading: false })
            return app.wechat.setStorage('last_splash_data', {
              movies: d.subjects,
              // 设置维持一天的过期时间，毫秒
              expires: Date.now() + 1 * 24 * 60 * 60 * 1000
            })
          })
          .then(() => console.log('storage last splash data'))
      })
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