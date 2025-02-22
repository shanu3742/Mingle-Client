import { onGoogleLogin, onLogin,onAutoLogin, onResetPassword } from "./auth/auth.api";
import { onForgetPasswordOtpRequest, onForgetPasswordOtpVerify ,onSignupOtpRequest,onSignupOtpVerify} from "./otp/otp.api";

export { onLogin,onAutoLogin, onGoogleLogin, onResetPassword, onForgetPasswordOtpRequest, onForgetPasswordOtpVerify ,onSignupOtpRequest,onSignupOtpVerify};
