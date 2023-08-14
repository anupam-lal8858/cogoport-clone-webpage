import React from 'react'
import image from './medium.png'
import { Link } from 'react-router-dom';
import '../../index.css'
import { useEffect,useState } from 'react';
function TopPost() {
  
  const [posts,setData]=useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://127.0.0.1:3000/articles/topPosts')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log(
    'topost', posts
  );

  // const posts = [
  //   {
  //     id: "1",
  //     Title: "Sample post 1 ",
  //     Author: "sample Name1",
  //     Date: "August 3, 2023",
  //     Time: "19 min",
  //     Topic: "Science",
  //     FeaturedImage: image,
  //     postData:
  //       "Excessive heat is pushing the limits of human tolerability. .",
  //   },
  //   {
  //     id: "2",
  //     Title: "Sample Post 2",
  //     Author: "sample name2",
  //     Date: "August 3, 2023",
  //     Time: "12 min",
  //     Topic: "College",
  //     FeaturedImage: image,
  //     postData: "This is the content of Sample Post 2...",
  //   },
  //   {
  //     id: "3",
  //     Title: "Sample Post 3",
  //     Author: "Sample Name3",
  //     Date: "August 3, 2023",
  //     Time: " 10 min",
  //     Topic: "Environment",
  //     FeaturedImage: image,
  //     postData: "This is the content of Sample Post 3...",
  //   },
  //   {
  //     id: "4",
  //     Title: "Sample Post 4",
  //     Author: "sample name4",
  //     Date: "August 3, 2023",
  //     Time: " 10 min",
  //     Topic: "Environment",
  //     FeaturedImage: image,
  //     postData: "This is the content of Sample Post 3...",
  //   },
  //   {
  //     id: "5",
  //     Title: "Sample Post 5",
  //     Author: "sample name5",
  //     Date: "August 3, 2023",
  //     Time: " 10 min",
  //     Topic: "Environment",
  //     FeaturedImage: image,
  //     postData: "This is the content of Sample Post 3...",
  //   },
  //   {
  //     id: "5",
  //     Title: "Sample Post 5",
  //     Author: "sample name6",
  //     Date: "August 3, 2023",
  //     Time: " 10 min",
  //     Topic: "Environment",
  //     FeaturedImage: image,
  //     postData: "This is the content of Sample Post 3...",
  //   },
  //   {
  //     id: "5",
  //     Title: "Sample Post 5",
  //     Author: "sample name7",
  //     Date: "August 3, 2023",
  //     Time: " 10 min",
  //     Topic: "Environment",
  //     FeaturedImage: image,
  //     postData: "This is the content of Sample Post 3...",
  //   },
  // ];


  return (
    <div>
       <h1 className='text-blue-950 font-bold text-3xl mb-5'>Top articles for you</h1>
       <div className="flex mr-10 w-full overflow-x-auto ">
          {posts.map((post) => {
            return (
              <Link to={post.id} className=' flex p-5 justify-center bg-yellow-100 shadow-lg shadow-black-500/50 mb-8 mr-4 w-1/3  hover:bg-purple-200 hover:ease-in duration-300 hover:scale-95'>
                <div className='flex justify-center'>
                  <div className="w-60 h-60 m-2 flex justify-center  overflow-hidden">
                    <img
                      className="rounded-lg"
                      src={image}
                      alt="feature_photo"
                    />
                  </div>
                </div>


                <div className="p-2 m-2 rounded-md w-96 h-72">
                  <div className="p-2 font-bold text-lg text-bold">
                    <h3>{post.author.name}</h3>
                  </div>
                  <div className="w-full text-left h-16">
                    <h2 className=' text-2xl font-bold'>{post.title}</h2>
                  </div>
                  <div className="w-full text-justify  mt-1 mb-1 h-20 ">
                    <p className='text-lg'>{post.description}</p>
                  </div>

                  <div className="w-full mt-4">
                  <span className="mr-3 font-light">{post.created_at.substring(0,10)}</span>
                    <span className="mr-3 font-light">{post.created_at.substring(11,16)}</span>
                    <span className="mr-3 font-bold text-blue-500">{post.genre}</span>
                  </div>
                </div>





              </Link>
            );
          })}
        </div>
    </div>
  )
}

export default TopPost