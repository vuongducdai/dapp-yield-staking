const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
  //Deploy Tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  // Deploy RWD contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  //Deploy DecentralBank
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  /* Transfer all RWD tokens to DecentralBank
  !  Question 1: Tại sao lại định nghĩa RWD token riêng
  !              chứ reward không phải là tether token?
  */
  await rwd.transfer(decentralBank.address, '1000000000000000000000000');

  /* Distribute 100 Tether tokens to investor
  !  Question 2: Code này chuyển 100 tether token từ account0 sang account1
  !              Làm sao tether.transfer code có thể hiểu lấy address của account0
  */
  await tether.transfer(accounts[1], '100000000000000000000');
};
