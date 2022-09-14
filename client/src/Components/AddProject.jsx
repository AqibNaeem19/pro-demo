import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProject, updateProject } from '../SimpleStorage';
import { UnixToDate , convertDate} from '../Helpers/helper';
import { ethers } from 'ethers';
import '../styles/AddProject.css'

const AddProject = (props) => {
  const { edit, activeProject } = props;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    cost: '',
    validDate: '',
  })

  const navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {
    if (edit && activeProject) {
      // Extract fields from the updating project
      let editTitle = activeProject?.title;
      let editDescription = activeProject?.description;
      let editImageURL = activeProject?.imageURL;
      let editCost = ethers.utils.formatEther(activeProject?.cost._hex);
      let editExpiresAt = UnixToDate(activeProject.expiresAt._hex)

      // Extract Year, Month and Date separately
      let extractYear = editExpiresAt.getFullYear();
      let extractMonth = editExpiresAt.getMonth();
      let extractDate = editExpiresAt.getDate();
      extractMonth = parseInt(extractMonth) + 1;

      // If the length of Month or Day is 1, then add a leading zero infront of it
      if (extractMonth.toString().length <= 1) {
        extractMonth = '0' + parseInt(extractMonth)
        console.log('The required month is ', extractMonth)
      }
      if (extractDate.toString().length <= 1) {
        extractDate = '0' + extractDate;
      }
      console.log('The required month is ', extractMonth)
      // Converting it to proper date format
      let properDateFormat = `${extractYear}-${extractMonth}-${extractDate}`

      // Updating state of the form data
      setFormData(prevState => ({
        ...prevState,
        title: editTitle,
        description: editDescription,
        imageUrl: editImageURL,
        cost: editCost,
        validDate: properDateFormat
      }))
    }
  }, [])


  // Handle Chnage on htmlForm and update state
  const handleChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }


  // convert date to valid unix timestamp.
  const toTimestamp = (strDate) => {
    const datum = Date.parse(strDate)
    return datum / 1000
  }


  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      if (edit) {

        const editProjectParams = {
          id: id,
          title: formData.title,
          description: formData.description,
          expiresAt: toTimestamp(formData.validDate),
          imageURL: formData.imageUrl
        }

        await updateProject(editProjectParams);
        console.log('Project edited from frontend')
        navigate('/');

      } else {

        const newProjectParams = {
          title: formData.title,
          description: formData.description,
          cost: parseFloat(formData.cost),
          expiresAt: toTimestamp(formData.validDate),
          imageURL: formData.imageUrl
        }
        
        await createProject(newProjectParams);
        console.log('Project created from frontend')
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fullscreen-container">

      <div className="container">
        <div className="heading">
          {!edit ?
            <h1>Time to
              <span> Fund </span>
              your next
              <span> Project </span>
              and convert it into
              <span> Reality </span>
            </h1> :
            <h1>Time to <span>upgarde</span></h1>
          }
        </div>

        <div className="form-container">

          <form onSubmit={onFormSubmit}>

            <div className="input-group">
              <label htmlFor="Title">Title</label>
              <input type="text"
                id="Title"
                name="title"
                value={formData.title}
                placeholder="Playstation 5"
                required
                onChange={handleChange} />
            </div>

            <div className="input-group">
              <label htmlFor="Description">Description</label>
              <textarea type="text"
                rows="6"
                id="Description"
                name="description"
                value={formData.description}
                placeholder="Its the description"
                required
                onChange={handleChange} />
            </div>

            <div className="input-group">
              <label htmlFor="imageUrl">Image Url</label>
              <input type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                placeholder="https://myImage.png"
                required
                onChange={handleChange} />
            </div>

            <div className="input-group">
              <label htmlFor="cost">Cost</label>
              <input type="number"
                step="0.01"
                min="0.001"
                id="cost"
                name="cost"
                value={ ethers.utils.formatEther(activeProject?.cost._hex)}
                placeholder="0.01 eth"
                required
                 />
            </div>

            <div className="input-group">
              <label htmlFor="Date">Date</label>
              <input type="date"
                id="Date"
                name="validDate"
                value={formData.validDate}
                required
                onChange={handleChange} />
            </div>

            <button className="form-submit-button" type="submit">Create Project</button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default AddProject;
