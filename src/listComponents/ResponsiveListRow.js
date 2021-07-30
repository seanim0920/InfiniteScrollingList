import React, { useRef, useEffect, memo } from 'react';
import { areEqual } from 'react-window'
import { useWindowSize } from "helperFunctions/getCurrentWindowSize";
import PropTypes from 'prop-types'; 

//used in the dynamicallysizedlist to measure the contents of the row

function ListRow({ itemExists, setRowSize, index, style, children }) {
    const cellContainer = useRef();
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        if (itemExists) setRowSize(index, cellContainer.current.getBoundingClientRect().height);
    }, [windowWidth, itemExists]);

    return ( //the outer div applies a placeholder style, while the inner div measures the exact size of the cell
        <div
            style={style}
            className={"Item"}
        >
            {
                itemExists ?
                    <div
                        ref={cellContainer}
                    >
                        {
                            children
                        }
                    </div>
                    : <h2>
                        Loading...
                    </h2>
            }
        </div>
    );
};

ListRow.propTypes = {
    itemExists: PropTypes.bool.isRequired,
    setRowSize: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
}

export const ResponsiveListRow = memo(ListRow, areEqual);