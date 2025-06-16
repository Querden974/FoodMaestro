import {useEffect, useState} from "react";

function useThrottle<T>(value: T, delay = 500): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const [lastRun, setLastRun] = useState<number>(Date.now());

    useEffect(() => {
        const now = Date.now();
        if (now - lastRun >= delay) {
            setThrottledValue(value);
            setLastRun(now);
        }
    }, [value, delay, lastRun]);

    return throttledValue;
}