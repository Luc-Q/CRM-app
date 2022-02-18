import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const payload = {
    "username": "malihmailtest@gmail.com",
    "password": "malihmail",
  }

  // const fetchHandler = () => {
  //   fetch('http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/signin', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success', data)
  //   })
  //   .catch((error) => {
  //     console.error('Error', error)
  //   })
  // }

  const axios = require('axios')

  const instance = axios.create({
    baseURL: 'http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/'
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `${getTokenType()} ${getToken() ? getToken() : ""}`;
      config.headers.tenantReference = getTRef() ? getTRef() : "";
      return config;
    }
  )

  const postHandler = () => {
    instance.post('auth/signin', payload)
    .then((response) => {
      console.log(response)
      localStorage.setItem('tokenType', response.data.tokenType)
      localStorage.setItem('token', response.data.accessToken)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getHandler = () => {
    instance.get('getUserState/id/23')
    .then((response) => {
      console.log(response)
      localStorage.setItem('tRef', response.data.tenantReference)
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      localStorage.removeItem('token')
    });
  }

  const getTokenType = () => { 
    return localStorage.getItem('tokenType')
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const getTRef = () => {
    return localStorage.getItem('tRef')
  }

  return (
    <div className="App">
      <LoginPage onPost={postHandler} onGet={getHandler}/>
    </div>
  );
}

export default App;