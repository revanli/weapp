// 获取全局应用程序实例对象
const app = getApp()

// lists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  handleLoadMore () {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })
    console.log(this.data.size)
    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.subjects), loading: false })
        } else {
          this.setData({ subtitle: d.title, hasMore: false, loading: false})
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取路由传过来的数据
   */
  onLoad: function (params) {
    this.data.title = params.title || this.data.title

    this.data.type = params.type || this.data.type

    // 北美票房排行榜只需加载一次
    this.handleLoadMore().then(() => {
      if (this.data.type == 'us_box') {
        this.setData({ hasMore: false })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: '豆瓣评分 >> ' + this.data.title })
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
   * 刷新后停止
   */
  onPullDownRefresh: function () {
    console.log('in')
    this.setData({ movies: [], page: 1, hasMore: true })
    this.handleLoadMore()
      .then(() => { app.wechat.original.stopPullDownRefresh() })
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