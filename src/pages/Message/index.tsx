import React from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:5000'); // Backend URL

const Message = () => {
  return (
    <div>Message</div>
  )
}

export default Message