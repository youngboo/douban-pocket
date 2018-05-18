import React, { Component } from 'react'
import './style.css'
import {Segment,Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class List extends Component {
    constructor(props) {
        super(props)
        this.items = []
    }
    render() {
        let itemRender
        if (this.props.items&&this.props.items.length>0) {

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
                <Item.Group>
                    {itemRender}
                </Item.Group>
            </Segment>

        )
    }
}
export default List
