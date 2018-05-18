import React, { Component } from 'react'
import './style.css'
import { Card, Image, Segment } from 'semantic-ui-react'
import AsynListService from '../../../js/service/AsynListService'
import { Link } from 'react-router-dom'
import { TYPE_LIST } from '../../../js/common/config'
class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {info:{}}
        this.service = AsynListService.getInstance()
        let id = this.props.match.params.id
        this.service.getDetailById(id)
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
            // view =
            //     <Segment basic textAlign='center'>
            //         <Card centered fluid>
            //             <Image src={info.image}/>
            //             <Card.Content>
            //                 <Card.Header>
            //                     {info.title}
            //                 </Card.Header>
            //                 <Card.Meta>
            //                 <span className='date'>
            //                     {info.pubdate}
            //                 </span>
            //                 </Card.Meta>
            //                 <Card.Description>
            //                     {info.summary}
            //                 </Card.Description>
            //             </Card.Content>
            //         </Card>
            //     </Segment>
            view = TYPE_LIST[0].detail_tmpl.call(this,info)

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
