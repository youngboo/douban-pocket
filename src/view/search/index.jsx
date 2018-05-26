import React, { Component } from 'react'
import { TYPE_LIST } from '../../js/common/config'
import './style.css'
class Search extends Component{
    constructor(){
        super()
        this.state = {
            content:''
        }
    }
    componentDidMount(){
        this.input.focus()
        //this.handleInputChange()
    }
    handleInputChange(){
        this.setState({
            content:this.input.value==undefined?'':this.input.value
        })
        this.props.onChange(this.input.value)
    }
    render(){
        let placeholder = TYPE_LIST[this.props.index].placeholder
        return(
                <div className='search'>
                    <input placeholder={placeholder} defaultValue='' ref={input=>this.input=input}/>
                    <div className='search_button' onClick={this.handleInputChange.bind(this)} type='submit'>
                        <span>搜索</span>
                    </div>
                </div>
        )
    }
}
export default Search
