import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { loadProjects } from '../SimpleStorage';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { addressShortner, 
    convertDate, 
    convertHexToDecimal 
  } from '../Helpers/helper';
import '../styles/ProjectList.css';


const ProjectList = () => {
  const [listOfProjects, setListOfProjects] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await loadProjects();
        if( response ) {
         setListOfProjects(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProjects();
  }, [])


  return (
    <div className="project-list-container">

      {listOfProjects?.map( (project, index) => (

        <div key={index} onClick={() => navigate(`/project-details/${convertHexToDecimal(project.id._hex)}`)}>
          <ProjectCard title={project.title}
            id={convertHexToDecimal(project.id._hex)}
            owner={addressShortner(project.owner)}
            expiresAt={convertDate(project.expiresAt._hex)}
            cost={ethers.utils.formatEther(project.cost._hex)}
            raised={ethers.utils.formatEther(project.raised._hex)}
            backers={ethers.utils.arrayify(project.backers._hex)[0]}
            imageURL={project.imageURL}
          />
        </div>

      ))}
    </div>
  )
}

export default ProjectList;
