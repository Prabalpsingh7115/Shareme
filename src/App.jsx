import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './container/Home'; 
import Login from './components/Login'; 
import { useEffect } from 'react';
import { fetchUser } from './utils/fetchUser';

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = fetchUser();  
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='/*' element={<Home />} />
        </Routes>
    );
};

const RootComponent = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
        <Router>
            <App />
        </Router>
    </GoogleOAuthProvider>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RootComponent />);

export default RootComponent;
