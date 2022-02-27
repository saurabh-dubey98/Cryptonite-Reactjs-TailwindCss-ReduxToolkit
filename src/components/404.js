import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const clear = setTimeout(() => navigate('/'), 4000)
        return () => {
            clearTimeout(clear);
        }
    }, [navigate])

    return <div>Error 404</div>;
};

export default PageNotFound;
