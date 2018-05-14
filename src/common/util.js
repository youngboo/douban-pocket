import jquery from 'jquery'
import fetchJsonp from 'fetch-jsonp'
class Util{
  constructor(){
    this.xhr = new XMLHttpRequest()
  }
  static getJsonp(url){
    return new Promise(function(resolve,reject){
      fetchJsonp(url)
      .then((response)=>{
        resolve(response.json())
      })
      .catch(e=>reject(e))
    })
  }
  static fetchGet(url){
    return new Promise(function(resolve,reject){
      fetch(url)
      .then(response=>console.log(response))
    })
  }
  jqueryGet(){
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSONP',//here
      success: function (data) {
        
    }
  });
  }
  get(url,data,callback){
    this.xhr.onreadystatechange=()=>{
      if(this.xhr.readyState === 4){
        callback(this.xhr.responseText)
      }else{
        console.log(this.xhr.readyState)
      }
    }
    this.xhr.open('get',url,true)
    this.xhr.send(data)
  }
  fetch(url,callback){
    fetch(url)
      .then(function(response) {
        return response.json()
      })
  }
  static cache(key,value){
    localStorage.setItem(key,value)
  }
  static getCacheByKey(key){
    localStorage.getItem(key)
  }
  static removeCache(key){
    localStorage.removeItem(key)
  }
}
export default Util