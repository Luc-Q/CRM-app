import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const data = {
    "username": "malihmailtest@gmail.com",
    "password": "malihmail",
  }

  const fetchHandler = () => {
    fetch('http://malih-auth.ap-southeast-2.elasticbeanstalk.com/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success', data)
    })
    .catch((error) => {
      console.error('Error', error)
    })
  }

  return (
    <div className="App">
      <LoginPage onFetch={fetchHandler}/>
    </div>
  );
}

export default App;
