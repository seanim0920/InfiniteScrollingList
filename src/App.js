import React from 'react';
import './App.css';
import { FlatList } from 'react-native'

const Row = React.memo(({ item }) => {
    return (
        <div
            onClick={() => toggleItemActive(index)}
            style={style}
        >
            {item.label} is {item.isActive ? 'active' : 'inactive'}
        </div>
    );
}, areEqual);

const App = ({height, width}) => {
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
        <FlatList
            renderItem={Row}
        />
    );
};

export default App;