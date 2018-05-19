import React, { Component } from 'react'
import './style.css'
import AsynListService from '../../../js/service/AsynListService'
const service = AsynListService.getInstance()
const text = ['正在加载','开始','结束']
class PushRefresh extends Component {
    constructor(props) {
        super(props)
        this.items = [];

        this.state ={
            textIndex:-1,
            height:0
        }
    }
    handleTouchStart(e){

      console.log("开始拖拽",e.clientY,e)
      this.startTouch = e.clientY
  }
    handleTouchMove(e){
        console.log("拖拽中")
        let move = e.clientY - this.startTouch
        this.setState({height:move+'px'})
    }
    handleTouchEnd(e){
        console.log("结束拖拽",e.clientY)
        let endTouch = e.clientY
        if((endTouch - this.startTouch) >50){
            console.log('触发事件')
            service.refreshData()
        }
    }

    render() {

        return (
            <div className='push-refresh'
                onTouchStart ={(e)=>{this.handleTouchStart(e)}}
                onTouchEnd ={(e)=>{this.handleTouchEnd(e)}}
                onTouchMove ={(e)=>{this.handleTouchMove(e)}}
            >
                <div>
                    {text[this.state.textIndex]}
                </div>
                    <div className='item'>
                    <pre>
                        asjdifojwe
                        jiowejfioj
                        wjeifj
                        wjfi
                        wejfoiwejf
                        wjiweof

                    </pre>
                    </div>


            </div>
        )
    }
}
export default PushRefresh
