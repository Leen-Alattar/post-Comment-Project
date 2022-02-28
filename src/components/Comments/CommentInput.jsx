import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./comment.css";

const CommentInput = ({ postId, comments, setComments, currentUser }) => {
  const [comment, setComment] = useState("");
  let navigate = useNavigate();

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    var userComment = {
      userId: currentUser.id,
      userImage: currentUser.image,
      postId: postId,
      name: currentUser.name,
      Comment: comment,
      id: Math.random() * 1000,
      date: moment().calendar(),
    };

    if (currentUser !== null) {
      if (JSON.parse(localStorage.getItem("comments")) === null) {
        localStorage.setItem("comments", JSON.stringify([userComment]));
        setComments([userComment]);
      } else {
        let comments    = JSON.parse(localStorage.getItem("comments"));
        let newComments = [...comments, userComment];
        localStorage.setItem("comments", JSON.stringify(newComments));
        setComments(newComments);
      }
      setComment("");
    } else {
      navigate("/");
    }
  };
  return (
    <form className="comment__form" onSubmit={submitHandler}>
      <input
        type="text"
        name="comment"
        placeholder="Add your comment..."
        onChange={commentHandler}
        value={comment}
      />
      {/* <i className="location arrow icon"></i> */}
    </form>
  );
};

export default CommentInput;
