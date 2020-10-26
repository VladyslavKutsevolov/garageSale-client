import ScrollToBottom from 'react-scroll-to-bottom';
import React from 'react';
import Message from '../chatMessage/Message'

function Messages( { messages, name }) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
}

export default Messages;
