import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Search = () => {
  // document.body.style.background = 'linear-gradient(to bottom right, #ffffff 0%, #000000 100%)';
  const history = useNavigate();
  const [id, setId] = useState("");
  const [responseObj, setResponseObj] = useState({});
  const [poster_path, setposterPath] = useState(null);
  const [title, setTitle] = useState('');
  const [name, setName] = useState(title);
  const [original_title, setOriginaltitle] = useState();
  let [movie, setMoviesearch] = useState();
  let [tv, setTvsearch] = useState();
  let search = async () => {
    let user = await axios({
      url: "https://api.themoviedb.org/3/search/multi?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU&query=" + title + "&page=1&include_adult=false",
    }
    );
    console.log('title', title);
    if (user != null) {
      setResponseObj(user.data.results)
      let movie = user.data.results.filter(i => i.media_type == 'movie')
      setMoviesearch(movie)
      console.log("search", movie);
    } console.log('movies', user);
    let tv = user.data.results.filter(i => i.media_type == 'tv')
    setTvsearch(tv)
    console.log('name', name);
    console.log('filter', tv);
  }
  return (<>
    <div className="row">
      <div className="col-12">
        <input class="input ml-5" required type="text" placeholder="Поиск" onChange={(e) => { setTitle(e.target.value) }} onInput={search} />
      </div>
      <div className='col-12 mt-5'>
        {movie != null ?
          <>
            {movie.map((i) =>
              <div className="col-12 mt-2">
                <Link to={'/show/' + i.id}>
                  <img class="rounded-circle border border-danger float-left" src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + i.poster_path} width="60" height="60" />
                  <b class="float-left mt-3 ml-2 font-weight-bolder">{i.title}</b>
                </Link>
              </div>
            )}
          </> : <>
          </>
        }
      </div>
      <div className="col-12">
        {tv != null ?
          <>
            {tv.map((item) =>
              <div class="col-12 mt-2">
                <Link to={'/sshow/' + item.id}>
                  <img class="rounded-circle border border-danger float-left" src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + item.poster_path} width="60" height="60" />
                  <b class="float-left mt-3 ml-2 font-weight-bolder">{item.name}</b>
                </Link>
              </div>
            )}
          </> : <></>
        }
      </div>
    </div>
  </>
  )
}
export default Search;