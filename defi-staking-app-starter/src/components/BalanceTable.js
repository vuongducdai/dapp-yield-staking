import React from 'react'

export const BalanceTable = () => {
  return (
    <table class="border-collapse border border-slate-400 ...">
      <thead>
        <tr>
          <th class="border border-slate-300 ...">State</th>
          <th class="border border-slate-300 ...">City</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-slate-300 ...">Indiana</td>
          <td class="border border-slate-300 ...">Indianapolis</td>
        </tr>
        <tr>
          <td class="border border-slate-300 ...">Ohio</td>
          <td class="border border-slate-300 ...">Columbus</td>
        </tr>
        <tr>
          <td class="border border-slate-300 ...">Michigan</td>
          <td class="border border-slate-300 ...">Detroit</td>
        </tr>
      </tbody>
    </table>
  )
}
