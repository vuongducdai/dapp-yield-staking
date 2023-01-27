import React from 'react'
import './BalanceTable.css'

export const BalanceTable = ({ stakingBalance, rwdBalance }) => {
  return (
    <div className="balance-table-wrapper">
      <table className="balance-table">
        <thead>
          <tr>
            <th scope="col">Staking Balance: {window.web3.utils.fromWei(stakingBalance)}</th>
            <th scope="col">Reward Balance: {window.web3.utils.fromWei(rwdBalance)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> USDT</td>
            <td> RWD</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
