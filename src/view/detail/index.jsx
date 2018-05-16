import React, { Component } from 'react'
import './style.css'
import { Card, Header, Image } from 'semantic-ui-react'
class Detail extends Component {
    constructor(props) {
        super(props)
    }
    getDetail(info){
        console.log(info)
        if(info){
            return( <div>
                <div>
                    <image src={info.image}></image>
                </div>
            </div>)
        }

    }

    render() {
        let info = this.props.active
        let active = this.props.active?true:false

        return (
            <div className={active?'detail_active':'detail_hidden'}>
                <Card>
                    <Image src={info.image}/>
                    <Card.Content>
                        <Card.Header>
                            {info.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {info.pubdate}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {info.summary}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
export default Detail
