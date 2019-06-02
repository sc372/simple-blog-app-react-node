import axios from 'axios'

export const Axios = () =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
    },
  })

export const AxiosWithJwt = (token = '') =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
