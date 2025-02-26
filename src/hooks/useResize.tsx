import { useEffect, useState } from 'react';

// Default screen width breakpoints
const SMALL_SCREEN_WIDTH = 425;
const MEDIUM_SCREEN_WIDTH = 1024;

// Device type identifiers
const SMALL_SCREEN = 1;
const MEDIUM_SCREEN = 2;
const LARGE_SCREEN = 3;

const DEBOUNCE_TIME = 200;

// Function to determine the device type
const getDeviceType = (width: number) => {
    if (width <= SMALL_SCREEN_WIDTH) return SMALL_SCREEN;
    if (width <= MEDIUM_SCREEN_WIDTH) return MEDIUM_SCREEN;
    return LARGE_SCREEN;
};

// Define the return type of the hook
export interface ResizeState {
    size: number;
    deviceType: number;
}

// Custom hook for window resize handling
const useResize = (): ResizeState => {
    const [deviceSize, setDeviceSize] = useState<ResizeState>({
        size: window.innerWidth,
        deviceType: getDeviceType(window.innerWidth),
    });

    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;

        const updateDeviceSize = () => {
            const width = window.innerWidth;
            setDeviceSize({
                size: width,
                deviceType: getDeviceType(width),
            });
        };

        const handleResize = () => {
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(updateDeviceSize, DEBOUNCE_TIME);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (timerId) clearTimeout(timerId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return deviceSize;
};

export default useResize;
