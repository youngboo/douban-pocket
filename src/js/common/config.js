import Movie from '../../view/list/item/movie'
import React from 'react'
import { Card, Image, Item, Segment } from 'semantic-ui-react'
const CONFIG = {
    default:0,
    book_detail:'https://api.douban.com/v2/book/',
    book_search:'https://api.douban.com/v2/book/search?q=',
    movie_search:'https://api.douban.com/v2/movie/search?q=',
    music_search:'https://api.douban.com/v2/music/search?q=',
}
const TYPE_LIST =[
    {
        index:0,
        icon:'book',
        url:CONFIG.book_search,
        name:'书',
        list_tmpl:(item)=>{
            return(
                    <Item  key={item.id}>
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
    {index:1,icon:'film',url:CONFIG.movie_search,name:'电影',

        list_name:'subjects',
        list_tmpl:''
    },
    {index:2,icon:'music',url:CONFIG.music_search,name:'音乐',
        list_name:'musics'},
]

export {CONFIG, TYPE_LIST}
