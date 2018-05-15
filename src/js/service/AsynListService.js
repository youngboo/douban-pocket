import Util from "../common/util";
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
