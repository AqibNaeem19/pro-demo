import React from 'react';
import '../styles/Backers.css';

const Backers = (props) => {
  const { owner, cost, fundedDate } = props

  console.log( fundedDate);
  return (
    <React.Fragment>
      <div className="backers-item">
        <p className="backer-address">{owner}</p>
        <p className="backer-amount">{cost} Eth</p>
        <p className="backer-timestamp">{fundedDate}</p>
      </div>
      <hr className="backer-horizontal-line" />
    </React.Fragment>
  )
}

export default Backers;
