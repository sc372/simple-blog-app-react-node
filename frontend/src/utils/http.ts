import axios from 'axios'

export const Axios = () =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
    },
  })

export const AxiosWithJwt = (jwtToken: string) =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${jwtToken}`,
    },
  })
