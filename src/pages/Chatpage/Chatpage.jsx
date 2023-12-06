// import React,{useEffect,useState} from "react";
// import {Button} from "@mui/base/Button"
// import MessageContainer from "../../components/MessageContainer/MessageContainer";
// import InputField from "../../components/InputField/InputField";
// import "./ChatPageStyle.css"
// import {useParams,useNavigate} from "react-router-dom"

// const ChatPage=()=>{
//     const server_url=process.env.REACT_APP_SERVER_URL;
//     const token=sessionStorage.getItem("jwtToken");
//     const [user,setUser]=useState('');
//     const [messageList,setMessageList]=useState([]);
//     const [message,setMessage]=useState("");
//     const {id}=useParams();
//     const navigate=useNavigate();
//     useEffect(()=>{
//         fetch(`${server_url}/findUser?roomId=${id}`,{
//             method:"GET",
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization":`Bearer ${token}`
//             },
            
//         }).then(res=>res.json())
//         .then((data)=>{
//             console.log("user=",data);
//             setUser(data)})
//         .catch(err=>console.log(err.message));

//         socket.emit("getAllChats",id,(res)=>{
//             setMessageList(res);
//         });

//         socket.on("message",(res)=>{
//             setMessageList((prevState)=>prevState.concat(res));
//         });


//     },[]);



//     const sendMessage=(event)=>{
//         event.preventDefault();
//         socket.emit("sendMessage",message,id,(res)=>{
//             if(!res.ok){
//                 console.log("error message=",res.error);
//             }
//             setMessage("");
//         })
//     }

//     const leaveRoom=()=>{
//         socket.emit("leaveRoom",user,(res)=>{
//             if(res.ok) navigate("/rooms") 
//         })
//     }

//     return(
//         <div>
//         <div className="App">
//         {/* nav 이부분 추가  */}
//             <nav>
//               <Button onClick={leaveRoom} className='back-button'>←</Button>
//               <div className='nav-user'>{user.name}</div>
//             </nav>
//           <div>
//             {messageList.length > 0 ? (
//               <MessageContainer messageList={messageList} user={user} />
//             ) : null}
//           </div>
//           <InputField
//             message={message}
//             setMessage={setMessage}
//             sendMessage={sendMessage}
//           />
//         </div>
//       </div>
//     );
// }

// export default ChatPage;