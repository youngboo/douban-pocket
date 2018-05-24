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
            items:[]
        }
        this.initPullAndPush()


    }
    initDataByUrl(url){
        service.findByType(url,this.props.type.list_name)
        .then((page)=>{
          this.props.type.page = page
          this.setState({
            items:this.props.type.page.list
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
        this.canActivePull = false
        this.canActivePush = false
    }
    clearState(){
        this.setState({
            pullHeight:0,
            pullText:'',
            pushHeight:0,
            pushText:''
        })
    }
    initPullState(){
        this.setState({
            pullHeight:0,
            pullText:'',
        })
    }
    initPushState(){
        this.setState({
            pushHeight:0,
            pushText:''
        })
    }
    handleItemClick(id){
        this.props.onChange(id)
    }
    handleTouchStart(ev){
        this.initPullAndPush()
        this.clearState()
        let scrollTop = this.listDiv.scrollTop
        let scrollBottom =  (scrollTop + this.listDiv.clientHeight) >= this.listDiv.scrollHeight  ? true:false
        let touch =ev.touches[0]
        this.startX = touch.clientX
        this.startY = touch.clientY

        if(scrollTop <= 0){
            this.pullDown = true
        }else{
            this.pullDown = false
        }
        if(scrollBottom){
            this.pullUp = true
        }else{
            this.pullUp = false
        }
    }
    handleTouchMove(ev){
        let touch =ev.touches[0]
        let x = touch.clientX
        let y = touch.clientY

        let moveY = y - this.lastY

        if(this.pullDown){

            if(this.state.pullHeight>=50){
                this.direction = 1
            }
            console.log(this.state.pullHeight)
            let pullHeight = this.state.pullHeight += moveY
            if(pullHeight >= 50){
                pullHeight = 50
            }

            this.setState({
                pullHeight:pullHeight,
                pullText:'下拉刷新'
            })

        }

        if(this.pullUp){
            if(moveY < 0 && Math.abs(x - this.lastX) < 50){
                if(this.state.pushHeight>=50){
                    this.direction = 0
                }
                let pushHeight = this.state.pushHeight += Math.abs(moveY)
                if(pushHeight>50){
                    pushHeight = 50
                }
                this.setState({
                    pushHeight:pushHeight,
                    pushText:'上拉加载'
                })
            }
        }

        this.lastY = y
        this.lastX = x
    }
    handleTouchEnd(ev){
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

        //console.log('end'+this.state.pullHeight)

        if(this.state.pullHeight >= 50 && this.pullDown && this.direction === 1){
            this.setState({
            pullText:'加载中'
        })

            this.direction = 0
            this.pullDown = false

            console.log('触发下拉刷新事件')
            this.handleRefreshData()

        }
        if(this.state.pushHeight >= 50 && this.pullUp && this.direction === 0){
            this.setState({
                pushText:'加载中'
            })
            this.direction = 1
            this.pullUp = false

            console.log('触发上拉加载事件')
            this.handlePullData()

        }
        this.clearState()

    }
    handlePullData(){
        if(this.props.type.page.count >= this.props.type.page.total){
            this.setState({
                pushText:'没有更多了',
                pushHeight:20
            })
        }
        service.pullData(this.url,this.props.type.page,this.props.type.list_name)
            .then((page)=>{
                this.props.type.page = page
                this.setState({
                    items:this.props.type.page.list,
                    pushHeight:0,
                    pushText:''
                })
            })
            .catch((e)=>{
                this.setState({
                    pushText:'加载失败'
                })
            })
    }

    handleRefreshData(){
        service.refreshData(this.url,this.props.type.list_name)
            .then((page)=>{
                if(this.props.type.page != page){
                    this.props.type.page = page
                    this.setState({
                        items:this.props.type.page.list,
                        pullHeight:0,
                        pullText:''
                    })
                }
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
        return (
            <div className="list"
                onTouchStart={this.handleTouchStart.bind(this)}
                 onTouchMove={this.handleTouchMove.bind(this)}
                 onTouchEnd={this.handleTouchEnd.bind(this)}
            >
                <div className='pull_div'
                >
                    <span>{this.state.pullText}</span>
                </div>

                    <div style={{width:window.innerWidth,height:window.innerHeight-160,overflowY:'scroll',overflowX:'hidden',paddingTop:this.state.pullHeight,paddingLeft:10,paddingRight:10,}}
                         ref={(div)=>this.listDiv = div}
                    >
                        <div
                        >
                            {itemRender}
                        </div>
                    </div>
                <div
                    style={{paddingBottom:this.state.pushHeight}}
                >
                    <span> {this.state.pushText}</span>
                </div>
            </div>

        )
    }
}
export default List
