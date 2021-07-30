import React, { useRef, useEffect, useState, memo } from 'react';
import { areEqual } from 'react-window'
import { useWindowSize } from "helperFunctions/getCurrentWindowSize";

export default memo(function ResponsiveListRow({ item, setRowSize, index, style, changeList, children }) {
    const outerContainer = useRef();
    const cellContainer = useRef();
    const [windowWidth] = useWindowSize();
    const [collapseTransition, setCollapseTransition] = useState("none");

    useEffect(() => {
        if (item) setRowSize(index, cellContainer.current.getBoundingClientRect().height); //need to tell the list to resize us and send our new height
    }, [windowWidth, item]);

    const removeItem = (transition) => {
        if (transition) {
            console.log("removing item!")
            setCollapseTransition(transition);
        }
        else
            changeList(array => {
                array.splice(index, 1);
                return array;
            });
    }

    useEffect(() => {
        if (collapseTransition != "none") {
            if (collapseTransition !== undefined) {
                console.log("collapse transition is set" + collapseTransition);
                setTimeout(() => {
                    setRowSize(index, 1);
                }, 3000)
            } else {
                console.log("removing item");
                changeList(array => {
                    array.splice(index, 1);
                    return array;
                });
            }
        }
    }, [collapseTransition]);

    return ( //the outer div applies a placeholder style, while the inner div measures the exact size of the cell
        collapseTransition != "none" ?
            <div
                style={{ ...style, transition: collapseTransition, backgroundColor: "red" }}
                ref={outerContainer}
            >
                {
                    item ?
                        <div
                            ref={cellContainer}
                        >
                            {//will we need item.id? probably as a key. take this part out and use it as an argument
                                children({ item, setRowSize, index, style, removeItem })
                            }
                        </div>
                        : <h2>
                            Loading...
                        </h2>
                }
            </div>
            : <div
                style={{ ...style }}
                ref={outerContainer}
            >
                {
                    item ?
                        <div
                            ref={cellContainer}
                        >
                            {//will we need item.id? probably as a key. take this part out and use it as an argument
                                children({ item, setRowSize, index, style, removeItem })
                            }
                        </div>
                        : <h2>
                            Loading...
                        </h2>
                }
            </div>
    );
}, areEqual);