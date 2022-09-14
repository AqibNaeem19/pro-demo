import React, { useState, useEffect, useRef } from 'react'
import Loader from './Loader';
import Modal from './Modal';
import Backers from './Backers';
import { useParams } from 'react-router-dom';
import { loadProject, backProject, getBackers } from '../SimpleStorage';
import { convertDate } from '../Helpers/helper';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { isWallectConnected } from '../SimpleStorage';
import '../styles/ProjectDetails.css';

const ProjectDetails = (props) => {
  const [modal, setModal] = useState(false);
  const [fundValue, setFundValue] = useState('');
  const [project, setProject] = useState()
  const [userAddress, setUserAddress] = useState();
  const [projectBackers, setProjectBackers] = useState();
  let modalRef = useRef();

  const openModal = () => {
    setModal(true);
  }

  const { setActiveProject } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  // Get project by ID from the contract
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await loadProject(id);
        // console.log('Response from contract : ', response);
        if (response) {
          setProject(response);
          setActiveProject(response);
          console.log('I am response', response);
          const address = await isWallectConnected();
          if (address) {
            setUserAddress(address);
          }
          const backers = await getBackers(id);
          setProjectBackers(backers);
          console.log('Project backers : ', backers)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchProjects();

  }, [id])

  // Handles the logic to close the modal by clicking anywhere outside the modal.
  useEffect(() => {
    if (modalRef.current) {
      let toggleHandler = event => {
        if (!modalRef.current.contains(event.target)) {
          setModal(false)
        }
      }
      document.addEventListener('mousedown', toggleHandler)

      // Clean-up function
      return () => (
        document.removeEventListener('mousedown', toggleHandler)
      )
    }
  })

  const onFundFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form value is ', fundValue);
    await backProject(id, fundValue);
  }

  // Renders the list of backers funding the project
  const backersList = <div className='backer-portion'>
    {projectBackers?.map((backer, index) => (
      <Backers id={index}
      key={index}
        owner={backer.owner}
        cost={ethers.utils.formatEther(backer.contribution._hex)}
        fundedDate={convertDate(backer.timestamp._hex)}
      />
    ))}
  </div>

  // Display spinner if fetching takes time
  if (!project) {
    return <Loader />
  }

  // Return statement of the function
  return (
    <div className="project-details">
      <div className="project-details-container">
        <div className="project-details-image">
          <img src={project?.imageURL} alt="Project description" />
        </div>
        <h1 className="project-details-title">{project?.title}</h1>
        <div className="project-details-desc">
          <h2 className="description-heading">Description</h2>
          <div className="description-border">

            <p className="description">{project?.description}</p>
          </div>
        </div>
        <div className="project-details-owner">
          <h2 className="owner-heading">Owner</h2>
          <p className="owner-address">{project?.owner}</p>
        </div>
        <div className="project-details-cost">
          <h2 className="cost-heading">Required</h2>
          <p className="cost-price">{project ? ethers.utils.formatEther(project?.cost._hex) : ''} Eth</p>
        </div>

        {/* Display control buttons */}

        {project && (project?.owner).toLowerCase() == userAddress ?
          <div className="details-buttons-container">
            <button className="details-update-button" onClick={() => navigate(`/edit-project/${id}`)}>Update</button>
            <button className="details-delete-button">Delete</button>
          </div> :
          <button className="details-fund-button" onClick={openModal}>Fund</button>
        }

        {/* Modal component Logic */}

        {modal &&
          <Modal>
            <div className="modal-screen">
              <div className="backdrop"></div>
              <div ref={modalRef} className="modal-container">
                <h1 className="modal-title">{project?.title}</h1>
                <form onSubmit={onFundFormSubmit}>
                  <input type="number" step="0.001" min="0.0001" value={fundValue} placeholder="0.001 Eth" onChange={(event) => setFundValue(event.target.value)} />
                  <button type="submit" className="modal-confirm-button">Confirm</button>
                </form>
              </div>
            </div>
          </Modal>
        }

        {/* Display project backers */}
        
        {projectBackers ? backersList : ''}
      </div>
    </div>
  )
}

export default ProjectDetails;
