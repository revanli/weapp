const URI = 'https://api.douban.com/v2/movie'
const fetch = require('./fetch')

/**
 * 抓取豆瓣电影特定类型的api
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param {String} type 类型 例如：'coming_soon'
 * @param {Object} params 参数
 * @return {Promis} promise
 */
function fetchApi (type, params) {
  return fetch(URI, type, params)
}


/**
 * 获取列表类型的数据
 * @param {String} type 类型 例如 'coming_soon'
 * @param {Object} params 参数
 * @return {Promise} 包含抓取任务的promise
 */
function find (type, page = 1, count = 20, search = '') {
  const params = {
    start: (page - 1) * count,
    count: count,
    city: getApp().data.currentCity
  }
  return fetchApi(type, search ? Object.assign(params, {q: search}) : params).then(res => res.data)
}

/**
 * 获取单条类型数据
 * @param {Number} id 电影Id
 * @param {Promise}  包含任务的Promise
 */
function findOne (id) {
  return fetchApi('subject/' + id).then(res => res.data)
}

module.exports = { find, findOne }