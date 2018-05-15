import React, { Component } from 'react'
import './style.css'
class Detail extends Component {
    constructor(props) {
        super(props)
    }
    getDetail(info){
        console.log(info)
        if(info){
            return( <div>
                <div>
                    <image src={info.image}></image>
                </div>
            </div>)
        }

    }

    render() {

        return (
            <div className={this.props.active?'detail_active':'detail_hidden'}>
                {this.getDetail(this.props.info)}
            </div>
        )
    }
}
export default Detail
