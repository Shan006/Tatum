import React from 'react'
import ReactDOM from 'react-dom/client'
import CreateNFTCol from './pages/createNFTCol';
import CheckNFTOwner from './pages/CheckNFTOwner';
import NotFound from './pages/NotFound';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
// import NFTLayers from './pages/NFTLayers';
import NewLayer from './pages/NewLayer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateNFTCol />,
  },
  {
    path: "/check",
    element: <CheckNFTOwner />,
  },
  {
    path: "/layers",
    element: <NewLayer />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
