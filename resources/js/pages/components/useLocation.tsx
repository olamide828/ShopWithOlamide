import React, { useEffect, useState } from 'react';

interface GeolocationCoords {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
}

const useLocation = () => {
    const [location, setLocation] = useState<GeolocationCoordinates | null>(
        null,
    );
    const [error, setError] = useState<GeolocationPositionError | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => setLocation(position.coords),
            (error) => setError(error),
        );
    }, []);

    return { location, error };
};

export default useLocation;
