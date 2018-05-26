import React, { Component } from 'react'
import './style.css'
import AsyncDataService from '../../js/service/AsyncDataService'
const service = AsyncDataService.getInstance()
class List extends Component {
    constructor(props) {
        super(props)
        this.url = ''
        this.init = false
        this.state={
            pullHeight:0,
            pullText:'',
            pushHeight:0,
            pushText:'',
            items:[],
            find:true
        }
        this.initPullAndPush()


    }
    initDataByUrl(url){
        service.findByType(url,this.props.type.list_name)
        .then((page)=>{
          this.props.type.page = page
            if(page.count === 0){
              console.log(page)
              this.setState({
                  find:false
              })
            }
            this.canPullLoad = ((page.start + page.count) < page.total)?true:false
          this.setState({
              items:this.props.type.page.list,
              pushText:this.canPullLoad?'上拉加载':'没有更多了'
          })
        })
    }
    initPullAndPush(){
        this.lastY = 0
        this.lastX = 0
        this.startX = 0
        this.startY = 0
        this.direction = 0
        this.pullDown = false
        this.pullUp = false
    }
    clearState(){
        this.setState({
            pullHeight:0,
            pullText:'',
            pushHeight:0,
            pushText:''
        })
    }

    handleItemClick(id){
        this.props.onChange(id)
    }
    canTouchMove(){
        return this.listDiv.scrollHeight > this.listDiv.clientHeight
    }
    handleTouchStart(ev){
       if(!this.canTouchMove()){
           return false
       }
        let scrollTop = this.listDiv.scrollTop
        let scrollBottom =  (scrollTop + this.listDiv.clientHeight) >= this.listDiv.scrollHeight  ? true:false
        let touch =ev.touches[0]
        this.startX = touch.clientX
        this.startY = touch.clientY
        this.lastX = this.startX
        this.lastY = this.startY
        //console.log(this.listDiv.offsetTop+200,this.startY)
        if(scrollTop <= 0 && this.startY < this.listDiv.offsetTop+200){
            this.initPullAndPush()
            this.pullDown = true
        }else{
            this.pullDown = false
        }
        let bottom = this.listDiv.clientHeight + this.listDiv.offsetTop - 200
        //console.log(bottom,this.startY)
        if(scrollBottom && this.canPullLoad && this.startY > bottom){
            this.initPullAndPush()
            this.pullUp = true
        }else{
            this.pullUp = false
        }

    }
    handleTouchMove(ev){
        if(!this.canTouchMove()){
            return false
        }
        let touch =ev.touches[0]
        let x = touch.clientX
        let y = touch.clientY

        let moveY = y - this.lastY

        if(this.pullDown){
            if(Math.abs(moveY)>3){

                if(this.state.pullHeight>=50){
                    this.direction = 1
                }
                let pullHeight = this.state.pullHeight + moveY
                if(pullHeight >= 50){
                    pullHeight = 50
                }
                if(pullHeight <= 0){
                    pullHeight = 0
                }

                this.setState({
                    pullHeight:pullHeight,
                    pullText:'下拉刷新'
                })
            }
        }

        if(this.pullUp && this.canPullLoad){
            if(this.state.pushHeight >= 50){
                this.direction = 0
            }
            let pushHeight = this.state.pushHeight - moveY
            if(pushHeight >= 50){
                pushHeight = 50
            }if(pushHeight <= 0){
                pushHeight = 0
            }

            this.setState({
                pushHeight:pushHeight,
                pushText:'上拉加载'
            })

        }

        this.lastY = y
        this.lastX = x
    }
    handleTouchEnd(ev){
        if(!this.canTouchMove()){
            return false
        }
        let touch =ev.changedTouches[0]
        let endX = touch.clientX
        let endY = touch.clientY
        let moveX = this.startX - endX
        let moveY = this.startY - endY

        if(Math.abs(moveX) > 50 || Math.abs(moveY) < 50){
            this.initPullAndPush()
            this.clearState()
            return
        }
        if(this.state.pullHeight >= 50 && this.pullDown && this.direction === 1){
            this.setState({
                pullText:'加载中',
                pullHeight:50
            })
            this.handleRefreshData()
        }
        if(this.state.pushHeight >= 50 && this.pullUp && this.direction === 0 && this.canPullLoad){
            this.setState({
                pushText:'加载中'
            })
            this.handlePullData()
        }
    }
    handlePullData(){
        if(this.props.type.page.count >= this.props.type.page.total){
            this.setState({
                pushText:'没有更多了'
            })
            return
        }
        service.pullData(this.props.url,this.props.type.page,this.props.type.list_name)
            .then((page)=>{
                this.props.type.page = page
                this.canPullLoad = ((page.start + page.count) < page.total)?true:false
                this.setState({
                    items:this.props.type.page.list,
                    pushHeight:0,
                    pushText:this.canPullLoad?'上拉加载':'没有更多了'
                })
            })
            .catch((e)=>{
                this.setState({
                    pushText:'加载失败'
                })
            })
    }

    handleRefreshData(){
        service.refreshData(this.props.url,this.props.type.list_name)
            .then((page)=>{
                this.props.type.page = page
                this.setState({
                    items:this.props.type.page.list,
                    pullHeight:0,
                    pullText:''
                })
            })
    }

    render() {
        let itemRender
        let url = this.props.url
        if(url && url != '' && url!=this.url ){
            this.initDataByUrl(url)
            this.url = url
        }

        let items = this.state.items

        if (items && items.length > 0) {
            itemRender =  items.map((item)=>{
                return this.props.type.list_tmpl.call(null,item,this)
            })
           }
           let render
        if(this.state.find){
            render =
                <main className="content flex-1 list"
                     onTouchStart={this.handleTouchStart.bind(this)}
                     onTouchMove={this.handleTouchMove.bind(this)}
                     onTouchEnd={this.handleTouchEnd.bind(this)}
                     ref={(div)=>this.listDiv = div}
                >
                    {!this.state.find&&
                    <div>
                        没有找到相关内容
                    </div>
                    }
                    <div className={this.state.pullText==''?'pull_div hide':'pull_div'}>
                        <span>{this.state.pullText}</span>
                    </div>
                    <div className='list_content' style={{paddingTop:this.state.pullHeight}}>
                        {itemRender}
                    </div>
                    <div className='push_div'>
                        <span>{this.state.pushText}</span>
                    </div>
                </main>
        }else{
            render = <main className="content flex-1 list no-search">
                <h3>搜索</h3>
                <span>没有找到相关内容，换个搜索词试试吧。</span>
            </main>
        }
        return render
    }
}
export default List
