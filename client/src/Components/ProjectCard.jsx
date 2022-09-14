import React from 'react'
import { SiEthereum } from 'react-icons/si';
import '../styles/ProjectCard.css'

const ProjectCard = ({title, id, owner, expiresAt, cost, raised, backers, imageURL}) => {
  return (
    <div className="projectCard-container">
      <div className="image-container">
        <img src={imageURL} alt="Project" />
      </div>
      <div className="card-title">
        <p>{title}</p>
      </div>
      <div className="card-info-container">
        <div className="card-address">
          <span>
          <SiEthereum fontSize={20} color="#fff" />
          </span> 
          <span>{owner}</span> 
        </div>
        <div className="days-left">
          <p>{expiresAt} days left</p>
        </div>
      </div>
      <div className="collected-amount-container">
        <div className="collected-amount">
          <p>{raised} <span>Eth</span></p>
        </div>
        <p>/</p>
        <div className="amount-required">
          <p>{cost} <span>Eth</span></p>
        </div>
      </div>
        <p className="project-backing">{backers} backings</p>
        <p className="project-status"><span>Status :- </span>open</p>
    </div>
  )
}

export default ProjectCard;
