import React from "react";
import PostList from '../home/postList'
import { Link } from "react-router-dom";
import Recomendation from "./recomendation";


function Home() {
 
  return (
    <div className="">
      
      <div className="bg-yellow-100" style={{borderBottom:'1px solid black'}}>
        <div className="flex justify-between ">
          <div className="ml-60 flex flex-col items-start justify-center h-200">
            <h1 style={{fontSize:'80px'}}>Read,Write & Grow</h1>
            <p className="m-4 text-3xl">Write whatever in your mind, Read whatever you like.</p>
            <button className="m-4 text-4xl rounded-3xl p-6 bg-black text-white hover:bg-blue-900" ><Link to='/write'>Add Article</Link></button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
      <PostList/>
      <Recomendation/>
      </div>

    </div>
  );
}

export default Home;
