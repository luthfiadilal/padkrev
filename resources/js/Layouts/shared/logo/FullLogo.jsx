import axios from 'axios';
import { useEffect, useState } from 'react';

const FullLogo = () => {
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        axios
            .get('/api/elemen/Logo')
            .then((response) => {
                setLogo(response.data);
            })
            .catch((error) => {
                console.error('Error loading logo:', error);
            });
    }, []);
    return (
        <div className="flex h-[60px] items-center justify-center">
            {logo && (
                <img
                    src={logo.image_url}
                    alt={logo.name}
                    onError={(e) => {
                        e.target.src = '/fallback-logo.png';
                    }}
                />
            )}
        </div>
    );
};

export default FullLogo;
