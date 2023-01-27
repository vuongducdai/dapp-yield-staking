import React from 'react'
import './StakingComponent.css'

const StakingComponent = ({ tetherBalance }) => {
  return (
    <div className="staking-component-wrapper">
      <div className="balance-wrapper">Balance: {window.web3.utils.fromWei(tetherBalance)}</div>
      <div className="button-wrapper">
        <button>Deposit</button>
        <button>With Draw</button>
        <button>AirDrop</button>
      </div>
    </div>
  )
}

export default StakingComponent
