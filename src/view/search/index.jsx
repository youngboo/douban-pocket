import React, { Component } from 'react'
import {Container,Button,Input} from 'semantic-ui-react'
class Search extends Component{
    constructor(){
        super()
        this.holder = '搜索书籍，音乐，电影'
        this.state = {
            content:''
        }
    }

    handleInputChange(){
        this.setState({
            content:this.input.value
        })
        this.props.onChange(this.input.value)
    }
    render(){
        return(
            <div  className='search'>
                <Input action focus={true} placeholder={this.holder}>
                    <input ref={input=>this.input=input}/>
                    <Button onClick={this.handleInputChange.bind(this)} type='submit'>搜索</Button>
                </Input>
            </div>
        )
    }
}
export default Search
