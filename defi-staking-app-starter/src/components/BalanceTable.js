import React from 'react'
import './BalanceTable.css'

export const BalanceTable = () => {
  return (
    <div className="balance-table-wrapper">
      <table className="balance-table">
        <thead>
          <tr>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
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
