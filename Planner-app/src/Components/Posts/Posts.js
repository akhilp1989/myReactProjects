import React, { useState, useEffect } from "react";
import "./post.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredUserId, setFiterUserId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const dataJSON = await data.json();
      setPosts(dataJSON);
      setFilteredPosts(dataJSON);
    };
    fetchData();
    return () => {};
  }, []);

  const filterPosts = () => {
    console.log(filteredUserId);
    let filterPosts = posts.filter((f) => {
      return f.userId === parseInt(filteredUserId);
    });
    console.log(filterPosts, filteredPosts);
    setFilteredPosts(filterPosts);
    setShowFilter(false);
  };
  const filterShow = showFilter ? "show" : "hide";
  const filterClassName = `input-${filterShow}`;
  return (
    <div>
      <h1>Posts</h1>
      <div className="main">
        <div className="filter">
          <div className="header">
            <span>Search</span>
            <span
              onClick={() => {
                setShowFilter(!showFilter);
              }}
            >
              <i className="fa-solid fa-chevron-down"></i>
            </span>
          </div>
          <div className={filterClassName}>
            <span>Filter on UserId:</span>
            <input
              type="text"
              onChange={(e) => setFiterUserId(e.target.value)}
            />
            <br />
            <button onClick={() => filterPosts()}>Filter</button>
          </div>
        </div>
        <div className="post-items">
          {filteredPosts &&
            filteredPosts.map((post, id) => {
              return (
                <div className="post" key={id}>
                  <span>{post?.userId}</span>
                  <span>{post?.title}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Posts;
