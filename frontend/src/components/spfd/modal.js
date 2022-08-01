import React from "react";
import ReactDom from 'react-dom'

const MODAL_STYLES = {                                     //Styles for the content
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {                                   //Styles for the background
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000
}

export default function Modal({ open, children, onClose }) {
  if(!open) return null

  return ReactDom.createPortal (
    <>
      <div style={OVERLAY_STYLES}/>
      <div style={MODAL_STYLES}>
        {
          <form>
            {children}
          </form>
        }
        <button onClick={onClose}>Close</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}