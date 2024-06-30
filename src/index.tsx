import React from 'react';
import {createRoot} from 'react-dom/client';
import { App } from './Components/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';

const root = createRoot(
    document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([{ path: '*', Component: App }]);
root.render(<RouterProvider router={router} />);
