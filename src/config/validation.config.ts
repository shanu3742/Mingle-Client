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
  }
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


 
  

export {Validator,validationConfig,mingleValidate}

