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
      children: [
        {
          path: 'pastries',
          element: <CategoryItems searchParam='Fresh Cream Pastries' />
        },
        {
          path: 'pasta-and-pizza',
          element: <CategoryItems searchParam='Baked Pasta & Pizza' />
        },
        {
          path: 'sandwiches-and-burgers',
          element: <CategoryItems searchParam='Sandwiches & Pizza' />
        },
        {
          path: 'starters-and-quickbites',
          element: <CategoryItems searchParam='Quickbites' />
        },
        {
          path: 'main-course',
          element: <CategoryItems searchParam='Main Course' />
        },
        {
          path: 'beverages',
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
