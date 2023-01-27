import React from 'react'
import './StakingComponent.css'

const StakingComponent = () => {
  return (
    <div className="staking-component-wrapper">
      <div className="balance-wrapper">Balance: </div>
      <div className="button-wrapper">
        <button>Deposit</button>
        <button>With Draw</button>
        <button>AirDrop</button>
      </div>
    </div>
  )
}

export default StakingComponent
