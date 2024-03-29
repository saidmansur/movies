import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "./search";
import Navbar from "./navbar";
const Sshow = () => {
  const param = useParams();
  const id = param.id;
  const [overview, setOverview] = useState("");
  const [items, setItems] = useState();
  const [poster_path, setposterPath] = useState();
  const [name, setName] = useState();
  const [original_name, setOriginalname] = useState();
  const [first_air_date, setFirst_air_date] = useState();
  const [genres, setGenres] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [backdrop_path, setBackdroppath] = useState();
  const [key, setKey] = useState(null);
  const [items2, setItems2] = useState(null);
  const [recomindation, setRecomindation] = useState();
  const [number_of_episodes, setNumberepisods] = useState();
  const [number_of_seasons, setNumberseasons] = useState();
  document.body.style.background =
    "linear-gradient(to bottom right, #000000 25%, #ff0000 82%)";
  const visit = async () => {
    const param = {
      id: id,
    };
    const user = await axios({
      method: "get",
      params: param,
      url:
        "https://api.themoviedb.org/3/tv/" +
        id +
        "?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU",
      config: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    });
    console.log("id", param);
    if (user != null) {
      if (user.status == 200) {
        setItems(user.data.results);
        setBackdroppath(user.data.backdrop_path);
        setOriginalname(user.data.original_name);
        setName(user.data.name);
        setOverview(user.data.overview);
        setFirst_air_date(user.data.first_air_date);
        setGenres(user.data.genres);
        setRevenue(user.data.revenue);
        setNumberepisods(user.data.number_of_episodes);
        setNumberseasons(user.data.number_of_seasons);
        console.log(user.data.results);
      } else {
        console.log("Error!");
      }
      console.log("items", user);
    }
  };
  const watch = async () => {
    const param = {
      id: id,
    };
    const watchs = await axios({
      method: "get",
      params: param,
      url:
        "https://api.themoviedb.org/3/tv/" +
        id +
        "/videos?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=en-US",
      config: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    });
    console.log("id", param);
    if (watchs != null) {
      if (watchs.status == 200) {
        setItems2(watchs.data.results);
        setKey(watchs.data.results.key);
      } else {
        const param = {
          id: id,
        };
        const user = await axios({
          method: "get",
          params: param,
          url:
            "https://api.themoviedb.org/3/tv/" +
            id +
            "?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU",
          config: {
            headers: {
              "Content-type": "multipart/form-data",
            },
          },
        });
        console.log("id", param);
        if (user != null) {
          if (user.status == 200) {
            setItems(user.data.results);
            setBackdroppath(user.data.backdrop_path);
            setOriginalname(user.data.original_name);
            setName(user.data.name);
            setOverview(user.data.overview);
            setFirst_air_date(user.data.first_air_date);
            setGenres(user.data.genres);
            setRevenue(user.data.revenue);
            console.log(user.data.results);
          } else {
            console.log("Error!");
          }
          console.log("items", user);
        }
      }
      console.log("watch", watchs);
    }
  };
  const similar = async () => {
    const param = {
      id: id,
    };
    const similars = await axios({
      method: "get",
      params: param,
      url:
        "https://api.themoviedb.org/3/tv/" +
        id +
        "/similar?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=en-US&page=1",
      config: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    });
    console.log("id", param);
    if (similars != null) {
      if (similars.status == 200) {
        setItems(similars.data.results);
        setposterPath(similars.data.results.poster_path);
      } else {
        console.log("Error!");
      }
      console.log("similar", similars);
    }
  };
  const recomindations = async () => {
    const param = {
      id: id,
    };
    const recomendate = await axios({
      method: "get",
      params: param,
      url:
        "https://api.themoviedb.org/3/tv/" +
        id +
        "/recommendations?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU&page=1",
      config: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    });
    if (recomendate != null) {
      if (recomendate.status == 200) {
        setRecomindation(recomendate.data.results);
        setposterPath(recomendate.data.results.poster_path);
      } else {
        console.log("Error!");
      }
      console.log("recomen", recomendate);
    }
  };
  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {
    watch();
    visit();
    similar();
    recomindations();
  }, []);
  var moment = require("moment");
  require("moment/min/locales.min");
  moment.locale("ru");
  moment().zone("+06:00");
  return (
    <>
      <div className="row">
        <div className="col-12">
          <Navbar />
        </div>
        <div className="col-12 mt-5">
          <Header />
        </div>
        <div className="col-12 mt-5">
          <div className="row">
            <div className="col-3 text-light">
              <img
                src={
                  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                  backdrop_path
                }
                width="100%"
                height="auto"
              />
              <p>
                <b>{name}</b>
              </p>
            </div>
            <div className="col-8 ml-5 text-light overview">
              <h4 className="ml-5">Описание:</h4>
               <i>{overview}</i>
              <h4>
                Дата выхода:
                {moment(first_air_date).format("Do MMM YYYY")}
              </h4>
              <h4>
                Жанры: 
                {genres != null ? 
                  <>
                    {genres.map((i) => (
                      <>
                        {i.name}
                         <span> </span>
                      </>
                    ))}
                  </>
                 : 
                  <></>
                }
              </h4>
              <h4>
                Колличество эпизодов: {number_of_episodes}
              </h4>
              <h4>Колличество сезонов: {number_of_seasons} </h4>
                
            </div>
            <div className="col-12 ">
              {items2 != null ? 
                <>
                  {items2.map((i) => (
                    <>
                      <div className="row mt-3">
                        <div className="col-12 d-flex justify-content-center">
                          <iframe
                            width="650px"
                            height="600px"
                            src={"https://www.youtube.com/embed/" + i.key}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </div>
                    </>
                  ))}
                </>
               : 
                <>
                  <div class="col-12 d-flex justify-content-center">
                  <img
                              src={
                                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                                poster_path
                              }
                              className="fullsize-profile-picture"
                              width="100%"
                              height="auto"
                            />
                  </div>
                </>
              }
            </div>
            <div className="col-12 text-light">
              <h2>Похожие сериалы</h2>
              <div className="row">
                {items != null ? 
                  <>
                    {items.map((item) => (
                      <div className="col-3 mt-3">
                        <button onClick={refreshPage}>
                          <Link to={"/sshow/" + item.id}>
                            <img
                              src={
                                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                                item.poster_path
                              }
                              className="fullsize-profile-picture"
                              width="100%"
                              height="auto"
                            />
                          </Link>
                        </button>
                      </div>
                    ))}
                  </>
                : 
                  <>
                    <div class="spinner"></div>
                  </>
                }
              </div>
            </div>
            <div className="col-12 mt-5 text-light text-opacity-25">
              <h2>Рекомеидаций</h2>
              <div className="row">
                {recomindation != null ? 
                  <>
                    {recomindation.map((i) => (
                      <div className="col-3 mt-3">
                        <button onClick={refreshPage}>
                          <Link to={"/sshow/" + i.id}>
                            <img
                              src={
                                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                                i.poster_path
                              }
                              className="fullsize-profile-picture"
                              width="100%"
                              height="auto"
                            />
                          </Link>
                        </button>
                      </div>
                    ))}
                  </>
                : 
                  <>
                    <div class="spinner"></div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sshow;
