/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { QueryFilters, UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { onGoogleLogin, onLogin, onAutoLogin, onLogOut } from "../api/auth/auth.api";
import { SuccessToast, ErrorToast } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../config";

const AuthContext= createContext<AuthInterface|null>(null);



export const AuthProvider = ({ children }:{children:React.ReactNode}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAutoLoginLoading,setIsAutoLoginLoaading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginNavigation = (data:any) => {
    console.log('navigatin',data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(data && !(data as any).isFullDetais){
        console.log('inside')
        navigate('/app/onboarding')
      }else{
        console.log('outside')
        navigate('/app/chat')
      }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = useCallback((data:any) => {
    SuccessToast("Login Successful");
    queryClient.setQueryData(["auth", "login"], data);
    loginNavigation(data)
  },[]);

  const handleLogoutSuccess =useCallback( () => {
    queryClient.removeQueries(["auth", "login"] as QueryFilters<string, string>);
    SuccessToast("You have been logged out successfully");
    navigate("/app/user/signin");
  },[]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError =useCallback( (err:any) => {
    const { errorMessage, error } = err;
    const loginAttemptRemaining = error?.response?.headers["ratelimit-remaining"];
    queryClient.setQueryData(["login", "loginattempt"], loginAttemptRemaining);
    ErrorToast(errorMessage);
  },[]);

  const emailLoginMutation = useMutation({
    mutationKey: ["auth", "email", "login"],
    mutationFn: onLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const googleLoginMutation = useMutation({
    mutationKey: ["auth", "google", "login"],
    mutationFn: onGoogleLogin,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const logoutMutation = useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: onLogOut,
    onSuccess: handleLogoutSuccess,
    onError: handleError,
  });

  useEffect(() => {
    const userData = queryClient.getQueryData(["auth", "login"]);
    if (userData) {
        navigate('/app/chat')
    };

    const handleAutoLogin = async () => {
      try {
        setIsAutoLoginLoaading(true)
        const data = await onAutoLogin();
        queryClient.setQueryData(["auth", "login"], data);
        if(location.pathname ==='/'){
            setTimeout(() => {
                loginNavigation(data)
            },APP_CONFIG.landing_duiration)
        }else{
               loginNavigation(data)
        }
       
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        const { errorMessage } = err;
        console.warn(errorMessage);
        setTimeout(() => {  
                navigate('/app/user/signin')   
        },APP_CONFIG.landing_duiration)
      }finally{
        setTimeout(() => {
            setIsAutoLoginLoaading(false)
        },APP_CONFIG.landing_duiration)
      }
    };

    handleAutoLogin();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        login: emailLoginMutation.mutate,
        googleLogin: googleLoginMutation.mutate,
        logout: logoutMutation.mutate,
        loginAttempt: queryClient.getQueryData(["login", "loginattempt"]) as number,
        isLoginPending: emailLoginMutation.isPending || googleLoginMutation.isPending,
        user: queryClient.getQueryData(["auth", "login"]),
        isAutoLoginPending:isAutoLoginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export interface AuthInterface {
   
        login:UseMutateFunction<any, any, {
            email: string;
            password: string;
        }, unknown>;
        googleLogin: UseMutateFunction<any, any, {
            googleToken: string;
        }, unknown>;
        logout: UseMutateFunction<any, any, void, unknown>,
        loginAttempt: number,
        isLoginPending:boolean,
        user: unknown,
        isAutoLoginPending:boolean
      
}
