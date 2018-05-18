import React, { Component } from 'react'
import './style.css'
import { Button, Card, Image, Segment } from 'semantic-ui-react'
class Detail extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.match.params.name)
    }




    render() {
        let info = this.props.active

        let active = this.props.active?true:false
        return (
            <div className={active?'detail_active':'detail_hidden'}>
                <Segment textAlign='center'>
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
                    <Button onClick={()=>this.props.onChange(false)}>关闭</Button>
                </Segment>
            </div>
        )
    }
}
export default Detail
