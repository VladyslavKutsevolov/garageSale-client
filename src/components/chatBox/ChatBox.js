import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'
import TextContainer from '../chatTextContainer/TextContainer';
import Input from '../chatInput/Input'
import Messages from '../messages/Messages'


let socket;
const name = "username";
const room = "room";
const users = "users";

const Chat = ({ location }) => {

  const [buyerName, setBuyerName] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [saleTitle, setSaleTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:5000'

  // Set the title of the chat to the sale title. Handle user joining chat.
  // Handle disconnect on unmount
  useEffect(() => {

    const {userId, saleId, sellerId} = queryString.parse(location.search);

    // Use helper functions to grab seller name, buyer name, sale title. Set them in state
    socket = io(ENDPOINT)

    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {

    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })


  }, [messages])

  // function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages)

  return(
    <div className="outerContainer">
      <div className="container">
        <Messages messages={messages} name={name}/>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat
