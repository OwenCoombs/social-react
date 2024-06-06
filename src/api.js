import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"

export const getToken = ({ auth, username, password, onSuccess }) => {
  axios.post(`${baseUrl}/token/`, {
    username: username,
    password: password
  }).then(response => {
    console.log('Token Response: ', response.data);
    auth.setAccessToken(response.data.access);
    if (onSuccess) onSuccess();
  })
  .catch(error => {
    console.log('Token Error: ', error.response ? error.response.data : error.message);
    auth.setAccessToken(undefined);
  });
}

export const fetchUser = ({ auth }) => {
  axios({
    method: 'get',
    url: `${baseUrl}/profile/`, 
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    console.log('PROFILE: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
  })
}

export const createUser = ({ username, password, firstName, lastName }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username,
      password: password,
      first_name: firstName,
      last_name: lastName
    }
  }).then(response => {
    console.log('CREATE USER: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}


export const getImages = ({ auth }) => {
  return axios({
    method: 'get', 
    url: `${baseUrl}/get-images`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const createImage = ({ auth, title, image }) => {
  return axios({
    method: 'post', 
    url: `${baseUrl}/create-image/`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth.accessToken}`
    }, 
    data: {
      title: title,
      description: description,
      image: image,
      
    }
  })
}
