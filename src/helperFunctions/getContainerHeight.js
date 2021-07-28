import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import { useWindowSize } from "./getCurrentWindowSize";

const rootElement = document.getElementById('root');
const heightMeasurer = document.createElement('div');
heightMeasurer.style.visibility = "hidden";
heightMeasurer.style.height = "100%";
rootElement.prepend(heightMeasurer);

export const getContainerHeight = () => {
    const [windowWidth, windowHeight] = useWindowSize();
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        setContainerHeight(0);
    }, [windowHeight])

    useEffect(() => {
        setContainerHeight(rootElement.getBoundingClientRect().height);
    }, [containerHeight])

    return containerHeight;
};