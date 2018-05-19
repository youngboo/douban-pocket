import React from 'react'
import { Card, Grid, Image, Item, Segment } from 'semantic-ui-react'
import Util from './util'
const CONFIG = {
    default:0,
    book:'https://api.douban.com/v2/book/',
    movie:'https://api.douban.com/v2/movie/subject/',
    music:'https://api.douban.com/v2/music/',
    book_search:'https://api.douban.com/v2/book/search?q=',
    movie_search:'https://api.douban.com/v2/movie/search?q=',
    music_search:'https://api.douban.com/v2/music/search?q=',
}
const TYPE_LIST =[
    {
        index:0,
        icon:'book',
        type_name:'book',
        url:CONFIG.book_search,
        name:'书',
        list_tmpl:(item)=>{
            return(
                    <Item key={item.id}>
                        <Item.Image size='tiny' src={item.image} />
                        <Item.Content>
                            <Item.Header >{item.title}</Item.Header>
                            <Item.Meta>{item.id}</Item.Meta>
                            <Item.Extra>Additional Details</Item.Extra>
                        </Item.Content>
                    </Item>
            )
        },
        detail_tmpl:(info)=>(
            <Segment basic textAlign='center'>
                <Card centered fluid>
                    <Image src={info.image}/>
                    <Card.Content>
                        <Card.Header>
                            {info.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {info.pubdate}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {info.summary}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Segment>
        ),
        list_name:'books'
    },
    {index:1,type_name:'movie',icon:'film',url:CONFIG.movie_search,name:'电影',

        list_name:'subjects',
        list_tmpl:(item)=>{
            return(
                <Item key={item.id}>
                    <Item.Image size='tiny' src={item.images.small} />
                    <Item.Content>
                        <Item.Header >{item.title}</Item.Header>
                        <Item.Meta>{item.id}</Item.Meta>
                        <Item.Extra>{item.year}|{item.genres[0]}</Item.Extra>
                    </Item.Content>
                </Item>
            )
        },
        detail_tmpl:(info)=>(
            <Segment basic textAlign='center'>
                <Card centered fluid>
                    <Image src={info.images.small}/>
                    <Card.Content>
                        <Card.Header>
                            {info.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {info.year}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            <Grid widths={info.casts.length}>

                                {
                                    info.casts.map((item,index)=>{
                                        return(<Grid.Column>
                                                <Image circular src={item.avatars.small}/>
                                            </Grid.Column>
                                            )
                                    })
                                }

                            </Grid>

                            {info.summary}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Segment>)
    },
    {index:2,type_name:'music',icon:'music',url:CONFIG.music_search,name:'音乐',
        list_name:'musics',
        list_tmpl:(item)=>{
            return(
                <Item>
                    <Item.Image size='tiny' src={item.image} />
                    <Item.Content>
                        <Item.Header >{item.title}</Item.Header>
                        <Item.Meta>{item.title}</Item.Meta>
                        <Item.Extra>{item.attrs[0]}</Item.Extra>
                    </Item.Content>
                </Item>
            )
        },
        detail_tmpl:(info)=>(
            <Segment basic textAlign='center'>
                <Card centered fluid>
                    <Image src={info.image}/>
                    <Card.Content>
                        <Card.Header>
                            {info.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {info.pubdate}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {info.summary}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Segment>)
    },
]

export {CONFIG, TYPE_LIST}
