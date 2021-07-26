import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import './App.css';
import { areEqual } from 'react-window'
import { useWindowSize } from "./hooks/getCurrentWindowSize";

export default memo(function ListRow({ item, setRowSize, onAction, index, style }) {
    const root = useRef();
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        setRowSize(index, root.current.getBoundingClientRect().height);
    }, [windowWidth]);

    return (
        <div
            style={style}
            className={"cell"}
        >
            <div
                onClick={() => onAction(index)}
                className={"card"}
                ref={root}
            >
                {item.label} is {item.isActive ? 'active' : 'inactive'}
            </div>
        </div>
    );
}, areEqual);