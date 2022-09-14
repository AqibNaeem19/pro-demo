import React, { useState, useEffect} from 'react'
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import '../styles/EthereumCard.css';
import { addressShortner } from '../Helpers/helper'
import { isWallectConnected } from '../SimpleStorage';


const EthereumCard = ({setAccountConnected}) => {
  const [walletAddress, setWalletAddress] = useState('0x000000000000000000000000')
  console.log('wallet Address', walletAddress)

  useEffect(() => {
    // To get the value instead of javascript promise object
    async function run() { 
      const data = await isWallectConnected();
      setWalletAddress(data);
      if( data !== '0x000000000000000000000000') {
        setAccountConnected(true);
        return ;
      }
      setAccountConnected(false);
    }

    const timer = setInterval(() => {
      run();
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <div className="eth-card-container eth-card white-glassmorphism ">
      <div className="eth-icon">
        <SiEthereum fontSize={40} color="#fff" />
      </div>
      <div className="eth-help-icon">
        <BsInfoCircle fontSize={25} color="#fff" />
      </div>
      <div className="ethereum-name">
        <p>Ethereum</p>
      </div>
      <div className="ethereum-address">
        <p>Address {addressShortner(`${walletAddress}`)}</p>
      </div>
    </div>
  )
}

export default EthereumCard;
