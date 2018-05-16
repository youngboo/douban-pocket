const CONFIG = {
    default:0,
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
        list_temp:function(){
            return ''
        },
        detail_temp:'',
        list_name:'books'
    },
    {index:1,icon:'film',url:CONFIG.movie_search,name:'电影',
        list_name:'subjects'},
    {index:2,icon:'music',url:CONFIG.music_search,name:'音乐',
        list_name:'musics'},
]

export {CONFIG, TYPE_LIST}
