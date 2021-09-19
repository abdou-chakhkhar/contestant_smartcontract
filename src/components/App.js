import React, { Component, useEffect, useState } from 'react'
import Web3 from 'web3'
import Contest from '../abis/Contest.json'
import './App.css'

const App = () => {

  const [account, setAccount] = useState('0x0')
  const [contest, setContest] = useState({})
  const [contestants, setContestants] = useState([])


  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
    console.log("account", account);
    console.log("contest", contest);
  }, [])





  const loadWeb3 = async () => {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId();

    // load contest contract
    const contestData = Contest.networks[networkId];
    if(contestData){
      const contest = new web3.eth.Contract(Contest.abi, contestData.address);
      setContest(contest )
    
      let contestantsCount = await contest.methods.contestantsCount().call();
      let contestant1 = await contest.methods.contestants(1).call();
      let contestant2 = await contest.methods.contestants(2).call();

      setContestants([...contestants, contestant1.name, contestant2.name])




    }else{
      window.alert('Contest contract not deployed to detected network')
    }

    
  }



  return (
    <div>
      <p>your current account: {account}</p>
      <h5>contestants:</h5>
      {contestants.map(contestant => <p>{contestant}</p>)}
  </div>
  )
}



export default App