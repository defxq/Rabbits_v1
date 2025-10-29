import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
import { store } from './app/store/store.jsx';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
          <Routes>
            <Route path="/*" element={<App />}/>
          </Routes>
        {/* </PersistGate> */}
      </Provider>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
