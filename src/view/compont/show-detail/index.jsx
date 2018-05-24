import React, { Component } from 'react'
import './style.css'
import { Icon, Label,Segment } from 'semantic-ui-react'
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
                <Segment>
                    数据加载中
                </Segment>

        }
        return (
            <div className='detail_main'>

                <div className="top_bar" >
                    <span onClick={()=>{this.props.onChange('back')}}>
                        {type.name}
                    </span>
                    <span>{info&&info.title}</span>
                    <span></span>
                </div>


                <div>


                {view}
                </div>

            </div>
        )
    }
}
export default ShowDetail
