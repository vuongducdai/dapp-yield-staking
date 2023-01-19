// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
  string public name ='Decentral Bank';
  address public owner;
  address [] public stakers;
  Tether public tether;
  RWD public rwd;

  mapping (address => uint) public stakingBalance;
  mapping (address => bool) public hasStaked;
  mapping (address => bool) public isStaked; 

  constructor(RWD _rwd, Tether _tether) {
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender;
  }

  function depositTokens(uint _amount) public {
    // Require staking amount is greater than 0
    require(_amount > 0, 'amount cannot be 0');

    /* 
      Transfer tether tokens to this contract address for staking
      ! Question 3: Tại sao là address(this) chứ không phải là owner (state variable của DecentralBank)
      !             Theo em hiểu thì address(this) là address của DecentralBank contract.
      !             address của DecentralBank contract và address của owner là riêng biệt,
      !             Khi deposit thì deposit vào bank, chứ không phải deposit vào owner phải không anh?
    */
    tether.transferFrom(msg.sender, address(this), _amount);

    // Update Staking balance
    stakingBalance[msg.sender] += _amount;

    if(!hasStaked[msg.sender]){
      stakers.push(msg.sender);
    }

    // Update Staking status
    hasStaked[msg.sender] = true;
    isStaked[msg.sender] = true;
  }

  // Issue reward
  function issueTokens() public{
    require(msg.sender == owner, 'Must be owner');
    for(uint i=0; i<stakers.length; i++){
      address recepient = stakers[i];
      uint balance = stakingBalance[recepient] / 9;
      if(balance > 0){
        rwd.transfer(recepient, balance);
      }
    }
  }

  // Unstake 
  function unstakeTokens() public {
    uint balance = stakingBalance[msg.sender];
    require(balance > 0, 'Balance must be greater than 0 to unstake');

    tether.transfer(msg.sender, balance);

    // reset staking balance
    stakingBalance[msg.sender] = 0;

    // Update Staking status
    isStaked[msg.sender] = false; 
  }

}