import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
//import react router
import { BrowserRouter } from 'react-router-dom';
//import scss
import './index.scss';
//app file import
import { ResizeProvider } from './context/index.ts';
import FireBaseProvider from './context/firebaseContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FireBaseProvider>
      <BrowserRouter>
        <ResizeProvider>
          <App />
        </ResizeProvider>
      </BrowserRouter>
    </FireBaseProvider>
  </StrictMode>,
)
