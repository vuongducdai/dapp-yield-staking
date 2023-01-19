// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Tether {
  string public name ='Mock Tether Token';
  string public symbol = 'USDT';
  uint public totalSupply = 1000000000000000000000000; // 1 million tokens
  uint public decimals = 18;

  event Transfer(
    address _from,
    address _to,
    uint _value
  );

  event Approval(
    address _owner,
    address _sender, 
    uint _value
  );

  mapping (address => uint) public balanceOf;
  mapping (address => mapping (address => uint)) public allowance;


  constructor() {
    balanceOf[msg.sender] = totalSupply;
  }

  function approve(address _spender, uint _value) public returns(bool success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transfer(address _to, uint _value) public returns (bool success){
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  /* 
    Transfer tether tokens to this contract address for staking
    ! Question 4: Tại sao là allownace[msg.sender][_from]
    !             Chứ không phải là allowance[_from][_to]

    ! Question 5: Mối liên hệ giữa _from, _to và msg.sender trong transferFrom?
  */
  function transferFrom(address _from, address _to, uint _value) public returns (bool success){
    require(balanceOf[_from] >= _value, 'balance is not sufficient');
    require(allowance[_from][_to] >= _value,  'allowance is not suffificent');

    balanceOf[_from] -= _value;
    allowance[_from][_to] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}