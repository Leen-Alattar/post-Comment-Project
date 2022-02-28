import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import "./comment.css";

const Comment = ({ comment, id, comments, setComments, currentUser }) => {
  const [edit, setEdit] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(comment.Comment);

  //delete comment
  const deleteHandler = (id) => {
    let localComments = JSON.parse(localStorage.getItem("comments"));
    let remainder = localComments.filter((el) => el.id !== id);
    localStorage.setItem("comments", JSON.stringify(remainder));
    setComments(localComments);
  };
  //edit input handler
  const commentHandler = (e) => {
    setCommentToEdit(e.target.value);
  };
  //edit comment content
  const editHandler = (id) => {
    setEdit(true);
  };

  //update comment
  const updateComment = (id) => {
    let localComments = JSON.parse(localStorage.getItem("comments"));
    localComments.map((el) => {
      if (el.id === id) {
        el.Comment = commentToEdit;
      }
    });

    localStorage.setItem("comments", JSON.stringify(localComments));
    setComments(localComments);
    setEdit(false);
  };
  return (
    <>
      <div id="single__comment" className="ui comments" key={comment.id}>
        <div className="comment">
          <p className="avatar">
            <img
              className="ui avatar image"
              alt={"user"}
              src={faker.image.avatar()}
            />
          </p>
          <div className="content commentBox">
            <p className="author"> {comment.name}</p>
            <div className="metadata">
              <span className="date">{comment.date}</span>
              <div className="ui dropdown simple ">
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div
                    className="btn"
                    onClick={() => deleteHandler(comment.id)}
                  >
                    <i className="trash alternate icon"></i>
                  </div>
                  <div className="btn" onClick={() => editHandler(comment.id)}>
                    <i className="pencil alternate icon"></i>
                  </div>
                </div>
              </div>
            </div>
            {edit ? (
              <form onSubmit={() => updateComment(comment.id)}>
                <input
                  type="text"
                  name="comment"
                  placeholder="Add your comment..."
                  onChange={commentHandler}
                  value={commentToEdit}
                />
              </form>
            ) : (
              <div className="text">{comment.Comment}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Comment;
