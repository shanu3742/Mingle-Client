import Validator from 'validatorjs'
import { en } from './validatorjs/lang/en';
// import en from  'validatorjs/src/lang/en'

Validator.setMessages('en', en);
//validation rule and validation error message
const validationConfig = {
  login:{
    rule:{
      email: 'required|email',
      password: 'required',
    },
    message:{
      'required.email': 'Please enter your email address.',
      'email.email': 'Enter a valid email address.',
      'required.password': 'Please enter your password.',
    }
  },
  forgetPassword:{
    rule:{
      email: 'required|email',
    },
    message:{
      'required.email': 'Please enter your email address.',
      'email.email': 'Enter a valid email address.',
    }
  },
  signUp:{
    rule:{
      email: 'required|email',
      password: 'required',
      userId:'required',
      otp:'required',
      confirmPassword:'required'

    },
    message:{
      'required.email': 'Please enter your email address.',
      'email.email': 'Enter a valid email address.',
      'required.password': 'Please enter your password.',
      'required.userId': 'Please enter your userId.',
      'required.otp':'Please enter your otp.',
      'required.confirmPassword':'Please enter your confirmPassword.'
    }
  },
}

  const mingleValidate = (data:Record<string,string>,rules: Validator.Rules,message:Validator.ErrorMessages | undefined) =>{
    const validation = new Validator(data, rules, message);
    if (validation.fails()) {
      return {
        isValid: false,
        errors: Object.values(validation.errors.all()).flat()
                                                      .map((msg, index) => `${index + 1}. ${msg}`)
                                                      .join('\n')
      };
    }
    return { isValid: true, errors: '' };
  }


 //strong password rule and validation 

 export const passwordRules = [
   { message: "Minimum 8 characters", validate: (value:string) => value.length >= 8 },
   {
     message: "At least one uppercase letter",
     validate: (value:string) => /[A-Z]/.test(value),
   },
   {
     message: "At least one lowercase letter",
     validate: (value:string) => /[a-z]/.test(value),
   },
   {
     message: "At least one number",
     validate: (value:string) => /[0-9]/.test(value),
   },
   {
     message: "At least one special character",
     validate: (value:string) => /[@$!%*?&]/.test(value),
   },
 ];
 
 export const onStrongPasswordValidated = (password:string) => {
   return passwordRules.filter(({ validate }) => validate(password));
 };
  

export {Validator,validationConfig,mingleValidate}

