import abi from './contracts/SimpleStorage.json'
import { ethers } from 'ethers'


const { ethereum } = window
const contractAddress = '0x8e2Fb26D8c3EEcA614681776C617440f01A9b9bC'
const contractAbi = abi.abi

const getEtheriumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)
    return contract
}

const isWallectConnected = async () => {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length) {
      return accounts[0]
    } else {
      console.log('No accounts found.')
      return '0x000000000000000000000000'
    }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log('account connected', accounts[0])
  } catch (error) {
    console.log(error)
  }
}

const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = getEtheriumContract()
    cost = ethers.utils.parseEther(cost)
    await contract.createProject(title, description, imageURL, cost, expiresAt)

    await loadProjects() // The blockchain is too slow for this...
    window.location.reload() // That's why we used this...
    console.log('Project creation successfull');
  } catch (error) {
    console.log(error)
  }
}

const loadProjects = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = getEtheriumContract()
    const projects = await contract.getProjects()
    return projects;
  } catch (error) {
   console.log(error)
  }
}

const loadProject = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = getEtheriumContract()
    let project = await contract.getProject(id)

    // await getBackers(id)
    // console.log("Project Loaded...", project)
    return project;
  } catch (error) {
    console.log(error)
  }
}

const updateProject = async ({
  id,
  title,
  description,
  imageURL,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = getEtheriumContract()
    await contract.updateProject(id, title, description, imageURL, expiresAt)

    // await loadProjects() // The blockchain is too slow for this...
    // window.location.reload() // That's why we used this...
  } catch (error) {
   console.log(error)
  }
}

const backProject = async (id, amount) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const connectedAccount = await isWallectConnected()
    const contract = getEtheriumContract()
    amount = ethers.utils.parseEther(amount)

    await contract.backProject(id, {
      from: connectedAccount,
      value: amount._hex,
    })

    // await loadProjects() // The blockchain is too slow for this...
    // window.location.reload() // That's why we used this...
  } catch (error) {
    console.log(error)
  }
}

const getBackers = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = getEtheriumContract()
    let backers = await contract.getBackers(id)
    return backers;

  } catch (error) {
    console.log(error)
  }
}

export {
  getEtheriumContract,
  isWallectConnected,
  connectWallet,
  createProject,
  loadProjects,
  loadProject,
  updateProject,
  backProject,
  getBackers
}