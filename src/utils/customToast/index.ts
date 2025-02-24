//import react toastify
import {  toast,Bounce, ToastOptions } from 'react-toastify';
const showToast = (message:string, type = 'success', options = {}) => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
      ...options, // Merge with custom options
    };
  
    if (type === 'error') {
      toast.error(message, toastOptions as ToastOptions<unknown>);
    } else {
      toast.success(message, toastOptions as ToastOptions<unknown>);
    }
  };
  
  const ErrorToast = (message:string, options?:any) => showToast(message, 'error', options);
  const SuccessToast = (message:string, options?:any) => showToast(message, 'success', options);

  export {ErrorToast,SuccessToast }
  