import Util from "../common/util";
import Page from '../model/page'
import { CONFIG } from '../common/config'

/**
 * 异步资源获取服务
 */
class AsynListService{

    constructor(){
        this.initResource()
    }
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
                        let page = new Page(myJson.start,myJson.end,myJson.total,list)
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
            console.log(url)
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
    getDetailById(id){
        let url = CONFIG.book_detail+id
        return this.getDetailByUrl(url)
    }
    refreshData(){

    }

   static getInstance(){
        if(!this.service){
            this.service = new AsynListService()
        }
        return this.service
    }
    initResource(){

    }
}
export default AsynListService
