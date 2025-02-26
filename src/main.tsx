import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

function patchBigintToJSON() {
  ;(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
    return this.toString()
  }
}

patchBigintToJSON()
