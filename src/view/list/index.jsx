import React, { Component } from 'react'
import './style.css'
import { Item, Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class List extends Component {
    constructor(props) {
        super(props)
        this.items = []
        this.service = props.service
    }
    handleItemClick(id){
       console.log(id)
        let state={id:id,type:this.props.type,index:this.props.index}

    }
    render() {
        let itemRender
        if (this.props.items&&this.props.items.length>0) {
            itemRender =  this.props.items.map((item)=>{
                return this.props.tmpl.call(null,item,this)



            })
           }
        return (

            <div className="list">
                <Button onClick={()=>{
                    this.props.onChange(this.props.url)
                }} content='刷新'/>
                <Item.Group divided unstackable link={true}>
                     {itemRender}
                </Item.Group>
                    <Button onClick={()=>{
                        this.props.onChange(this.props.url,'pull')
                    }} content='加载更多'/>
            </div>

        )
    }
}
export default List
