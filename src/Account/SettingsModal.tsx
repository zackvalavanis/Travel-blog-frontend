import React from "react";
import './SettingsModal.css'

type SettingsModalProps = {
  show: boolean,
  onClose: () => void
}

export function SettingsModal({ show, onClose }: SettingsModalProps) {
  if (!show) return null
  return (
    <div className='settings-modal-overlay'>
      <div className='settings-modal-container' onClick={(e) => e.stopPropagation()}>
        Hello
        <button onClick={onClose}>Close</button>
      </div>
    </div>

  )
}