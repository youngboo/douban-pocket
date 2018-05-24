import React, { Component } from 'react'
import './style.css'
import AsynListService from '../../../js/service/AsyncDataService'
import { Image, Label } from 'semantic-ui-react'
const service = AsynListService.getInstance()
const text = ['正在加载','开始','结束']
class PushRefresh extends Component {
    constructor(props) {
        super(props)
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
    handleTouchStart(){
        let scrollTop = this.listDiv.scrollTop
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
    handleTouchEnd(){

        console.log(this.pullDown,this.direction)
        if(this.pullDown && this.direction === 1){
            this.setState({
                pullText:'加载中'
            })
            //this.props.onChange(this.props.url)
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
            //this.props.onChange(this.props.url,'pull')

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

        return (
            <div className="list"
                 onTouchStart={this.handleTouchStart.bind(this)}
                 onTouchMove={this.handleTouchMove.bind(this)}
                 onTouchEnd={this.handleTouchEnd.bind(this)}
            >
                <Label attached='top'>{this.state.pullText}</Label>

                <div style={{zIndex:2,width:'100%',height:window.innerHeight-250,overflowY:'scroll',paddingTop:this.state.pullHeight,paddingBottom:this.state.pushHeight}}
                     ref={(div)=>this.listDiv = div}
                >
                  12345
                    <br/>
                    12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>12345
                    <br/>
















                </div>
                <Label attached='bottom'>{this.state.pushText}</Label>
            </div>
        )
    }
}
export default PushRefresh
