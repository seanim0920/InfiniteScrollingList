import React from 'react';
import './App.css';
import List from './DynamicallySizedList'

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
            containerHeight={height}
            containerWidth={width}
            items={items}
            onAction={toggleItemActive}
        />
    );
};

export default App;