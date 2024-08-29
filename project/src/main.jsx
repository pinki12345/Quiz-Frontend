import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import store from "../store/index.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
     <BrowserRouter>
        <App />
        <Toaster/>
     </BrowserRouter>
   </Provider>
  ,
)
