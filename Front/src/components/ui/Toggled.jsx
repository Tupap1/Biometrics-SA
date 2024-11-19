import React from 'react'

function Toggled({isToggled, onToggle}) {
  return (
    <div>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
    </div>
  )
}

export default Toggled