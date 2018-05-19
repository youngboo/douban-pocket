import React, { Component } from 'react'
import './style.css'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import AsynListService from '../../../js/service/AsynListService'
import { Link } from 'react-router-dom'
import { TYPE_LIST } from '../../../js/common/config'
class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {info:null}
        this.service = AsynListService.getInstance()
        this.data = this.props.location.state

        this.service.getDetailById(this.data.type,this.data.id)
            .then(json=>{
                console.log(json)
                this.setState({
                    info:json
                })
            })
    }
    render() {
        let info = this.state.info
        let view = undefined
        if(info){
            console.log(info)
            view = TYPE_LIST[this.data.index].detail_tmpl.call(this,info)
        }else{
            view =
                <Segment>
                    数据加载中
                </Segment>

        }
        return (
            <Segment basic textAlign='center' padded>
                {/*<nav>*/}
                    {/*<Link to='/'>返回</Link>*/}
                {/*</nav>*/}
                <Segment basic fluid color='blue' textAlign='left'>
                <Menu compact icon='labeled'>
                    <Menu.Item>
                        <Link to='/'>
                            <Icon name='chevron left'/>
                            回到主页
                        </Link>

                    </Menu.Item>

                </Menu>
                </Segment>
                {view}

            </Segment>
        )
    }
}
export default ItemDetail
