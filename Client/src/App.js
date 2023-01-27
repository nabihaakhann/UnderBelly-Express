import './index.css';
import LoginPage from './components/LoginPage';
import { useEffect, useState } from 'react';

function App() {
  // // Testing if the server is accepting any requests or not
  // useEffect(()=>{
  //   fetch('/api')
  //   .then(response => response.text())
  //   .then(text => console.log(text))
  // }, []);

  return (
    <>
      <LoginPage />
    </>
  );
}

export default App;
