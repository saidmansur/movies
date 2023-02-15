import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./search";
import Navbar from "./navbar";
const Serials = () => {
  document.body.style.background =
    "linear-gradient(to bottom right, #000000 25%, #ff0000 82%)";
  const param = useParams();
  const Spage = param.page;
  const [genres, setGenres] = useState();
  const [name, setName] = useState();
  const [items, setItems] = useState();
  const [poster_path, setposterPath] = useState(null);
  const [title, setTitle] = useState();
  const [original_name, setOriginaname] = useState();
  const [overview, setOverview] = useState();
  const [first_air_date, setFirst_air_date] = useState();
  const [page, setPage] = useState(parseInt(Spage));
  const serials = async () => {
    const param = {
      page: parseInt(page),
    };
    const list = await axios({
      method: "get",
      params: param,
      url:
        "https://api.themoviedb.org/3/tv/popular?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU&page=" +
        page +
        "",
      config: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    });
    console.log("spages", param);
    if (list != null) {
      if (list.status == 200) {
        setItems(list.data.results);
        setposterPath(list.data.results.poster_path);
        setOriginaname(list.data.results.original_name);
        setName(list.data.results.name);
        setOverview(list.data.results.overview);
        setFirst_air_date(list.data.results.first_air_date);
        setPage(list.data.page);
      } else {
        console.log("Error!");
      }
      console.log("items", list);
    }
  };
  const genre = async () => {
    const gname = await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/genre/movie/list?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU",
      config: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    });
    if (gname != null) {
      if (gname.status == 200) {
        setGenres(gname.data.genres);
        setName(gname.data.genres.name);
      } else {
        console.log("Error!");
      }
      console.log("genres", gname);
    }
  };
  useEffect(() => {
    serials();
    genre();
  }, []);
  function nextpage() {
    setPage(page + 1);
    console.log(page);
  }
  function previouspage() {
    if (page == 1) {
      return false;
    } else {
      setPage(page - 1);
      console.log(page);
    }
  }
  //   const checkPages = () => {
  //     if (page != 0) {
  //       const check = page.filter(i => i.page == page && i.page == page);
  //       if (check.length = 2) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } else {
  //       return false;
  //     }
  //   }
  return (
    <>
      <div className="row">
        <div className="col-12">
          <Navbar />
        </div>
        <div className="col-12 mt-5">
          <Header />
        </div>
        <div className="col-2 mt-5">
          {genres != null ? (
            <>
              {genres.map((i) => (
                <div className="col-1">
                  <Link to={"sgenre/" + i.id}>{i.name}</Link>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="col-10 mt-5 text-light">
          <div className="row">
            {items != null ? (
              <>
                {items.map((item) => (
                  <div className="col-12">
                    <div className="row">
                      <div className="col-3">
                        <Link to={"/sshow/" + item.id}>
                          <img
                            src={
                              "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                              item.poster_path
                            }
                            width="300px"
                            height="300px"
                          />
                          <p>
                            <b>{item.name}</b>
                          </p>
                          <p>{item.original_name}</p>
                        </Link>
                      </div>
                      <div className="col-9">
                        <b>Описание:</b>
                        <p>{item.overview}</p>
                        <b>Дата выхода:</b>
                        <p>{item.first_air_date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-6 d-flex justify-content-end">
              <button
                onClick={() => {
                  previouspage(page);
                }}
              >
                <a href={"/serials/" + page}>Предыдущая страница</a>
              </button>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <button
                onClick={() => {
                  nextpage(page);
                }}
              >
                <a href={"/serials/" + page}>Следующая страница</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Serials;
