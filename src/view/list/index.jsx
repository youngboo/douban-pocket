import React, { Component } from 'react'
import './style.css'
import { Item, Button, Grid, Transition, Ref } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class List extends Component {
    constructor(props) {
        super(props)
        this.items = []
        this.service = props.service
        this.state = {
            pullHeight:0,
            pullText:'',
            pushHeight:0,
            pushText:''

        }
        this.lastY = 0
        this.lastX = 0
        this.direction = 0
        this.pullDown = false
        this.pullUp = false

    }
    handleItemClick(id){
        let state={id:id,type:this.props.type,index:this.props.index}
        this.props.onChange(id)
    }
    handleTouchStart(ev){
        let scrollTop = this.listDiv.scrollTop
        //console.log(scrollTop+this.listDiv.clientHeight)
       // console.log(this.listDiv.scrollHeight)
        let scrollBottom =  (scrollTop + this.listDiv.clientHeight) >= this.listDiv.scrollHeight  ? true:false

       if(scrollTop <= 0){
            this.pullDown = true
       }
       if(scrollBottom){
            console.log('拉到底了')
            this.pullUp = true
       }
    }
    handleTouchMove(ev){
        let touch =ev.touches[0]
        let x = touch.clientX
        let y = touch.clientY

        if(this.pullDown){
            if(y - this.lastY > 0 && Math.abs(x - this.lastX )< 50 ){
                if(this.state.pullHeight>=50){
                    this.direction = 1
                }
                let pullHeight = this.state.pullHeight += 2
                if(pullHeight>50){
                    pullHeight = 50
                }
                this.setState({
                    pullHeight:pullHeight,
                    pullText:'下拉刷新'
                })
            }
        }

        if(this.pullUp){
            if(y - this.lastY < 0 && Math.abs(x - this.lastX) < 50){
                if(this.state.pushHeight>=50){
                    this.direction = 0
                }
                let pushHeight = this.state.pushHeight += 2
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
        // let pullHeight =this.div.style.height
        // let height = pullHeight.replace(pullHeight.match(/[a-z]+$/),'')
        // if(height && height > 0){
        //     this.timerID = this.pullDown2(height)
        // }

        console.log(this.pullDown,this.direction)
        if(this.pullDown && this.direction === 1){
            this.setState({
            pullText:'加载中'
        })
            this.props.onChange(this.props.url)
            this.direction = 0
            this.pullDown = false

            setTimeout(()=>{
                this.setState({
                    pullHeight:0,
                    pullText:''
                })
            },1000)


        }
        if(this.pullUp && this.direction === 0){
            this.setState({
                pushText:'加载中'
            })
            console.log('加载数据')
            this.props.onChange(this.props.url,'pull')

            this.pullUp = false

            setTimeout(()=>{
                this.setState({
                    pushHeight:0,
                    pushText:''
                })
            },1000)


        }

    }
    render() {
        let itemRender
        if (this.props.items&&this.props.items.length>0) {
            itemRender =  this.props.items.map((item)=>{
                return this.props.tmpl.call(null,item,this)
            })
           }
        return (
            <div className="list"
                onTouchStart={this.handleTouchStart.bind(this)}
                 onTouchMove={this.handleTouchMove.bind(this)}
                 onTouchEnd={this.handleTouchEnd.bind(this)}
            >
                <div
                 style={{width:'100%',height:this.state.pullHeight,display:this.pullDown?'block':'none'}}
                >
                    <span>{this.state.pullText}</span>
                </div>

                    <div style={{height:window.innerHeight-250,overflowY:'scroll'}}
                         ref={(div)=>this.listDiv = div}
                    >
                        <Item.Group divided unstackable link={true}
                        >
                             {itemRender}
                        </Item.Group>
                    </div>
                <div
                    style={{width:'100%',height:this.state.pushHeight,display:this.pullUp?'block':'none'}}
                >
                    <span>{this.state.pushText}</span>
                </div>
            </div>

        )
    }
}
export default List
