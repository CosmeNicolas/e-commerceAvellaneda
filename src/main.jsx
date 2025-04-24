import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import WhatsAppButton from './components/common/WhatsAppButton.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <NextUIProvider>
    <App />
    <WhatsAppButton/>
    </NextUIProvider>
  </React.StrictMode>,
)
