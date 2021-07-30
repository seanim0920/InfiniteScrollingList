import React, { useRef, useLayoutEffect, useState, useCallback, memo, useEffect } from 'react';
import { useWindowSize } from "helperFunctions/getCurrentWindowSize";
import PropTypes from 'prop-types'; 

//calculates the height of the containing element and passes it to the children

const ContainerHeightCalculator = ({children}) => {
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

ContainerHeightCalculator.propTypes = {
    children: PropTypes.func.isRequired
}

export { ContainerHeightCalculator };