import Message from '../Message/Message'
import useAuth from '../../hooks/useAuth'


const Chat = () => {
  // console.log(userData)
  const {logout} = useAuth()
  return (
    <>
    <Message />
    <button onClick={() =>logout()}>logout</button>
    </>
 
  )
}

export default Chat