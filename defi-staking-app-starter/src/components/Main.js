import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Navbar from './NavBar'
import { BalanceTable } from './BalanceTable'
import StakingComponent from './StakingComponent'
import './Main.css'

const Main = () => {
  const initialAccountAddress = '0x0'
  const [account, setAccount] = useState(initialAccountAddress)
  const [tether, setTether] = useState({})
  const [rwd, setRwd] = useState({})
  const [decentralBank, setDecentralBank] = useState({})
  const [tetherBalance, setTetherBalance] = useState('0')
  const [rwdBalance, setRwdBalance] = useState('0')
  const [stakingBalance, setStakingBalance] = useState('0')
  const [loading, setLoading] = useState(true)

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('No ethereum browser detected! You can check out Metamask')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Get account of metamask Wallet
    const accountArray = await web3.eth.getAccounts()
    setAccount(accountArray[0])
  }

  const loadTokenContract = async (Contract, web3, networkId) => {
    const contractData = Contract.networks[networkId]
    if (contractData) {
      const contract = new web3.eth.Contract(Contract.abi, contractData.address)
      let balance = await contract.methods.balanceOf(account).call()
      return { contract, balance }
    } else {
      window.alert('Err! Tether contract is not deployed - no detected network!')
    }
  }

  const loadContracts = async () => {
    // Get networkId of current MetaMask network
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()

    // Load Tether contract
    const { contract: tetherContract, balance: tetherBalance } = await loadTokenContract(
      Tether,
      web3,
      networkId
    )
    setTether(tetherContract)
    setTetherBalance(tetherBalance.toString())

    // Load RWD contract
    const { contract: rwdContract, balance: rwdBalance } = await loadTokenContract(
      RWD,
      web3,
      networkId
    )
    setRwd(rwdContract)
    setRwdBalance(rwdBalance.toString())

    // Load DecentralBank contract
    const decentralBankData = DecentralBank.networks[networkId]
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
      setDecentralBank(decentralBank)
      const stakingBalance = await decentralBank.methods.stakingBalance(account).call()
      setStakingBalance(stakingBalance.toString())
    } else {
      window.alert('Error loading decentralBank')
    }

    setLoading(false)
  }

  useState(async () => {
    loadWeb3()
    loadBlockchainData()
  })

  useEffect(() => {
    if (account !== initialAccountAddress) loadContracts()
  }, [account])

  useEffect(() => {
    console.log(tetherBalance)
  }, [tetherBalance])

  return (
    <>
      <Navbar account={account} />
      <div className="main-wrapper">
        <BalanceTable stakingBalance={stakingBalance} rwdBalance={rwdBalance} />
        <StakingComponent tetherBalance={tetherBalance} />
      </div>
    </>
  )
}

export default Main
