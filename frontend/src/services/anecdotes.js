import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getId = () => (100000*Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(`${baseUrl}/anecdotes`, { content, id: getId(), votes:0 })
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/anecdotes/${newObject.id}`, newObject)
  return response.data
}

export default { getAll, createNew, update }