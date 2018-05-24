import React, { Component } from 'react'
import './style.css'
import { Icon, Label,Segment } from 'semantic-ui-react'
import { TYPE_LIST } from '../../../js/common/config'
class ShowDetail extends Component {
    constructor(props) {
        super(props)
        this.index = this.props.index

    }
    render() {
        let view = undefined
        let info = this.props.info
        if(info){
            view = TYPE_LIST[this.index].detail_tmpl.call(this,info)
        }else{
            view =
                <Segment>
                    数据加载中
                </Segment>

        }
        return (
            <div>
            <div style={{height:30}}>
                <Segment inverted textAlign='left' color='blue' >
                    <Label  color='blue'
                           onClick={()=>{this.props.onChange('back')}}
                           as='a'
                    >
                        <Icon name='chevron left'/>
                        回到主页
                    </Label>
                </Segment>
            </div>
            <Segment basic textAlign='center'>



                {view}

            </Segment>
    </div>
        )
    }
}
export default ShowDetail
