import React from 'react'
const CONFIG = {
  auto_load: true,
  default: 1,
  book: 'https://api.douban.com/v2/book/',
  movie: 'https://api.douban.com/v2/movie/subject/',
  music: 'https://api.douban.com/v2/music/',
  book_search: 'https://api.douban.com/v2/book/search?q=',
  movie_search: 'https://api.douban.com/v2/movie/search?q=',
  music_search: 'https://api.douban.com/v2/music/search?q='
}
const TYPE_LIST = [
  {
    index: 0,
    icon: 'book',
    type_name: 'book',
    detail_url: CONFIG.book,
    url: CONFIG.book_search,
    name: '书',
    list_name: 'books',
    placeholder: '书名，作者，ISBN',
    list_tmpl: (item, self) => (
      <div className='list_item book' key={item.id} onClick={self.handleItemClick.bind(self, item.id)}>
        <img className='item_left' src={item.image} />
        <div className='item_right'>
          <span>名称：{item.title}</span>
          {item.tags &&
            <span className='item_tag'>
              {item.tags.map((tag, index) => (<label key={index} className='tag_label'>{tag.name}</label>))}
            </span>
          }

          {item.author && item.author[0] &&
            <span>
              作者：{item.author[0]+''}
            </span>
          }
          {item.rating &&
            <span>
              评分：{item.rating.average}
            </span>
          }
          <span>出版日期：{item.pubdate}</span>
        </div>

      </div>
    ),
    detail_tmpl: (item) => (
      <div className='detail'>
        <div style={{ border: 0 }} className='list_item' >
          <img className='item_left' src={item.image} />
          <div className='item_right'>
            <span >名称：{item.title}</span>

            {item.author &&
              (<span>作者：{item.author[0]}</span>)
            }
            {item.rating &&
              <span>
                评分：{item.rating.average}
              </span>
            }
            {item.price &&
              <span>
                价钱：{item.price}
              </span>
            }
            <span>出版日期：{item.pubdate}</span>
            {item.tags &&
              <span className='item_tag'>
                {item.tags.map((tag, index) => (<label key={index} className='tag_label'>{tag.name}</label>))}
              </span>
            }
          </div>

        </div>
        <div>
          <div className='detail_divider' />
          <div className='detail_summary'>
            <h3>序言</h3>
            <p>
              {item.catalog}
            </p>
            <h3>简介</h3>
            <p>
              {item.summary}
            </p>
          </div>
        </div>

      </div>
    )
  },
    {
        index: 1,
        type_name: 'movie',
        icon: 'movie',
        url: CONFIG.movie_search,
        name: '电影',
        detail_url: CONFIG.movie,
        list_name: 'subjects',
        placeholder: '电影，影人，影院，电视剧',
        list_tmpl: (item, self) => (
            <div className='list_item movie' key={item.id} onClick={self.handleItemClick.bind(self, item.id)}>
                <img className='item_left' src={item.images ? item.images.small : 'static/img/movie-default.png'} />
                <div className='item_right '>
                    <span className='item_right_title'>{item.title}—{item.year}</span>
                    {item.genres &&
                    <span className='item_tag'>
                    {item.genres.map((tag, index) => (<label key={index} className='tag_label'>{tag}</label>))}
                    </span>
                    }

                    {item.directors &&
                    <span>
                    {item.directors.map((tag, index) => (<label key={index} className='director_label'>{tag.name}</label>))}
                    </span>
                    }
                    {item.directors && item.directors[0]&&
                    <span>
              {item.directors[0].name}
            </span>
                    }
                    {item.rating &&
                    <span>
              评分：{item.rating.average}
            </span>
                    }
                </div>

            </div>
        ),
        detail_tmpl: (item) => (
            <div className='movie_detail'>
                <div className='main_img'>
                    <img src={item.images ? item.images.small : 'static/img/movie-default.png'} />
                </div>
                <div>
                    <h3>简介</h3>
                    <div className='movie_summary'>
                        <div className='item_right'>
                            <div className='item_genres'>
                                <span className='tag_span'>名称：{item.title}</span>
                                {item.genres && item.genres.map((tag, index) => (<tag_label key={index} className='tag_label'>{tag}</tag_label>))}
                            </div>
                            <span>上映时间：{item.year}</span>

                            {item.directors && item.directors.length > 0 &&
                            <span>
                  导演：{item.directors.map((item, index) => (<label key={index}>{item.name}&nbsp;</label>))}
                </span>
                            }
                            {item.original_title &&
                            <span>
                  {item.title}({item.original_title})
                </span>
                            }

                        </div>
                    </div>
                    <h3>演员</h3>
                    <div className='detail_directors'>
                        {item.casts &&
                        item.casts.map((cat, index) => (
                            cat.avatars && (
                                <div key={index} className={'director_img flex-'+item.casts.length}>
                                    <img src={cat.avatars.small} />
                                    <span>{cat.name}</span>
                                </div>
                            )

                        ))

                        }
                    </div>
                </div>
            </div>
        )
    },
  {
    index: 2,
    type_name: 'music',
    icon: 'music',
    url: CONFIG.music_search,
    detail_url: CONFIG.music,
    name: '音乐',
    list_name: 'musics',
    placeholder: '唱片名，表演者，条码，ISRC',
    list_tmpl: (item, self) => (
      <div className='list_item' key={item.id} onClick={self.handleItemClick.bind(self, item.id)}>
        <img className='item_left' src={item.image} />
        <div className='item_right'>
          <span className='item_right_title'>名称：{item.title}</span>
          {item.tags &&
            <span className='item_tag'>
              {item.tags.map((tag, index) => (<label key={index} className='tag_label'>{tag.name}</label>))}
            </span>
          }
          {item.author && item.author[0] &&
            <span>
              作者：{item.author[0].name}
            </span>
          }
          {item.rating &&
            <span>
              评分：{item.rating.average}
            </span>
          }
        </div>

      </div>
    ),
    detail_tmpl: (item) => (
      <div className='detail music'>
        <div className='list_item' >
          <img className='item_left' src={item.image} />
          <div className='item_right'>

            {item.tags &&
              <div className='item_tag'>
                <span className='tag_span'>名称：{item.title}</span>
                {item.tags.map((tag, index) => (<label key={index} className='tag_label'>{tag.name}</label>))}
              </div>
            }
            {item.author && item.author[0] &&
              <span>作者：{item.author[0]}</span>
            }
            {item.rating &&
              <span>
                评分：{item.rating.average}
              </span>
            }
            {item.attrs && item.attrs.publisher &&
              <span>发行商：{item.attrs.publisher}</span>
            }

          </div>

        </div>
        <div>
          <div className='detail_divider' />
          <div className='detail_summary'>
            <h3>简介</h3>
            <p>
              {item.summary}
            </p>
          </div>
        </div>

      </div>
    )
  }
]

export { CONFIG, TYPE_LIST }
