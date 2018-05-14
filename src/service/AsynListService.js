import Util from "../common/util";
/**
 * 异步资源获取服务
 */
class AsynListService{

    constructor(){
        this.initResource()
    }
    /**
     * 异步获取list参数
     * 组合cache获取和远程请求，对每次请求做缓存
     * @param {*} value 
     */
    findBooksBySearch(value){
        
        return new Promise(function(resolve,reject){
            var content = Util.getCacheByKey(value)
            if(!content){
                Util.getJsonp(value)
                .then((myJson)=>{
                    resolve(myJson)
                    Util.cache(value,myJson)
                })
                }else{
                    resolve(content)
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