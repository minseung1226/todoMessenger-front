import { useEffect } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";
import { Image } from "react-bootstrap";
const MessageContainer = ({ messageList, user }) => {
  const img_url = process.env.REACT_APP_PROFILE_IMG_URL;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
    return formattedTime;
  };

  const isMinuteChanged=(date1,date2)=>{
   return new Date(date1).getMinutes()!==new Date(date2).getMinutes();
  }
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">

                <div>

                  <span className="my-date-and-count">
                  {
                      index===messageList?.length-1 ||
                      (messageList[index +1].user.name !== message.user.name ||
                        isMinuteChanged(messageList[index+1].createdAt,message.createdAt))
                        ?<div className="my-date">{formatDate(message.createdAt)}</div>:<div></div>}
                    
                    {message.unreadMembers?.length > 0 &&
                      <div className="my-count">{message.unreadMembers.length}</div>}
                  </span>

                  <span className="my-message">{message.chat}</span>

                </div>
              </div>
            ) : (
              <div className="your-message-container">
                <Image src={message.user.profileImg ? img_url + message.user.profileImg : "/profile.jpeg"} className="profile-img" roundedCircle
                  style={
                    (index === 0 || messageList[index - 1].user.name !== message.user.name)
                      ? { visibility: "visible" }

                      : { visibility: "hidden" }
                  }
                />
                <div>
                  {(index === 0 ||
                    messageList[index - 1].user.name !== message.user.name) &&
                    <div className="user-name">{message.user.name}</div>}

                  <div>
                    <span className="your-message">{message.chat}</span>
                    
                    <span className="you-date-and-count">
                      {
                      index===messageList?.length-1 ||
                      (messageList[index +1].user.name !== message.user.name ||
                        isMinuteChanged(messageList[index+1].createdAt,message.createdAt))
                        ?<div className="you-date">{formatDate(message.createdAt)}</div>:<div></div>}
                    
                      
                      {message.unreadMembers?.length > 0 &&
                      <div className="you-count">{message.unreadMembers.length}</div>}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
