import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

function Comment(props) {
  const [commentValue, setcommentValue] = useState("");
  const user = useSelector((state) => state.user);
  const videoId = props.postId;

  const handleClick = (e) => {
    setcommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
      } else {
        alert("덧글 저장하지 못하였습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {/* Comment Lists */}
      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          placeholder="코멘트를 작성해주세요."
          onChange={handleClick}
          value={commentValue}
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
