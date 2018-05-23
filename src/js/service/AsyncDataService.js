import Util from "../common/util";
import Page from '../model/page'
import { CONFIG } from '../common/config'

/**
 * 异步资源获取服务
 */
class AsyncDataService{

    /**
     * 异步获取
     * 组合cache获取和远程请求，对每次请求做缓存
     * @param {*} url
     */
    findBooksBySearch(url){

        return new Promise(function(resolve,reject){
            let content = Util.getCacheByKey(url)
            if(!content){
                Util.getJsonp(url)
                .then((myJson)=>{
                    Util.cache(url,JSON.stringify(myJson))
                    resolve(myJson)

                })
                    .catch((e)=>reject(e))
                }else{
                    resolve(JSON.parse(content))
                }
        })


    }
    findByType(url,name){
        return new Promise(function(resolve,reject){
            let content = Util.getCacheByKey(url)
            if(!content || content == ''){
                Util.getJsonp(url)
                    .then((myJson)=>{
                        let list = myJson[name]
                        let page = new Page(myJson.start,myJson.count,myJson.total,list)
                        Util.cache(url,JSON.stringify(page))
                        resolve(page)

                    })
                    .catch((e)=>reject(e))
            }else{
                resolve(JSON.parse(content))
            }
        })
    }
    getDetailByUrl(url){
        return new Promise((resolve,reject)=>{
            let content = Util.getCacheByKey(url)
            if(!content || content == ''){
                Util.getJsonp(url)
                    .then((myJson)=>{
                        Util.cache(url,JSON.stringify(myJson))
                        resolve(myJson)

                    })
                    .catch((e)=>reject(e))
            }else{
                resolve(JSON.parse(content))
            }
        })
    }
    getDetailById(name,id){
        let url = CONFIG[name]+id
        return this.getDetailByUrl(url,name)
    }

    /**
     * 刷新数据
     * @param url
     * @param name
     * @returns {Promise}
     */
    refreshData(url,name){
        return new Promise((function (resolve,reject) {
            Util.getJsonp(url)
                .then((myJson)=>{
                    let list = myJson[name]
                    let page = new Page(myJson.start,myJson.count,myJson.total,list)
                    Util.cache(url,JSON.stringify(page))
                    resolve(page)

                })
                .catch((e)=>reject(e))
        }))
    }

    /**
     * 下拉获取数据
     * @param url
     * @param page
     * @param name
     * @returns {Promise}
     */
    pullData(url,page,name){
        return new Promise(function (resolve,reject) {
            let pageCount = page.list.length
            let pageEnd = pageCount + page.start
            if(pageEnd >= page.total){
                resolve(page)
            }
            let newUrl = url + '&start='+pageEnd+'&count='+pageCount
            Util.getJsonp(newUrl)
                .then((myJson)=>{
                    let list = page.list.concat(myJson[name])
                    let newPage = new Page(page.start,list.length,myJson.total,list)
                    Util.cache(url,JSON.stringify(newPage))
                    resolve(newPage)
                })
                .catch((e)=>reject(e))
        })



    }

   static getInstance(){
        if(!this.service){
            this.service = new AsyncDataService()
        }
        return this.service
    }
    initResource(){

    }
}
export default AsyncDataService
