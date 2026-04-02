import React, { useEffect, useState } from 'react';

const LocationComponent = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon${longitude}&addressdetails=1`,
                )
                    .then((response) => response.json())
                    .then((data) => setAddress(data.display_name))
                    .catch((error) => setError('Failed to fetch address'));
            },
            (error) => setError(error.message),
        );
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!address) return <p>Loading...</p>;

};

export default LocationComponent;
