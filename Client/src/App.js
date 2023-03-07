import './index.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage/AdminPage';
import ErrorPage from './components/ErrorPage';
import CategoryItems from './components/CategoryItems';
import ContactPage from './components/Contacts';
import AllItemsPage from './components/AdminPage/AllItemsPage';

import {createBrowserRouter, RouterProvider, useParams} from 'react-router-dom';
import Search from './components/AdminPage/Search';

function App() {

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
        
        // {
        //   path: `/${userId}/search/${searchQuery}`,
        //   element: <Search searchQuery={searchQuery}/>
        // }
      ]
    }, 
    {
      path: '/:userId/Pastries',
      element: <CategoryItems searchParam='Pastries' />
    },
    {
      path: '/:userId/Pasta and Pizza',
      element: <CategoryItems searchParam='Pasta & Pizza' />
    },
    {
      path: '/:userId/Sandwiches and Burgers',
      element: <CategoryItems searchParam='Sandwiches & Burgers' />
    },
    {
      path: '/:userId/Starters',
      element: <CategoryItems searchParam='Starters' />
    },
    {
      path: '/:userId/Main Course',
      element: <CategoryItems searchParam='Main Course' />
    },
    {
      path: '/:userId/Beverages',
      element: <CategoryItems searchParam='Beverages' />
    },
    {
      path: '/:adminId/admin', 
      element: <AdminPage />
    },
    {
      path: '/:admin/allItems', 
      element: <AllItemsPage />
    },
    {
      path: '/:userId/contact',
      element: <ContactPage />
    }, 
    {
      path: '/:userId/search/:searchQuery', 
      element: <CategoryItems />
    }
  ])  

  return (
    <RouterProvider router={router} errorElement={<div>This is the error Page</div>}/>
  );
}

export default App;
