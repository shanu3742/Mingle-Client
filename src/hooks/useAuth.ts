import { QueryFilters, useMutation ,useQueryClient} from "@tanstack/react-query";
import  {onGoogleLogin, onLogin} from "../api"
import  { SuccessToast, ErrorToast } from "../utils";
import  {useLocation, useNavigate } from "react-router-dom";
import { onAutoLogin, onLogOut } from "../api/auth/auth.api";
import { useEffect, useRef } from "react";


let authAttempt=0;
const MAX_ATTEMPT=1;
const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAutoLoginRef = useRef(false);
  const location = useLocation();

  const handleSuccess = (data: unknown) => {
    SuccessToast('Login Successful');
    queryClient.setQueryData(['auth', 'login'], data);
    navigate('/app/chat');
  };

  const handleLogoutSuccess = () => {
     queryClient.removeQueries(['auth', 'login'] as QueryFilters<string,string>);
     SuccessToast('You have been logged out successfully');
     navigate('/app/user/signin'); 
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (err: any) => {
    const {errorMessage,error}= err;
    const loginAttemptRemaning = (error?.response)?.headers['ratelimit-remaining'];
    queryClient.setQueryData(['login', 'loginattempt'], loginAttemptRemaning);
    ErrorToast(errorMessage)
  }
    
  const emailLoginMutation = useMutation({
        mutationKey:['auth','email','login'],
        mutationFn:onLogin,
        onSuccess:handleSuccess,
        onError:handleError  
      })

  const googleLoginMutation = useMutation({
        mutationKey:['auth','google','login'],
        mutationFn:onGoogleLogin,
        onSuccess:handleSuccess,
        onError:handleError
      });
  const logoutMutation = useMutation({
        mutationKey:['auth','logout'],
        mutationFn:onLogOut,
        onSuccess:handleLogoutSuccess,
        onError:handleError
  });

  useEffect(() => {
    if(authAttempt>MAX_ATTEMPT){
      return 
    }
    if (isAutoLoginRef.current) return; // Ensure it runs only once
    console.log('location url',location)
    isAutoLoginRef.current = true; // Mark it as executed

    const userData = queryClient.getQueryData(['auth', 'login']);
    if (userData) return;

    const handleAutoLogin = async () => {
      try {
        const data = await onAutoLogin();
        queryClient.setQueryData(['auth', 'login'], data);
        navigate('/app/chat', { replace: true });
        authAttempt= authAttempt+1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const {errorMessage}= err ;
        authAttempt= authAttempt+1;
        console.warn(errorMessage);
      }
    };

    handleAutoLogin();
  }, []); // Empty dependency array to ensures it runs only once on mount


 return  {
    login:emailLoginMutation.mutate,
    googleLogin:googleLoginMutation.mutate,
    logout:logoutMutation.mutate,
    loginAttempt:queryClient.getQueryData(['login', 'loginattempt']) as number,
    isLoginPending:emailLoginMutation.isPending||googleLoginMutation.isPending,
    user:queryClient.getQueryData(['auth','login'])}
}
export default useAuth;

export interface UserInterface {
  name:string;
  userId:string;
  email:string;
  isFullDetais:boolean
}