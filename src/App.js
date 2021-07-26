import React from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'

const Row = React.memo(({ data, index, style }) => {
    // Data passed to List as "itemData" is available as props.data
    const { items, toggleItemActive } = data;
    const item = items[index];

    return (
        <div
            onClick={() => toggleItemActive(index)}
            className={"box"}
            style={style}
        >
            <div
                className={"card"}
            >
                {item.label} is {item.isActive ? 'active' : 'inactive'}
            </div>
        </div>
    );
}, areEqual);

const App = ({ height, width }) => {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        let initialItems = Array(1000)
            .fill(true)
            .map(_ => ({
                isActive: false,
                label: Math.random()
                    .toString(36)
                    .substr(2)
                    .repeat(Math.ceil(Math.random() * 10)),
            }));

        setItems(initialItems);
    }, []);

    const toggleItemActive = index => {
        let newitems = [...items];

        const item = newitems[index];
        newitems[index] = {
            ...item,
            isActive: !item.isActive,
        };

        setItems(newitems);
    }

    return (
        <List
            height={height}
            width={width / 3}
            itemCount={items.length}
            itemData={{ items, toggleItemActive }}
            itemSize={index => {
                return //some function that takes width, items[index].label.length and line-height
            }}
        >
            {Row}
        </List>
    );
};

export default App;