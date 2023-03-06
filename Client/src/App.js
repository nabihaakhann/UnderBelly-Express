import './index.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage/AdminPage';
import ErrorPage from './components/ErrorPage';
import CategoryItems from './components/CategoryItems';
import Search from './components/Search';

import {createBrowserRouter, RouterProvider, useParams} from 'react-router-dom';

function App() {
  const {searchQuery} = useParams();

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
        },
        {
          path: 'search/:searchQuery',
          element: <Search searchQuery={searchQuery}/>
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
