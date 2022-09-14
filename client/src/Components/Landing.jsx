import React, {useState} from 'react';
import EthereumCard from './EthereumCard';
import ProjectList from './ProjectList';
import Loader from './Loader';
import '../styles/Landing.css';

const Landing = () => {

  const [acountConnected, setAccountConnected] = useState(false);

  return (
    <React.Fragment>

    <div className="landing-page-container">
      <div className="landing-text">
        <h1 className="text-gradient">Invest in Future</h1>
        <p> Welcome to <span> decentralize</span> and <span> secure </span>crowd funding platform</p>
      </div>
      <div className="landing-art">
        <EthereumCard setAccountConnected={setAccountConnected}/>
      </div>
      
    </div>
    { acountConnected ?
        <ProjectList /> :
        <Loader />
    }
    </React.Fragment>
    
  )
}

export default Landing;
