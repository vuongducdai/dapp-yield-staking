// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract RWD {
  string public name ='Reward Token';
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

  function transferFrom(address _from, address _to, uint _value) public returns (bool success){
    require(balanceOf[_from] >= _value);
    require(allowance[_from][_to] >= _value);
    balanceOf[_from] -= _value;
    allowance[_from][_to] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}