import { AuthInterface, useAuth } from "../../context/authContext"

const OnBoarding = () => {
    const {logout} = useAuth() as AuthInterface
  return (
    <>
    <div>shanu onbarding</div>
    <button onClick={() =>logout()}>logout</button>
    </>
  )
}

export default OnBoarding