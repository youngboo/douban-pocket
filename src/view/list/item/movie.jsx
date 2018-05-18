import React, { Component } from 'react'
import './style.css'
import {Item} from 'semantic-ui-react'
class Movie extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        var item = this.props.item
        return (
                <Item key={this.props.key}>
                <Item.Image size='tiny' src={item.images.small} />
                <Item.Content>
                    <Item.Header >{item.title}</Item.Header>
                    <Item.Meta>{item.id}</Item.Meta>
                    <Item.Extra>{item.year}|{item.genres[0]}</Item.Extra>
                </Item.Content>
                </Item>
        )
    }
}
export default Movie
