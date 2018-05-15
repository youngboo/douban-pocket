import React, { Component } from 'react'
import './style.css'
class Item extends Component {
    constructor(props) {
        super(props)

    }

    handleClickItem(){
        this.props.onChange(this.props.item.id)
    }
    render() {
        var item = this.props.item
        return (
            <div className='list-item' key={item.id} onClick={this.handleClickItem.bind(this)}>
                    {item.id}:
                    {item.title}:
                    <img src={item.image} />
            </div>
        )
    }
}
export default Item
