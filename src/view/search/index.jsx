import React, { Component } from 'react'
class Search extends Component{
    constructor(){
        super()
        this.holder = '搜索书籍，音乐，电影'
        this.state = {
            content:''
        }
    }
    
    handleClick(){
        this.props.onChange(this.input.value)
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