import './index.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import ErrorPage from './components/ErrorPage';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

function App() {
  // // Testing if the server is accepting any requests or not
  // useEffect(()=>{
  //   fetch('/api')
  //   .then(response => response.text())
  //   .then(text => console.log(text))
  // }, []);
  const router = createBrowserRouter([
    {
      path: '/', 
      element: <LoginPage />, 
      
    }, 
    {
      path: '/:userId/home',
      element: <HomePage />,
    }, 
    {
      path: '/:adminId/admin', 
      element: <AdminPage />
    }
  ])  

  return (
    <RouterProvider router={router} errorElement={<div>This is the error Page</div>}/>
  );
}

export default App;
