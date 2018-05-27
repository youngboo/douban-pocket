import fetchJsonp from 'fetch-jsonp'
import store from 'storejs'
class Util {
  static getJsonp (url) {
    return new Promise(function (resolve, reject) {
      fetchJsonp(url)
        .then((response) => {
          resolve(response.json())
        })
        .catch(e => reject(e))
    })
  }
  static cache (key, value) {
    store.set(key, value)
  }

  static getCacheByKey (key) {
    return store.get(key)
  }

  static removeCache (key) {
    store.remove(key)
  }
}
export default Util
