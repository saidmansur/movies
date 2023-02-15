import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
    const [page, setPage] = useState();
    const [items, setItems] = useState();
    const [spage, setSpage] = useState();
    const movies = async () => {
        const list = await axios({
            method: "get",
            url: "https://api.themoviedb.org/3/movie/popular?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU&page=1",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        if (list != null) {
            if (list.status == 200) {
                setItems(list.data);
                setPage(list.data.page)
                console.log(list.data.results);
            } else {

                console.log("Error!");
            }
            console.log("items", list);
        }
    }
    const serials = async () => {
        const list = await axios({
            method: "get",
            url: "https://api.themoviedb.org/3/tv/popular?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU&page=1",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        }
        );
        if (list != null) {
            if (list.status == 200) {
                setSpage(list.data.page)
            } else {
    
                console.log("Error!");
            }
            console.log("items", list);
        }
    }
    useEffect(()=>{
        movies();
        serials();
    },[])
    return (
        <div class="row fixed-top bg-gray ml-2">
            <div class="col-12">
                <div class="row d-flex justify-content-center">
                    <div class="col-6 ">
                        <Link class="btn btn-light  form-control" to={"/films/"+page}>
                            <b>Фильмы</b>
                        </Link>
                    </div>
                    <div class="col-6">
                        <Link class="btn btn-light  form-control" to={"/serials/"+parseInt(spage)}>
                        <b>Сериалы</b>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Navbar;