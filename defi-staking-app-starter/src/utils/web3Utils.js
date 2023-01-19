import Web3 from 'web3';

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('No ethereum browser detected! You can check out Metamask');
  }
};

export const loadBlockchainData = async () => {
  const web3 = window.web3;
  const accountArray = await web3.eth.getAccounts();
  return { accountArray };
};
