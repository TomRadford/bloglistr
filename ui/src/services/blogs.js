import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response)
}

const getBlog = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request
}

const create = async (newObject) => {
    const config = {
        headers: {
            authorization: token,
        },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response
}

const update = async (newObject) => {
    const config = {
        headers: {
            authorization: token,
        },
    }
    return axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
}

const remove = async (newObject) => {
    const config = {
        headers: {
            authorization: token,
        },
    }
    const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
    return response
}

const createComment = async (id, comment) => {
    const config = {
        headers: {
            authorization: token,
        },
    }
    const response = await axios.post(
        `${baseUrl}/${id}/comments`,
        comment,
        config
    )
    return response
}

export default {
    setToken,
    getAll,
    getBlog,
    create,
    update,
    remove,
    createComment,
}
