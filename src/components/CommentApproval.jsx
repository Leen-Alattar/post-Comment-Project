import React from "react";
import faker from "@faker-js/faker";
import Comment from "./Comments/Comment.jsx";
const CommentApproval = ({
  comments,
  setComments,
  approvedComments,
  setApprovedComments,
}) => {
  const approveHandler = (comment) => {
    setApprovedComments([...approvedComments, comment]);
    setComments(comments.filter((el) => el.id !== comment.id));
  };
  const declineHandler = (comment) => {
    setComments(comments.filter((el) => el.id !== comment.id));
  };

  return (
    <React.Fragment>
      <div className="ui cards">
        {comments.map((comment) => (
          <div className="card" key={comment.id}>
            <div className="content">
              <Comment comment={comment} avatar={faker.image.avatar()} />
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <div
                  className="ui basic green button"
                  onClick={() => approveHandler(comment)}
                >
                  Approve
                </div>
                <div
                  className="ui basic red button"
                  onClick={() => declineHandler(comment)}
                >
                  Decline
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
export default CommentApproval;
