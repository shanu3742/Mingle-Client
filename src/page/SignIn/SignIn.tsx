//react import
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//material ui import 
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
//app file import
import { AuthLayout } from '../../layout';
import { ErrorToast } from '../../utils';
import {mingleValidate, validationConfig} from '../../config';
import useAuth from '../../hooks/useAuth';


const SignIn = () => {
// state define 
const {login,isLoginPending} = useAuth();
const navigate = useNavigate()

const [loginInfo,setLoginInfo] =useState({
  email:'',
  password:''
})
const [showPassword, setShowPassword] = React.useState(false);

// event handle
const handleClickShowPassword = () => setShowPassword((show) => !show);

const onUserLogin =  (e:FormEvent) => {
    e.preventDefault()
    const validation = mingleValidate(loginInfo,validationConfig.login.rule,validationConfig.login.message);
    if(!validation.isValid){
      ErrorToast(validation.errors);
      return
    } 
    login(loginInfo)
    // do call mutated here    
  }

  
  const onInputUpdate = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
   setLoginInfo((p) => {
    return {...p,[name]:value}
   })
  }

// page ui
  return (
    <AuthLayout pageTitle='Login here' pageDescription='Welcome back you’ve been missed!' descriptionClassName='mingle-font-normal font-bold'>
    <form className='py-4 px-4 relative' onSubmit={onUserLogin}  >
      <div className='my-4'>
        <TextField id="standard-basic"  name="email"  autoComplete="email" value={loginInfo.email} label="Enter Email/user id" variant="outlined" size="small" fullWidth onChange={(e) => onInputUpdate(e)} />
      </div>
      <div className='my-4'>
      <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel htmlFor="password-input">Enter Password</InputLabel>
      <OutlinedInput
        id="password-input"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={loginInfo.password}
        onChange={(e) => onInputUpdate(e)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Enter Password"
      />
    </FormControl>
    

      </div>
      <div className='flex justify-end my-4'>
        <Button variant="text" sx={{pt:0,pb:0}} onClick={() => navigate('/app/user/forgetpassword')}>
          <span className='underline mingle-font-x-small' >Forgot your password?</span>
        </Button>
      </div>
      <div className='my-4 flex justify-center'>
        <LoadingButton loading={isLoginPending} disabled={isLoginPending} type='submit' variant="contained" sx={{background:'var(--mingle-primary-color)',width:'100%'}} startIcon={<LoginIcon />}>Log in</LoadingButton>
      </div>
    </form>
    </AuthLayout>
  )
}

export default SignIn