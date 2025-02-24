//react import
import  { memo, ReactNode } from "react";
//react router import
import { NavLink, useLocation } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
// matrial ui  import
import { Button, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
//file scss
import "./AuthLayout.scss";
//app file import
import { ResizeContextInterface, useResizeContext } from "../../context/resizeContext";
import LoginSvg from "../../Assets/auth.svg";
import { FirebaseContextType, useFirebaseContext } from "../../context/firebaseContext";
import { ErrorToast } from "../../utils";
import { AuthInterface, useAuth } from "../../context/authContext";
import BackButton from "../../component/BackButton/BackButton";

const AuthLayout = ({
  pageTitle = "title of Page",
  pageDescription = "page Description",
  descriptionClassName = "font-x-small",
  children,
}:{ pageTitle:string
    pageDescription:string
    descriptionClassName?:string
    children:ReactNode
}) => {
  const routeDetails = useLocation();
  const isForgetPassword = routeDetails.pathname.includes("forgetpassword");

  console.log("routeDetails", routeDetails);
  //context and third party hooks
  const deviceDimension = useResizeContext() as ResizeContextInterface;
  const { auth, fbProvider } = useFirebaseContext() as FirebaseContextType;
  const { googleLogin, loginAttempt } = useAuth() as AuthInterface;

  console.log(loginAttempt);
  const handleGoogleLogin = async () => {
    try {
      const googleLoginInfo = await signInWithPopup(auth, fbProvider);
      const googleToken = await googleLoginInfo.user.getIdToken();
      console.log(googleToken);
      googleLogin({
        googleToken: googleToken,
      });
    } catch (err:any) {
      ErrorToast(err);
    }
  };
  // page ui
  return (
    <div className="w-screen h-screen grid grid-cols-12">
      {deviceDimension.deviceType >= 2 && (
        <div className="col-span-6 flex items-center justify-center">
          <img alt="auth logo" src={LoginSvg} />
        </div>
      )}
      <div
        className={`bg-slate-100 ${
          deviceDimension.deviceType >= 2 ? "col-span-6" : "col-span-12"
        } pt-10 px-4 relative`}
      >
        <div className="absolute left-1 top-1">
          <BackButton />
        </div>
        {loginAttempt < 5 && (
          <h5 className="w-full flex justify-center absolute font-bold top-0 left-0 mingle-danger-text">
            {" "}
            {loginAttempt} Login Attempt Remaning.
          </h5>
        )}
        <div className="font-bold mingle-primary-text text-center mingle-font-large">
          {pageTitle}
        </div>
        <div className={`text-center ${descriptionClassName}`}>
          {pageDescription}
        </div>
        <div className="flex items-center justify-center my-4">
          {!isForgetPassword && (
            <>
              <div>
                <NavLink
                  to={"/app/user/signin"}
                  className={({ isActive }) =>
                    isActive ? "activeLink mx-2" : "inactiveLink mx-2"
                  }
                >
                  Login
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={"/app/user/signup"}
                  className={({ isActive }) =>
                    isActive ? "activeLink mx-2" : "inactiveLink mx-2"
                  }
                >
                  Register
                </NavLink>
              </div>
            </>
          )}
        </div>
        <div>{children}</div>
        <Divider>OR</Divider>
        <div className="flex justify-center my-4">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          >
            Continue With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthLayout);
