import React, { useState } from "react";
import { Comment, Avatar, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.CommentValue);
  };

  const onSubmitCommnet = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("덧글 저장하지 못하였습니다.");
      }
    });
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} />}
        content={<p>{props.comment.content}</p>}
      />
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmitCommnet}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            placeholder="코멘트를 작성해주세요."
            value={CommentValue}
            onChange={onHandleChange}
          />
          <br />
          <button
            style={{ width: "20%", height: "52px" }}
            onClick={onSubmitCommnet}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
