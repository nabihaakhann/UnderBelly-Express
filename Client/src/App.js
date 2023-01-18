import './index.css';
import LoginPage from './components/LoginPage';
import { useEffect } from 'react';

function App() {
  // Testing if the server is accepting any requests or not
  useEffect(()=>{
    fetch('/api')
    .then(response => response.text())
    .then(text => console.log(text))
  }, []);

  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default App;
