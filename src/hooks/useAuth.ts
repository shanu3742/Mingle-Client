import { QueryFilters, useMutation ,useQueryClient} from "@tanstack/react-query";
import  {onGoogleLogin, onLogin} from "../api"
import  { SuccessToast, ErrorToast } from "../utils";
import  {useNavigate } from "react-router-dom";



const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleSuccess = (data: unknown) => {
    SuccessToast('Login Successful');
    queryClient.setQueryData(['auth', 'login'], data);
    navigate('/app/chat');
  };

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

  const logout = () => {
        queryClient.removeQueries(['auth', 'login'] as QueryFilters<string,string>);
        SuccessToast('You have been logged out successfully');
        navigate('/app/user/signin'); 
    };
 

 return  {
    login:emailLoginMutation.mutate,
    googleLogin:googleLoginMutation.mutate,
    logout:logout,
    loginAttempt:queryClient.getQueryData(['login', 'loginattempt']) as number,
    isLoginPending:emailLoginMutation.isPending||googleLoginMutation.isPending,
    user:queryClient.getQueryData(['auth','login'])}
}
export default useAuth;