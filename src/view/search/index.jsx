import React, { Component } from 'react'
import { Container, Button, Input, Segment } from 'semantic-ui-react'
class Search extends Component{
    constructor(){
        super()
        this.holder = '搜索书籍，音乐，电影'
        this.state = {
            content:'small'
        }
    }
    componentDidMount(){
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
                <Input fluid action focus={true} placeholder={this.holder}>
                    <input defaultValue='babymetal' ref={input=>this.input=input}/>
                    <Button onClick={this.handleInputChange.bind(this)} type='submit'>搜索</Button>
                </Input>
        )
    }
}
export default Search
