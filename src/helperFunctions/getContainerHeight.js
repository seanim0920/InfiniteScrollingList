import React, { useRef, useEffect, useLayoutEffect, useState, useCallback, memo } from 'react';
import ReactDOM from 'react-dom';
import { useWindowSize } from "./getCurrentWindowSize";

export const getContainerHeight = () => {
    const [windowWidth, windowHeight] = useWindowSize();
    const [containerHeight, setContainerHeight] = useState(0);
    const rootElement = ReactDOM.findDOMNode(this);

    useLayoutEffect(() => {
        const heightMeasurer = document.createElement('div');
        heightMeasurer.style.visibility = "hidden";
        heightMeasurer.style.height = "100%";
        rootElement.prepend(heightMeasurer);
    }, [])

    useEffect(() => {
        setContainerHeight(0);
    }, [windowHeight])

    useEffect(() => {
        setContainerHeight(rootElement.getBoundingClientRect().height);
    }, [containerHeight])

    return containerHeight;
};