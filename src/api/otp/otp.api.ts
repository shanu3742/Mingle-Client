import axios from 'axios'
import { APP_CONFIG } from '../../config';
const authApi = axios.create({
    baseURL:`${APP_CONFIG.backend_uri}/chat/api/v1/user/`
})

const onForgetPasswordOtpRequest = async ({email}:{email:string}) => {
    try{
        const result = await  authApi.post('forget-password/request-otp',{
            email:email,
        });
        const  data= result.data;
        return Promise.resolve(data)
    }catch(e){
        let errorMessage='An unexpected error occurred';
        if(axios.isAxiosError(e)){
           errorMessage  = e?.response?.data?.message || e?.message ;
        }     
        return Promise.reject({errorMessage,error:e});
    }

}
const onForgetPasswordOtpVerify = async ({email,otp}:{email:string,otp:string}) => {
    try{
        const result = await  authApi.post('forget-password/verify-otp',{
            email:email,
            otp:otp
        });
        const  data= result.data;
        // verified
        return Promise.resolve(data)
    }catch(e){
        let errorMessage='An unexpected error occurred';
        if(axios.isAxiosError(e)){
           errorMessage  = e?.response?.data?.message || e?.message ;
        }     
        return Promise.reject({errorMessage,error:e});
    }

}

const onSignupOtpRequest = async ({email}:{email:string}) => {
    try{
        const result = await  authApi.post('signup/request-otp',{
            email:email,
        });
        const  data= result.data;
        return Promise.resolve(data)
    }catch(e){
        let errorMessage='An unexpected error occurred';
        if(axios.isAxiosError(e)){
           errorMessage  = e?.response?.data?.message || e?.message ;
        }     
        return Promise.reject({errorMessage,error:e});
    }

}
const onSignupOtpVerify = async ({email,otp}:{email:string,otp:string}) => {
    try{
        const result = await  authApi.post('signup/verify-otp',{
            email:email,
            otp:otp
        });
        const  data= result.data;
        // verified
        return Promise.resolve(data)
    }catch(e){
        let errorMessage='An unexpected error occurred';
        if(axios.isAxiosError(e)){
           errorMessage  = e?.response?.data?.message || e?.message ;
        }     
        return Promise.reject({errorMessage,error:e});
    }

}
export {onForgetPasswordOtpRequest,onSignupOtpRequest,onForgetPasswordOtpVerify,onSignupOtpVerify}
