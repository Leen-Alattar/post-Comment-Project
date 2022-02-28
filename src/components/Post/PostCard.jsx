import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import faker from "@faker-js/faker";
import CommentInput from "../Comments/CommentInput";
import Comment from "../Comments/Comment";
import { useNavigate } from "react-router-dom";
import "./post.css"
const PostCard = ({
  posts,
  setPosts,
  display,
  setDisplay,
  LoggedIn,
  setLoggedIn,
  comments,
  setComments,
}) => {
  let navigate = useNavigate;
  const [currentUser, setCurrentUser] = useState();
  const showHandler = () => {
    setDisplay(true);
  };

  useEffect(() => {
  
  if (sessionStorage.getItem("currentUser"))
   { var user = JSON.parse(sessionStorage.getItem("currentUser"));}
    setCurrentUser(user);
    if (localStorage.getItem("comments")) {
      var localComments = JSON.parse(localStorage.getItem("comments"));
    }
     if (localStorage.getItem("posts")) {
       var localPosts = JSON.parse(localStorage.getItem("posts"));
     }
    setPosts([localPosts]);
    setComments([localComments]);

  }, [setPosts, setComments, setCurrentUser]);

  return (
    <div className="content">
      {display ? (
        <PostForm
          posts={posts}
          setPosts={setPosts}
          display={display}
          setDisplay={setDisplay}
          LoggedIn={LoggedIn}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <button className="postbutton" type="submit" onClick={showHandler}>
          Add post &nbsp;&nbsp; 
        </button>
      )}

      {localStorage.getItem("posts") === null
        ? ""
        : JSON.parse(localStorage.getItem("posts")).map((post) => (
            <div className="ui card post " id="content__post" key={post.id}>
            
              <div className="content">
                <div className="right floated meta">{post.date}</div>
                <img
                  className="ui avatar image"
                  alt={post.name}
                  src={faker.image.avatar()
                  }
                />
                {post.name}
              </div>
              <div className="ex  content">
                <div className="ui large transparent left input post__content">
                  {post.content}
                </div>
              </div>
              {post.image ? (
                <div className="image">
                  <img src={post.image} alt="post" />
                </div>
              ) : (
                ""
              )}
              <div className="extra content">
                <div className="ui large transparent left  input">
                  <CommentInput
                    postId={post.id}
                    comments={comments}
                    setComments={setComments}
                  />
                </div>
              </div>
              <div className="extra content">
                {localStorage.getItem("comments") === null
                  ? ""
                  : JSON.parse(localStorage.getItem("comments")).map(
                      (comment) =>
                        comment.postId === post.id ? (
                          <Comment
                            comment={comment}
                            id={comment.id}
                            key={comment.id}
                            comments={comments}
                            setComments={setComments}
                            currentUser={currentUser}
                          />
                        ) : (
                          ""
                        )
                    )}
              </div>
            </div>
          ))}
    </div>
  );
};
export default PostCard;
