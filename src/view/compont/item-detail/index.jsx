import React, { Component } from 'react'
import './style.css'
import { Segment } from 'semantic-ui-react'
import AsynListService from '../../../js/service/AsynListService'
import { Link } from 'react-router-dom'
import { TYPE_LIST } from '../../../js/common/config'
class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {info:{}}
        this.service = AsynListService.getInstance()
        this.data = this.props.location.state
        this.service.getDetailById(this.data.type,this.data.id)
            .then(json=>{
                this.setState({
                    info:json
                })
            })
    }

    render() {
        let info = this.state.info
        let view = undefined
        if(info){
            view = TYPE_LIST[this.data.index].detail_tmpl.call(this,info)
        }else{
            view =
                <Segment>
                    数据加载中
                </Segment>

        }
        console.log(view)
        return (
            <Segment basic textAlign='center'>
                <nav>
                    <Link to='/'>返回</Link>
                </nav>
                {view}

            </Segment>
        )
    }
}
export default ItemDetail
