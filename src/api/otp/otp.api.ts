import axios from 'axios'
import { APP_CONFIG } from '../../config';
const authApi = axios.create({
    baseURL:`${APP_CONFIG.backend_uri}/chat/api/v1/user/`
})

const onOtpRequest = async ({email}:{email:string}) => {
    try{
        const result = await  authApi.post('request-otp',{
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
const onOtpVerify = async ({email,otp}:{email:string,otp:string}) => {
    try{
        const result = await  authApi.post('verify-otp',{
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

export {onOtpRequest,onOtpVerify}
