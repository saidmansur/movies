import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./search";
import Navbar from "./navbar";
const Films = () => {
    const param = useParams();
    const Page = param.page;
    const history = useNavigate();
    document.body.style.background = 'linear-gradient(to bottom right, #ffffff 0%, #000000 100%)';
    const [genres, setGenres] = useState();
    const [name, setName] = useState();
    const [items, setItems] = useState();
    const [poster_path, setposterPath] = useState(null);
    const [title, setTitle] = useState();
    const [original_title, setOriginaltitle] = useState();
    const [overview, setOverview] = useState();
    const [release_date, setReleasedate] = useState();
    const [page, setPage] = useState(Page);
    const movies = async () => {
        const param = {
            'page': page
        }
        const list = await axios({
            method: "get",
            params: param,
            url: "https://api.themoviedb.org/3/movie/popular?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU&page=" + page + "",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        console.log('page', param)
        if (list != null) {
            if (list.status == 200) {
                setItems(list.data.results);
                setposterPath(list.data.results.poster_path);
                setOriginaltitle(list.data.results.original_title);
                setTitle(list.data.results.title);
                setOverview(list.data.results.overview);
                setReleasedate(list.data.results.release_date);
                setPage(list.data.page);
                console.log(list.data.results);
            } else {

                console.log("Error!");
            }
            console.log("items", list);
        }
    }
    const genre = async () => {
        const gname = await axios({
            method: "get",
            url: "https://api.themoviedb.org/3/genre/movie/list?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        if (gname != null) {
            if (gname.status == 200) {
                setGenres(gname.data.genres);
                setName(gname.data.genres.name);
            } else {

                console.log("Error!");
            }
            console.log("genres", gname);
        }
    }
    useEffect(() => {
        genre();
        movies();
    }, [])
    function nextpage() {
        setPage(page + 1);
        console.log(page)
    }
    function previouspage() {
        if(page==1){
            return false;
        }else{
        setPage(page - 1);
        console.log(page)
        }
    }

    return (<>
        <div className="row">
            <div className="col-12">
                <Navbar />
            </div>
            <div className="col-12 mt-5">
                <Header />
            </div>
            <div className="col-2 mt-5">
                {genres != null ?
                    <>
                        {genres.map((i) =>
                            <div className="col-1">
                                <Link to={'sgenre/' + i.id}>
                                    {i.name}
                                </Link>
                            </div>
                        )}
                    </> : <></>
                }
            </div>
            <div className="col-10 mt-5 text-light">
                <div className="row">
                    {items != null ?
                        <>
                            {items.map((item) =>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-3">
                                            <Link to={"/show/" + item.id}>
                                                <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + item.poster_path}
                                                    width="300px"
                                                    height="300px"
                                                />
                                                <p><b>{item.title}</b></p>
                                                <p>{item.original_title}</p>
                                            </Link>
                                        </div>
                                        <div className="col-9">
                                            <b>Описание:</b>
                                            <p>{item.overview}</p>
                                            <b>Дата выхода:</b>
                                            <p>{item.release_date}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </> : <></>
                    }
                </div>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-6 d-flex justify-content-end">
                        <button onClick={previouspage}>
                            <a href={'/films/' + page}>
                                Предыдущая страница
                            </a></button>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                        <button onClick={nextpage}>
                            <a href={'/films/' + page}>
                                Следующая страница
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Films;