import CONFIG from './config'
const SEARCH_TYPE1 ={
    BOOK:1,
    MOVIE:2,
    MUSIC:3,
    properties:{
        1:{icon:'',url:CONFIG.book_search,name:'书'},
        2:{icon:'',url:CONFIG.movie_search,name:'电影'},
        3:{icon:'',url:CONFIG.music_search,name:'音乐'},
    }
}
const SEARCH_TYPE =[
    {index:0,icon:'',url:CONFIG.book_search,name:'书'},
    {index:1,icon:'',url:CONFIG.movie_search,name:'电影'},
    {index:2,icon:'',url:CONFIG.music_search,name:'音乐'},
]
export default SEARCH_TYPE