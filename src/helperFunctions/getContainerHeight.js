import React, { useRef, useLayoutEffect, useState, useCallback, memo, useEffect } from 'react';
import { useWindowSize } from "./getCurrentWindowSize";

export const ListHeightCalculator = ({children}) => {
    const [windowWidth, windowHeight] = useWindowSize();
    const [containerHeight, setContainerHeight] = useState(0);
    const [rootElement, setRootElement] = useState(null);

    useLayoutEffect(() => {
        setContainerHeight(0);
    }, [windowHeight])

    useLayoutEffect(() => {
        if (rootElement) setContainerHeight(rootElement.getBoundingClientRect().height);
    }, [rootElement, containerHeight])

    const getRootElement = useCallback((element) => {if (element) setRootElement(element.parentNode)}, [])

    return <div ref={getRootElement}>{children(containerHeight)}</div>
};