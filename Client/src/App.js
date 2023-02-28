import './index.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage/AdminPage';
import ErrorPage from './components/ErrorPage';
import CategoryItems from './components/CategoryItems';

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
      path: '/:userId/categories',
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'Pastries',
          element: <CategoryItems searchParam='Pastries' />
        },
        {
          path: 'Pasta and Pizza',
          element: <CategoryItems searchParam='Pasta and Pizza' />
        },
        {
          path: 'Sandwiches and Burgers',
          element: <CategoryItems searchParam='Sandwiches and Burgers' />
        },
        {
          path: 'Starters',
          element: <CategoryItems searchParam='Starters' />
        },
        {
          path: 'Main Course',
          element: <CategoryItems searchParam='Main Course' />
        },
        {
          path: 'Beverages',
          element: <CategoryItems searchParam='Beverages' />
        }
      ]
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
