import axios from "axios";
import { APP_CONFIG } from "../../config";

const authApi = axios.create({
  baseURL: `${APP_CONFIG.backend_uri}/chat/api/v1/user/`,
});

const onLogin = async ({ email, password }:{email:string, password:string}) => {
  try {
    const result = await authApi.post("login", {
      email: email,
      password: password,
    });
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject({errorMessage,error:e});
  }
};

const onGoogleLogin = async ({ googleToken }:{googleToken:string}) => {
  try {
    const result = await authApi.get("googlelogin", {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    });
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject({errorMessage,error:e});
  }
};
const onResetPassword = async ({ email, password, otp }:{email:string, password:string, otp:string}) => {
  try {
    const result = await authApi.post("reset-password", {
      email: email,
      password: password,
      otp: otp,
    });
    const data = result.data;
    return Promise.resolve(data);
  } catch (e) {
    let errorMessage='An unexpected error occurred';
    if(axios.isAxiosError(e)){
       errorMessage  = e?.response?.data?.message || e?.message ;
    }     
    return Promise.reject({errorMessage,error:e});
  }
};

export { onLogin, onGoogleLogin, onResetPassword };
