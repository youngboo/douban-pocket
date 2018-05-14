import React, { Component } from 'react'

class Item extends Component {
    constructor(props) {
        super(props)
        
    }
  
    handleClickItem(id){

    }
    render() {
        var item = this.props.item
        return (
            <div key={item.id} onClick={this.handleClickItem.bind(this)}>
                    {item.id}:
                    {item.title}:
                    <img src={item.images.small} />
            </div>
        )
    }
}
export default Item