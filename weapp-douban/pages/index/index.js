//index.js
//获取应用实例
var Promise = require('../../utils/bluebird')
var app = getApp()

// 创建页面实例对象
Page({
  /**
   * 初始化数据
   */
  data: {
    boards: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'us_box' },
      { key: 'top250' }
    ],
    loading: true
  },
  
  /**
   * 生命周期函数-监听页面加载
   */
  onLoad () {
    const promises = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 10)
        .then(d => {
          board.title = d.title
          board.movies = d.subjects
          return board
        })
    })
    // 所有处理完后一起设置
    Promise.all(promises).then(boards => {
      this.setData({ boards: boards, loading: false})
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
