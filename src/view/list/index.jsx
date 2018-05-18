import React, { Component } from 'react'
import './style.css'
import ItemRender from './item-render/index'
import Book from './item/book'
import Movie from './item/movie'
import Music from './item/index'
import { Ref, Segment,Item } from 'semantic-ui-react'
import AsynListService from '../../js/service/AsynListService'
import { TYPE_LIST } from '../../js/common/config'
import { Link } from 'react-router-dom'
const service = AsynListService.getInstance()
class List extends Component {
    constructor(props) {
        super(props)
        this.items = [];
    }
  handleItemChange(value){
        this.props.onChange(value)

  }

    render() {
        let itemRender
        if (this.props.items&&this.props.items.length>0) {
            // switch(this.props.tmpl){
            //     case 'book':
            //         itemRender =<ItemRender items={this.props.items} render={(item,key)=>(<Book item={item} key={key}/>)}/>
            //     break
            //     case 'film':
            //         itemRender =<ItemRender items={this.props.items} render={(item,key)=>(<Movie item={item} key={key}/>)}/>
            //         break
            //     case 'music':
            //         itemRender =<ItemRender items={this.props.items} render={(item,key)=>(<Music item={item} key={key}/>)}/>
            //         break
            // }
            //this.props.items.map()
            itemRender =  this.props.items.map((item)=>{

                return (
                    <Link to={'/detail/'+item.id}>
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
