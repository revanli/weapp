const URI = 'https://api.map.baidu.com'
const fetch = require('./fetch')

function fetchApi (type, params) {
  return fetch(URI, type, params)
}

/**
 * 根据经纬度获取城市
 * @param {Number} Latitude 经度
 * @param {Number} Longitude 纬度
 * @return {Promise} Promise
 */
// ak is baidu map person key
function getCityName (latitude = 39.90403, longitude = 116.407526) {
  const params = {
    location: `${latitude}, ${longitude}`,
    output: 'json',
    ak: 'paCu5qdATXmHg6Rmne8s1zvllvXzr7Ek'
  }
  return fetchApi('geocoder/v2/', params).then(res => res.data.result.addressComponent.city)
}


module.exports = {
  getCityName
}