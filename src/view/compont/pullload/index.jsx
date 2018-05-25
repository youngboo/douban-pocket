import React from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe'


class ExampleList extends React.Component{
    getDefaultProps() {
        return ({
            options: {
                mouseWheel: true,
                scrollbars: true
            }
        })
    }
    onScrollStart() {
        console.log("iScroll starts scrolling")
    }
    onScroll(){
        console.log('滚动中')
    }
    onScrollEnd(){
        console.log('滚动结束')
    }
    onRefresh (iScrollInstance) {
        var yScroll = iScrollInstance.y;
        console.log("vertical position:" + yScroll)
    }
    componentDidMount () {
        this.dom.addEventListener("touchmove",function (e) {
            e.stopPropagation();
        },false);
    }

    render() {
        var i = 0, len = 1000, listOfLi = [];

        for(i; i < len; i++) {
            listOfLi.push(<li key={i}>Row {i+1}</li>)
        }

        return (
            <div style={{height:window.innerHeight-250}}>
                <h1>Example of scrollable list</h1>
                <div

                    iScroll={iScroll}
                              options={ {
                                  freeScroll: true,
                                  scrollbars: true,
                                  preventDefault:true,
                                  momentum:true,
                                  bounce:true,
                                  disableTouch:false,
                              }}
                    onScrollStart={this.onScrollStart}
                    onScroll={this.onScroll}
                    onScrollEnd={this.onScrollEnd}
                    onRefresh = {this.onRefresh}
                >
                    <ul ref= {(ref) => {this.dom = ref}}>

                        {listOfLi}
                    </ul>
                    <label>加载中</label>
                    <button onClick={(ev)=>{
                        ev.preventDefault()
                        this.refs.iScroll.withIScroll(function(iScroll) {
                            console.log(iScroll.x)
                            iScroll.scrollTo(0,0)
                        })
                    }}>回到起点</button>
                </div>

            </div>
        )
    }
}
export default ExampleList
