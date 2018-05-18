import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
class ItemRender extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        if (this.props.items) {
            this.items = this.props.items.map((item, index) => {
                return(this.props.render(item,index))
            })
        }
        return (
            <Item.Group>
                {this.items}
            </Item.Group>
        )
    }
}
export default ItemRender
