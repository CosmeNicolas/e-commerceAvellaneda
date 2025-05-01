import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { CartProvider } from './components/helpers/CartContexts.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WhatsAppButton from './components/common/WhatsAppButton.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <NextUIProvider>
      <CartProvider>
    <App />
      </CartProvider>
    <WhatsAppButton/>
    </NextUIProvider>
  </React.StrictMode>,
)
