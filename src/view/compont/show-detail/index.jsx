import React, { Component } from 'react'
import './style.css'
import { TYPE_LIST } from '../../../js/common/config'
class ShowDetail extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        let view = undefined
        let info = this.props.info
        let type = TYPE_LIST[this.props.index]
        if(info){
            view = type.detail_tmpl.call(this,info)
        }else{
            view =
                <div>
                    数据加载中
                </div>

        }
        return (
            <div className='detail_main'>

                <div className="top_bar" >
                    <span className='back_span' onClick={()=>{this.props.onChange('back')}}>
                        <img id='back' src='static/icon/back.png'/>
                           <label htmlFor='back'>{type.name}</label>
                    </span>
                    <span className='title_span'>{info&&info.title}</span>
                    <span className='holder_span'></span>
                </div>
                {view}
            </div>
        )
    }
}
export default ShowDetail
