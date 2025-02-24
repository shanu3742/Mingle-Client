//react import
import  { ReactNode } from "react";
//react router import 
import { Navigate, Outlet } from "react-router-dom";
import { AuthInterface, useAuth } from "@context/authContext";
import Landing from "../page/Landing";
//app file import

const ProtectedRoutes = ({ defaultPath = "/app/user/signin", children }:{defaultPath?:string,children?:ReactNode}) => {
  //context and third party hooks
  const {user,isAutoLoginPending} = useAuth() as AuthInterface;
 
   if(isAutoLoginPending){
    return <Landing />
   }
  // page ui
  if (!user && !isAutoLoginPending) {
    return <Navigate to={defaultPath} replace />;
  } 



  return <>{!children ? <Outlet /> : children}</>;
};

export default ProtectedRoutes;