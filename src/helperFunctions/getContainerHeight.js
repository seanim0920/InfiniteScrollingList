import React, { useRef, useLayoutEffect, useState, useCallback, memo, useEffect } from 'react';
import { useWindowSize } from "./getCurrentWindowSize";

export const ListHeightCalculator = ({children}) => {
    const containerRef = useRef();
    const [windowWidth, windowHeight] = useWindowSize();
    const [containerHeight, setContainerHeight] = useState(0);
    const [rootElement, setRootElement] = useState(null);
    
    useLayoutEffect(() => {
        setRootElement(containerRef.current.parentNode);
    }, [])

    useLayoutEffect(() => {
        setContainerHeight(0);
    }, [windowHeight])

    useLayoutEffect(() => {
        if (rootElement) setContainerHeight(rootElement.getBoundingClientRect().height);
    }, [rootElement, containerHeight])

    return <div ref={containerRef}>{children(containerHeight)}</div>
};