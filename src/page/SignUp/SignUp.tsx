//react import
import React, { useCallback, useEffect, useState } from "react";
//app file import
import { AuthLayout } from "../../layout";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PasswordValidationList from "../../component/PasswordValidationList/PasswordValidationList";
import OTPInput from "react-otp-input";
import { mingleValidate, onStrongPasswordValidated, passwordRules, validationConfig } from "../../config";
import { ErrorToast, SuccessToast } from "../../utils";
import { onSignupOtpRequest, onSignupOtpVerify } from "../../api";
import { onRegister } from "../../api/auth/auth.api";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    confirmPassword: "",
    password: "",
    userId:""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isRegisterPending, setIsRegisterPending] = useState(false);
  const navigate = useNavigate()

  // event handle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onInputUpdate = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setRegisterInfo((p) => {
      return { ...p, [name]: value };
    });
  };
  console.log("register info", registerInfo);
    const validatedRules = onStrongPasswordValidated(registerInfo.password);
   const isResetDisabled =
      validatedRules.length < passwordRules.length ||
      registerInfo.password !== registerInfo.confirmPassword;
  const sendOtp = async () => {
    try {
      const validation = mingleValidate({email:registerInfo.email},validationConfig.forgetPassword.rule,validationConfig.forgetPassword.message);
      if(!validation.isValid){
        ErrorToast(validation.errors);
        return
      }
      const otpMessage = await onSignupOtpRequest({ email:registerInfo.email });
      setOtpSent(true);
      SuccessToast(otpMessage.message);
    } catch (e:any) {
      setOtpSent(false);
      ErrorToast(e.errorMessage);
    }
  };
  const verifyOtp = useCallback(async () => {
    try {
      const otpMessage = await onSignupOtpVerify({ email:registerInfo.email, otp });
      setOtpVerified(otpMessage.verified);
      SuccessToast(otpMessage.message);
    } catch (e:any) {
      setOtpVerified(false);
      ErrorToast(e.errorMessage);
    }
  },[registerInfo.email,otp]);

    useEffect(() =>{
      if(otp.length===4){
        verifyOtp()
      }
    },[otp,verifyOtp])

    const registerAccount = async () => {
      try {
        setIsRegisterPending(true)
        const validation = mingleValidate({ email:registerInfo.email,password:registerInfo.password,userId:registerInfo.userId,otp:otp,confirmPassword:registerInfo.confirmPassword },validationConfig.signUp.rule,validationConfig.signUp.message);
        if(!validation.isValid){
          ErrorToast(validation.errors);
          setIsRegisterPending(false)
          return
        }
        const otpMessage = await onRegister({ email:registerInfo.email,password:registerInfo.password,userId:registerInfo.userId,otp:otp });
        setIsRegisterPending(false)
        SuccessToast(otpMessage.message);
        navigate("/app/user/signin");
      } catch (e:any) {
        setIsRegisterPending(false)
        ErrorToast(e.errorMessage);
      }
    };   
  return (
    <AuthLayout
      pageTitle="Create Account"
      pageDescription="Create an account and explore app"
    >
      <form className="py-4 px-4 relative">
        <div className="my-4">
          <TextField
            id="standard-basic"
            name="email"
            autoComplete="email"
            value={registerInfo.email}
            label="Enter Email"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => onInputUpdate(e)}
          />
        </div>
        {
          !otpSent && <div className="flex my-4">
          <Button variant="text" sx={{ pt: 0, pb: 0 }} onClick={sendOtp}>
            <span className="underline mingle-font-x-small">Send OTP</span>
          </Button>
        </div>
        }
        {otpSent && !otpVerified && (
          <>
            <div className="my-4 flex flex-col justify-center items-center">
              <OTPInput
                value={otp}
                onChange={(e) => {
                  setOtp(e)      
                }}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input {...props} className="otp-box" />
                )}
              />
            </div>
            <div className="flex my-4 justify-center">
              <Button variant="text" sx={{ pt: 0, pb: 0 }} onClick={sendOtp}>
                <span className="underline mingle-font-x-small">
                  ReSend OTP
                </span>
              </Button>{" "}
              |
              <Button variant="text" sx={{ pt: 0, pb: 0 }} onClick={verifyOtp}>
                <span className="underline mingle-font-x-small">
                  Verify OTP
                </span>
              </Button>
            </div>
          </>
        )}
        {otpSent && otpVerified && (
          <>
          <div className="my-4">
          <TextField
            id="standard-basic"
            name="userId"
            autoComplete="userId"
            value={registerInfo.userId}
            label="Enter UserID"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => onInputUpdate(e)}
          />
          </div>
             <div className="my-4">
           <FormControl variant="outlined" size="small" fullWidth>
             <InputLabel htmlFor="password-input">Enter Password</InputLabel>
             <OutlinedInput
               id="password-input"
               name="password"
               type={showPassword ? "text" : "password"}
               value={registerInfo.password}
               onChange={(e) => onInputUpdate(e)}
               endAdornment={
                 <InputAdornment position="end">
                   <IconButton
                     onClick={handleClickShowPassword}
                     onMouseDown={(e) => e.preventDefault()}
                     edge="end"
                     aria-label={
                       showPassword ? "Hide password" : "Show password"
                     }
                   >
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                   </IconButton>
                 </InputAdornment>
               }
               label="Enter Password"
             />
           </FormControl>
         </div>
         <div className="my-4">
           <TextField
             id="confirm-password"
             name="confirmPassword"
             autoComplete="confirm password"
             value={registerInfo.confirmPassword}
             label="Enter confirm password"
             variant="outlined"
             size="small"
             fullWidth
             onChange={(e) => onInputUpdate(e)}
           />
         </div>
 
         <div className="my-4 flex justify-center">
           <LoadingButton
             loading={isRegisterPending}
             disabled={isRegisterPending || isResetDisabled}
             onClick={registerAccount}
             type="submit"
             variant="contained"
             sx={{ background: "var(--mingle-primary-color)", width: "100%" }}
             startIcon={<AppRegistrationIcon />}
           >
             Register
           </LoadingButton>
         </div>
       <div className="my-4">
         <PasswordValidationList password={registerInfo.password} />
       </div>
          </>
        )}
       </form>
    </AuthLayout>
  );
};

export default SignUp;
