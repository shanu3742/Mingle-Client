import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
//import react router
import { BrowserRouter } from 'react-router-dom';
//import scss
import './index.scss';
//app file import
import FireBaseProvider from '@context/firebaseContext';

import { Provider } from 'react-redux'
import { store } from './store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <FireBaseProvider>
        <BrowserRouter>

          <App />

        </BrowserRouter>
      </FireBaseProvider>
    </Provider>
  </StrictMode>,
)
