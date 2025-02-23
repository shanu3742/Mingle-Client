import Message from '../Message/Message'
import { AuthInterface, useAuth } from '../../context/authContext'


const Chat = () => {
  // console.log(userData)
  const {logout} = useAuth() as AuthInterface
  return (
    <>
    <Message />
    <button onClick={() =>logout()}>logout</button>
    </>
 
  )
}

export default Chat