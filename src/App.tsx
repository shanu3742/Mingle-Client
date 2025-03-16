// import react toastify
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
//import file scss
import './App.css';
////app file import 
import ChatRoutes from './ChartRoutes';
import PageSliderLayout from '@layout/PageSliderLayout';
import { AuthProvider } from '@context/authContext';


function App() {
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <ToastContainer />
        <AuthProvider>
          <PageSliderLayout>
            <ChatRoutes />
          </PageSliderLayout>
        </AuthProvider>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
