import React, { Component } from 'react'

import { Icon, Menu, Segment } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

class NoMatch extends Component {

    render() {

        return (
            <Segment basic textAlign='center' >
                <Segment basic fluid color='blue' textAlign='left'>
                <Menu compact icon='labeled'>
                    <Menu.Item>
                        <Link to='/'>
                            <Icon name='chevron left'/>
                            回到主页
                        </Link>

                    </Menu.Item>

                </Menu>
                </Segment>
                <h1>页面未找到</h1>


            </Segment>
        )
    }
}
export default NoMatch
