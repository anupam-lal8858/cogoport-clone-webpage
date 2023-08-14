

import React, {useState } from "react";
import { Link } from "react-router-dom";
import logo from "./medium.png"
import SearchPosts from "./searchedPost";


const Navbar = () => {

  const [Searchterm, setSearchTerm] = useState('');
  const [searchedPosts, setData] = useState([]);
  const [token,settoken]=useState(localStorage.getItem('token')||'');
 
  // console.log(token);

  const handleSearch = (e) => {

    setSearchTerm(e.target.value);

    const searchUrl = `http://127.0.0.1:3000/articles/search?title=${Searchterm}`;

    if(Searchterm)
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching data:', error));

  };
  
  const handleClick=()=>{
    settoken('');
    localStorage.removeItem('token');
  };

  // console.log(
  //   'Search post', searchedPosts);


  return (
    <div>
      <nav className= {'bg-yellow-100 p-4 border-gray-200'} style={{ borderBottom: '1px solid black' }}>
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8 ">
          <Link to="/" class="flex items-center">
            <img
              src={logo}
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-4xl font-bold whitespace-nowrap dark:text-black">
              Medium
            </span>
          </Link>

          <div >
            <input class="p-4 border rounded" type="text" placeholder="search medium"
              name='searchbar' value={Searchterm} onChange={handleSearch}>

            </input>
          </div>

          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-row p-4">
              <li>
                <Link
                  to="/"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 text-black hover:text-blue-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/mypost"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 text-gray-900 hover:text-blue-700"
                >
                  My Posts
                </Link>
              </li>

             

              <li>
                <Link
                  to="/write"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 text-gray-900 hover:text-blue-700"
                >
                  Add Post
                </Link>
              </li>
              
              <li>
                <Link
                  to="/subscription"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 bg-blue-950 hover:bg-blue-900 text-white rounded-3xl "
                >
                  <span className="p-10 rounded-2xl">Subscription</span>
                </Link>
              </li>

            {
              !token?(<>
               

              <li>
                <Link
                  to="/signin"
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 bg-blue-950 hover:bg-blue-900 text-white rounded-3xl "
                >
                  <span className="p-10 rounded-2xl">Sign In/Up</span>
                </Link>
              </li>
              </>
              ):(<> 
               <li>
                <Link
                  to="/profile"
                  class="block py-2 pl-3 text-2xl pr-4 text-gray-900 mr-8 hover:text-blue-700"
                >
                 My Profile
                </Link>
              </li>
              
              <li>
                <Link
                  onClick={handleClick}
                  class="block py-2 pl-3 text-2xl pr-4 mr-8 bg-red-500 hover:bg-blue-900 text-white rounded-3xl "
                >
                  <span className="p-10 rounded-2xl">LogOut</span>
                </Link>
              </li></>)
            }
              
             
            </ul>
          </div>
        </div>
      </nav>

      {Searchterm ? (
        <>
          <div className="flex justify-center">
            <h2 className='text-blue-950 font-bold text-3xl mb-5 '>Searched results for <em>"{Searchterm}"</em> </h2>
          </div>
          <div className="flex justify-center m-20 mt-5 ">

            <div className="flex flex-col justify-center items-start mr-10" >
              <div className="flex flex-col justify-center items-start mr-10 ">
                {
                
                searchedPosts.length?
               ( searchedPosts.map((post) => {
                  return (
                    <SearchPosts
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    author={post.author}
                    created_at={post.created_at}
                    genre={post.genre}
                    />
                  );
                })):(<h3>No results Found!</h3>)
                }
              </div>
           </div>
          </div>
        </>
      ) : (
        null
      )
      }
    </div>
  );
};

export default Navbar;
