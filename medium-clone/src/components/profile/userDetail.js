import React from 'react'
import axios from 'axios';

function UserDetail() {

  const user = [
    {
      name:"Anupam Lal",
      email:"anupam@gmail.com",
      followers:"100",
      Likes:"10k"
    }
  ]

  const jwtToken = localStorage.getItem('token');
  console.log(jwtToken);

  // Set headers with the JWT token
  const headers = {
    'Content-Type': 'application/json',
  };

  axios.post('http://127.0.0.1:3000/profile', {},{headers})
  .then((response) => {
    // Handle success response here
     const token = response.data;
    // localStorage.setItem('token', token);
    // console.log('SignIn', token);
    // alert('SignIn succeccful!');
    // navigate('/');
    // window.location.reload();
     console.log(token);


  })
  .catch((error) => {
    // Handle error here
   
    console.error(error);
  });

  return (
    <>
      <div className=' flex flex-col justify-center items-center mt-10'>
        <div>
        <h1 className=' text-6xl text-blue-950'>My Profile</h1>
        </div>
        <div className='mt-5 flex flex-col bg-gray-100 p-10 rounded-md shadow-md shadow-gray-400'>
        <h2 className='text-3xl mr-10 mt-5 mb-3'><span className='text-blue-600 text-4xl'>Hello! </span>{user[0].name}<span className="ml-3 font-bold text-2xl bg-green-600 text-white rounded-md p-3 ">Edit</span></h2>
        <h2 className='text-3xl'><span>Email: </span> {user[0].email}<span className="ml-3 font-bold text-2xl bg-green-600 text-white rounded-md p-3 ">Edit</span></h2>
        <h2 className='text-3xl'><span>Followers: </span> {user[0].followers}</h2>
        <h2 className='text-3xl'><span>Likes: </span> {user[0].Likes}</h2>
        </div>
      </div>
    </>
  )
}

export default UserDetail