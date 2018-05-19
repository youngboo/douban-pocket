import fetchJsonp from 'fetch-jsonp'
class Util{
  static getJsonp(url){
    return new Promise(function(resolve,reject){
      fetchJsonp(url)
      .then((response)=>{
          console.log(response)
        resolve(response.json())
      })
      .catch(e=>reject(e))
    })
  }
  static fetchGet(url){
    return new Promise(function(resolve,reject){
      fetch(url)
      .then(response=>resolve(response))
          .catch((e)=>reject(e))
    })
  }
  static cache(key,value){
    localStorage.setItem(key,value)
  }
  static getCacheByKey(key){
    return localStorage.getItem(key)
  }
  static removeCache(key){
    localStorage.removeItem(key)
  }
  static looptimes(num,callback){

      for(var i=0;i<num;i++){
         callback(i)
      }

  }
}
export default Util
