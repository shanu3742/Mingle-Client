//react import
import  { memo } from 'react'
//react router import
import {  Routes, Route, Navigate } from 'react-router-dom';
//app file import
import ProtectedRoutes from './guard/ProtectedRoutes';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';
import Chat from './page/Chat/Chat';
import ForgetPassword from './page/ForgetPassword/ForgetPassword';
import PageNotFound from './page/PageNotFound/PageNotFound';
import OnBoarding from './page/onBoarding/OnBoarding';
import Landing from './page/Landing/Landing';


const ChatRoutes = () => {

  return (   
  <Routes >
     <Route path="/" element={<Navigate to="/app/landing" replace />} />
     <Route element={<ProtectedRoutes defaultPath={"/app/user/signin"} />}>
       <Route path="/app/chat" element={<Chat />} />
       <Route path="/app/onboarding" element={<OnBoarding />} />
     </Route>
     <Route path="/app/landing" element={<Landing />} />
     <Route path="/app/user/signin" element={ <SignIn />} />
     <Route path="/app/user/signup" element={<SignUp />} />
     <Route path="/app/user/forgetpassword" element={<ForgetPassword />} />
     <Route path="*" element={<PageNotFound />} />

   </Routes>
 
   
  )
}

export default memo(ChatRoutes)