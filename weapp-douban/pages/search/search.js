// 获取全局应用实例对象
const app = getApp()

// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    movies: [],
    search: '',
    loading: false,
    hasMore: false
  },

  handleLoadMore () {
    if (!this.data.hasMore) return

    this.setData({ loading: true })
    return app.douban.find('search', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ movies: this.data.movies.concat(d.subjects), loading:false })
        } else {
          this.setData({ hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
      })
  },

  handleSearch (e) {
    if (!e.detail.value) {
      this.setData({ movies: [], page: 1, loading: false })
      return
    }

    this.setData({ movies: [], page: 1 })
    this.setData({ hasMore: true, loading: true, search: e.detail.value})

    this.handleLoadMore()
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
  onPullDownRefresh () {
    this.setData({ movies: [], page: 1 })
    this.handleLoadMore()
      .then(() => app.wechat.original.stopPullDownRefresh())
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