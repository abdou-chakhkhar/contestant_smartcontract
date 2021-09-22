import React, { Component, useEffect, useState } from 'react'
import Web3 from 'web3'
import Contest from '../abis/Contest.json'
import './App.css'

const App = () => {

  const [account, setAccount] = useState('0x0')
  const [contest, setContest] = useState({})
  const [contestants, setContestants] = useState([])
  const [constantsNumber, setConstantsNumber] = useState(0)


  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [loadWeb3, loadBlockchainData])





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
      setConstantsNumber(contestantsCount);
      let contestant1 = await contest.methods.contestants(1).call();
      let contestant2 = await contest.methods.contestants(2).call();

      setContestants([...contestants, contestant1.name, contestant2.name])



    }else{
      window.alert('Contest contract not deployed to detected network')
    }

    
  }



  return (
    <div>
      {/* <label className="float-left">your current account:<b>{account}</b></label> */}


      <div className="card mb-4">
        <div className="card-body">

          <table className="table table-borderless text-muted text-center">
            <thead>
              <tr>
                <th scope="col ">Contestant ({constantsNumber})</th>
              </tr>
            </thead>
            <tbody>
              {contestants.map(contestant => <tr>{contestant}</tr>)}
            </tbody>
          </table>

          <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = window.web3.utils.toWei(amount, 'Ether')
              }}>
              <div>
                <label className="float-left"><b>Select Contestant</b></label>
                <select>
                  <option>Tom</option>
                  <option>Jerry</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-sm">Vote</button>
            </form>


        </div>
      </div>

  </div>
  )
}



export default App