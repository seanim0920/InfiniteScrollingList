import React from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'

// These row heights are arbitrary.
// Yours should be based on the content of the row.
const rowHeights = new Array(1000)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = index => rowHeights[index];

const Row = React.memo(({ data, index, style }) => {
    // Data passed to List as "itemData" is available as props.data
    const { items, toggleItemActive } = data;
    const item = items[index];

    return (
        <div
            onClick={() => toggleItemActive(index)}
            style={style}
        >
            {item.label} is {item.isActive ? 'active' : 'inactive'}
        </div>
    );
}, areEqual);

const App = () => {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        let initialItems = Array(1000)
        .fill(true)
        .map(_ => ({
            isActive: false,
            label: Math.random()
                .toString(36)
                .substr(2),
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
            height={1000}
            width={1000}
            itemCount={items.length}
            itemData={{ items, toggleItemActive }}
            itemSize={getItemSize}
        >
            {Row}
        </List>
    );
};

export default App;