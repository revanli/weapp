const app = getApp()

// item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    loading: false,
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    app.douban.findOne(params.id)
      .then(d => {
        this.setData({ title: d.title, movie: d, loading: false })
        wx.setNavigationBarTitle({ title: `豆瓣评分 >> ${d.title}` })
      })
      .catch(e => {
        this.setData({ title: '数据获取异常', movie: {}, loading: false })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: `豆瓣评分 >> ${this.data.title}` })
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
    return {
      title: this.data.title,
      desc: '测试',
      path: '/pages/item?id=' + this.data.id
    }
  }
})