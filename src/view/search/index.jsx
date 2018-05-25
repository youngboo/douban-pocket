import React, { Component } from 'react'
import { TYPE_LIST } from '../../js/common/config'
import './style.css'
class Search extends Component{
    constructor(){
        super()
        this.placeholder = TYPE_LIST[0].placeholder
        this.state = {
            content:'small'
        }
    }
    componentDidMount(){
        this.input.focus()
        this.handleInputChange()
    }
    handleInputChange(){
        this.setState({
            content:this.input.value
        })
        this.props.onChange(this.input.value)
    }
    render(){
        return(
                <div className='search'>
                    <div className='input_div'>
                        {/*<img className='search_icon' src='static/icon/search.png'/>*/}
                        <input placeholder={this.placeholder} defaultValue='babymetal' ref={input=>this.input=input}/>
                    </div>
                    <div className='search_button' onClick={this.handleInputChange.bind(this)} type='submit'>
                        <span>搜索</span>
                    </div>
                </div>
        )
    }
}
export default Search
