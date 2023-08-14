
import React from "react";
import { Link } from "react-router-dom";
import image from "./medium.png";

export default function SearchPosts(props){
return (
              <Link to={props.id} className="flex p-10 justify-center items-center w-full  mb-8 bg-yellow-100 shadow-md shadow-gray-300  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95">
                      <div className="p-4 m-4 rounded-md w-full">
                        <div className="p-2 font-bold text-2xl">
                          <h2>{props.author.name}</h2>
                        </div>
                        <div className="w-full text-left pr-10">
                          <h1 className="font-bold text-4xl">{props.title}</h1>
                        </div>
                        <div className="w-full text-justify mt-1 mb-1 pr-10 h-16">
                          <p className="text-gray-600">{props.description}</p>
                        </div>

                        <div className="w-full mt-16">
                          <span className="mr-3 font-light">{props.created_at.substring(0, 10)}</span>
                          <span className="mr-3 font-light">{props.created_at.substring(11, 16)}</span>
                          <span className="mr-3 font-bold text-blue-500">{props.genre}</span>
                        </div>
                      </div>

                      <div>
                        <div className="w-full flex justify-center items-center overflow-hidden">
                          <img
                            className="min-w-2/3 h-64 flex-shrink-0 rounded-lg"
                            src={image}
                            alt="featured "
                          />
                        </div>
                      </div>
                    </Link>
);
}