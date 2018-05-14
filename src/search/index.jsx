import React, { Component } from 'react'
import Util from '../util/util'
import CONFIG from '../util/config'
class Search extends Component{
    constructor(){
        super()
        this.holder = '搜索书籍，音乐，电影'
        this.state = {
            content:''
        }
    }
    
    handleClick(){
        var value = this.input.value
        this.props.onChange(CONFIG.book_search+value)
    }
    render(){
        return(
            <div className='search'>
                <input placeholder={this.holder}
                ref={input=>this.input=input}
                />
                <button onClick={this.handleClick.bind(this)}>点击搜索</button>
            </div>
        )
    }
}
export default Search