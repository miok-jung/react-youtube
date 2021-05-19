import React, { useState, useEffect } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  // 나를 구독한 인원수 확인하기
  useEffect(() => {
    let variable = { userTo: props.userTo };
    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
        // console.log(response.data);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });

    // 내가 구독한 사람인지 확인하기
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/subscribe/subscribed", subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("정보를 받아오지 못했습니다.");
        }
      }
    );
  }, []);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    // 이미 구독중이라면, 구독 취소가 된다
    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소하는데 실패하였습니다.");
          }
        }
      );
      // 아직 구독중이 아니라면, 구독으로 변경
    } else {
      Axios.post("/api/subscribe/subscribe", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 하는데 실패하였습니다.");
          }
        }
      );
    }
  };
  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase", // 대문자 전환
        }}
        onClick={onSubscribe}
      >
        {Subscribed ? "Subscribed" : `${SubscribeNumber} Subscribe`}
      </button>
    </div>
  );
}

export default Subscribe;
