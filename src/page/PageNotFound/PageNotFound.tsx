import LoadingButton from '@mui/lab/LoadingButton'
import  { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_CONFIG } from '../../config';

const PageNotFound = () => {
 const [countDownTimer, setCountDownTimer] = useState(APP_CONFIG.auto_redirect);
 const navigate = useNavigate();
 const countDownRef= useRef<string | number | NodeJS.Timeout | undefined>(undefined)
 const countDownFn = () => {
    setCountDownTimer((p) => p-1)
}
 useEffect(() => {
    countDownRef.current= setInterval(countDownFn,1000) 
    return () => clearInterval(countDownRef.current)

 },[])

 useEffect(() => {
    if(countDownTimer<0){
        if(countDownRef.current){
            clearInterval(countDownRef.current)
        }
        navigate('/app/chat')
    }

 },[countDownTimer])


  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
       <img className="h-auto w-64 rounded-lg my-4" src="/image/page-not-found.png" alt="page not found" />
       <h4 className='text-red-500 my-4' ><b>Auto redirect with in: {countDownTimer}</b></h4>
       <LoadingButton onClick={() => navigate('/app/chat')}   variant="contained" sx={{background:'var(--mingle-primary-color)'}} >Go To Home</LoadingButton>
    </div> 
  )
}

export default PageNotFound