//react import
import { memo } from 'react'
//react router import
import { Routes, Route, Navigate } from 'react-router-dom';
//app file import
import ProtectedRoutes from '@guard/ProtectedRoutes';
import SignUp from '@pages/SignUp';
import Chat from '@pages/Chat';
import ForgetPassword from '@pages/ForgetPassword';
import PageNotFound from '@pages/PageNotFound';
import OnBoarding from '@pages/OnBoarding';
import Landing from '@pages/Landing';
import SignIn from '@pages/SignIn';


const ChatRoutes = () => {

  return (
    <Routes >
      <Route path="/" element={<Navigate to="/app/landing" replace />} />
      <Route element={<ProtectedRoutes defaultPath={"/app/user/signin"} />}>
        <Route path="/app/chat" element={<Chat />} />
        <Route path="/app/onboarding" element={<OnBoarding />} />
      </Route>
      <Route path="/app/landing" element={<Landing />} />
      <Route path="/app/user/signin" element={<SignIn />} />
      <Route path="/app/user/signup" element={<SignUp />} />
      <Route path="/app/user/forgetpassword" element={<ForgetPassword />} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>


  )
}

export default memo(ChatRoutes)