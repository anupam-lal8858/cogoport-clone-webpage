import React from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../styles/image.webp";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Comments from  '../post/comment'

function PostDetail() {
  const { id } = useParams();


  const handlFollow = ()=>{
    console.log('followed')
  }

  const handleLikes = () =>{
    console.log("Liked")
  }
 

  const post = [
    {
      id: id,
      Title: "Coronavirus disease (COVID-19) is an infectious disease ",
      Author: "Mr. Aman",
      Date: "August 3, 2023",
      Time: "19 min",
      Topic: "Science",
      Likes : 45,
      FeaturedImage: image,
      postData:
        "<p>Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age.The best way to prevent and slow down transmission is to be well informed about the disease and how the virus spreads. Protect yourself and others from infection by staying at least 1 metre apart from others, wearing a properly fitted mask, and washing your hands or using an alcohol-based rub frequently. Get vaccinated when it’s your turn and follow local guidance.The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. These particles range from larger respiratory droplets to smaller aerosols. It is important to practice respiratory etiquette, for example by coughing into a flexed elbow, and to stay home and self-isolate until you recover if you feel unwell. </p>",
    },
  ];

  console.log(post);

  return (
    <>
      <div className="flex m-32 flex-col justify-center">
        <div className='flex justify-center'>
                <h1 className='text-center font-bold text-balck text-7xl'>{post[0].Title}</h1>
            </div>
        <div>
          <div className="flex justify-center items-center">
            <Link to='/profile'><span className="text-4xl text-red-800 p-5 hover:underline">{post[0].Author}</span></Link>
            <span className="text-blue-500 text-2xl font-bold p-5 cursor-pointer" onClick={handlFollow}>
              Follow
            </span>
          </div>
          <div className=" flex justify-center">
            <span className="text-xl text-gray-600 pb-5 pr-5">
              {post[0].Time}
            </span>
            <span className="text-xl text-gray-600 pb- pr-5">
              {post[0].Date}
            </span>
          </div>
          <div className=" flex justify-center">
            <span className="text-xl text-gray-600 pb-5 pr-5">
              Total Likes: {post[0].Likes}
            </span>
            <span className="text-xl text-gray-600 pb- pr-5 font-bold underline hover:cursor-pointer text-purple-700" onClick={handleLikes}>
              Like this Post
            </span>
          </div>
        </div>
        <div className="mt-10 flex justify-center items-center">
          <p className="text-justify w-1/2" >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post[0].postData}</ReactMarkdown>
            </p>
        </div>



      <Comments/>
      </div>

    </>
  );
}

export default PostDetail;

