import React, { Component } from 'react'
import './style.css'
import { Segment, Item, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class List extends Component {
    constructor(props) {
        super(props)
        this.items = []
        this.service = props.service
    }
    render() {
        let itemRender
        if (this.props.items&&this.props.items.length>0) {
            console.log(this.props.items.length)
            itemRender =  this.props.items.map((item)=>{

                return (
                    <Link to={{pathname:'/detail/',state:{id:item.id,type:this.props.type,index:this.props.index}}} key={item.id}>
                        {this.props.tmpl.call(this,item)}
                    </Link>
                )
            })
           }
        return (

            <Segment className='list'>
                <Button onClick={()=>{
                    this.props.onChange(this.props.url)
                }} content='刷新'/>
                <Item.Group>
                    {itemRender}
                </Item.Group>
                    <Button onClick={()=>{
                        this.props.onChange(this.props.url,'pull')
                    }} content='加载更多'/>
            </Segment>

        )
    }
}
export default List
