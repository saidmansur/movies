import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
const Sgenre = () => {
    const [genres, setGenres] = useState();
    const [name, setName] = useState();
    const [items, setItems] = useState();
    const [poster_path, setposterPath] = useState(null);
    const [title, setTitle] = useState();
    const [original_title, setOriginaltitle] = useState();
    const [overview, setOverview] = useState();
    const [release_date, setReleasedate] = useState();
    const param = useParams();
    const id = param.id;
//   document.body.style.backgroundColor='white';
  const sgenre = async () => {

    const gname = await axios({
        method: "get",
        url: " https://api.themoviedb.org/3/list/" + id + "?api_key=3cc05ada7e70628b8d1bf36e4d1f6fd7&language=ru-RU",
        config: {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
    }
    );
    if (gname != null) {
        if (gname.status == 200) {
            setItems(gname.data.items);
            setposterPath(gname.data.items.poster_path);
            setOriginaltitle(gname.data.items.original_title);
            setTitle(gname.data.items.title);
            setOverview(gname.data.items.overview);
            setReleasedate(gname.data.items.release_date);
                console.log(gname.data.items);
            console.log('sgenre', gname);
        } else {
            console.log("Error!");
        }
        console.log("genres", gname);
    }
}
useEffect(()=>{
    sgenre();
},[])
  return (<>
    <div className="row">
    <div className="col-10">
        <p>{title}</p>
                <div className="row">
                    {items != null ?
                        <>
                            {items.map((item) =>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-3">
                                            <Link to={"/show/"+item.id}>
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
    </div>
    </>
  )
}
export default Sgenre;