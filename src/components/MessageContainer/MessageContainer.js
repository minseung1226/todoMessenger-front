import { useEffect } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";
import { Image } from "react-bootstrap";
const MessageContainer = ({ messageList, user }) => {
  const img_url = process.env.REACT_APP_PROFILE_IMG_URL;
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
                {message.unreadMembers?.length>0&&
                  <span className="my-count">{message.unreadMembers.length}</span>}
                  <span className="my-message">{message.chat}</span>
                  
                </div>
              </div>
            ) : (
              <div className="your-message-container">
                <Image src={message.user.profileImg ? img_url + message.user.profileImg : "/profile.jpeg"} className="profile-img" roundedCircle
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].user.name === user.name) ||
                      messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div>
                  {(index === 0 ||
                    messageList[index - 1].user.name === user.name ||
                    messageList[index - 1].user.name === "system") &&
                    <div className="user-name">{message.user.name}</div>}

                  <div>
                    <span className="your-message">{message.chat}</span>
                    {message.unreadMembers?.length>0&&
                  <span className="you-count">{message.unreadMembers.length}</span>}
               
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
