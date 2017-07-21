/**
 * Wechat api封装
 */
const wechat = require('./utils/wechat.js')

/**
 * Douban api
 */
const douban = require('./utils/douban.js')

/**
 * baidu api
 */
const baidu = require('./utils/baidu.js')


// app.js
App({
  data: {
    name: 'Douban Movie',
    currentCity: '广州'
  },

  wechat: wechat,
  douban: douban,
  baidu: baidu,

  /**
   * 生命周期函数 - 监听小程序初始化
   * 当小程序初始化完成时，会初始化onLaunch(全局只触发一次)
   */
  onLaunch () {
    wechat
      .getLocation()
      .then(res => {
        // 对象解构
        const { latitude, longitude } = res
        console.log(latitude, longitude)
        return baidu.getCityName(latitude, longitude)
      })
      .then(name => {
        this.data.currentCity = name.replace('市', '')
        console.log(`currentCity: ${this.data.currentCity}`);
      })
      .catch(err => {
        this.data.currentCity = '广州'
        console.log(err);
      })
    console.log('======= App is Launched ========');
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    console.log(' ========== Application is hide ========== ')
  }
})
