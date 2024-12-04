import React, { Fragment, useState } from 'react';
import Header from '../components/Header/Header';
import Create from '../components/Create/Create';


const CreatePage = () => {

  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <Fragment>
      <Header />
      <Create addPost={addPost}/>
    </Fragment>
  );
};

export default CreatePage;