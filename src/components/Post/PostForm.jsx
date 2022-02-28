import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./post.css"

const PostForm = ({ posts, setPosts, setDisplay, LoggedIn, setLoggedIn }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");
  const [imageURLs, setImageURLs] = useState("");
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  const contentHandler = (e) => {
    setContent(e.target.value);
  };
  const imageHandler = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = URL.createObjectURL(images[0]);
    console.log(newImageUrls)
    setImageURLs(newImageUrls);
  }, [images]);

  const submitHandler = (e) => {
    e.preventDefault();
    setUser(JSON.parse(sessionStorage.getItem("currentUser"))[0]);
    console.log(user);
    let post = {
      id: Math.random() * 1000,
      content: content,
      name: user.name,
      userId: user.id,
      date: moment().calendar(),
      image: imageURLs,
    };
    console.log(post);
    if (JSON.parse(localStorage.getItem("posts")) === null) {
      localStorage.setItem("posts", JSON.stringify([post]));
      setPosts([post]);
    } else {
      let posts = JSON.parse(localStorage.getItem("posts"));
      let newPosts = [...posts, post];
      localStorage.setItem("posts", JSON.stringify(newPosts));
      setPosts(newPosts);
    }
    setContent("");
    setImageURLs("");
    setDisplay(false);
  };

  return (
    <React.Fragment>
      <form className="ui form" onSubmit={submitHandler}>
        <div className="field">
          <textarea
            placeholder="Write something to descripe your post"
            type="text"
            rows="2"
            name="content"
            value={content}
            onChange={contentHandler}
          >
            {content}
          </textarea>
        </div>
        <div className="field">
          <input
            type="file"
            name="file"
            multiple
            accept="image/*"
            id="file"
            value=""
            onChange={imageHandler}
          />
        </div>
        <button className="ui button bttn" type="submit">
          Post
        </button>
      </form>
    </React.Fragment>
  );
};
export default PostForm;
