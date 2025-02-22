//react import
import  { ReactNode } from "react";
//react router import 
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//app file import

const ProtectedRoutes = ({ defaultPath = "/app/user/signin", children }:{defaultPath?:string,children?:ReactNode}) => {
  //context and third party hooks
  const {user} = useAuth();
  const location = useLocation();

  // page ui
  if (!user) {
    return <Navigate to={defaultPath} replace />;
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if(user && !(user as any).isFullDetais && location.pathname !=='/app/user/fulldetails'){
    return <Navigate to={"/app/user/fulldetails"} replace />;
  }

  return <>{!children ? <Outlet /> : children}</>;
};

export default ProtectedRoutes;