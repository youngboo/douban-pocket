import React, { Component } from 'react'
import Item from './item';

class List extends Component {
    constructor(props) {
        super(props)
        
    }
  
    render() {
        if (this.props.items) {
            this.itemList = this.props.items.map((item, index) => {
                return(<Item item={item}/>)
            })
        }
        console.log(this.itemList)
        return (
            <div className='list'>
                {this.itemList}
            </div>
        )
    }
}
export default List