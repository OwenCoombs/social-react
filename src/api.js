import axios from 'axios'

export const baseUrl = "http://127.0.0.1:8000"

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
    url: `${baseUrl}/get-images/`,
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
      image: image,
      
    }
  })
}

export const deletePost = async (imageId, {auth}) => {
  try {
    const response = await axios.delete(`${baseUrl}/get-images/${imageId}/delete/`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    console.log('Post id: ', imageId)
    console.log('Delete post: ', response);
  } catch (error) {
    console.error ('Error deleting post: ', error);
    throw error;
  }
}


export const updatePost = async ({imageId, auth, data}) => {
  console.log('My name is nathen', auth)
  try{
    await axios.put(`${baseUrl}/get-images/${imageId}/update/`, data, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
  } catch (error) {
    console.error ('Error updating post: ', error);
    throw error;
  }
  
}




export const getUserPosts = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/get-images/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};