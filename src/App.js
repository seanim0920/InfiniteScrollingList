import React from 'react';
import './App.css';
import List from './DynamicallySizedList'

function randomDate(start, end) {
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.getTime();
  }

const App = ({ height, width }) => {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        let initialItems = Array(1000)
            .fill(true)
            .map(_ => ({
                author: {
                    name: Math.random()
                    .toString(36)
                    .substr(2)
                    .repeat(Math.ceil(Math.random() * 10)),
                    photoUrl: "https://picsum.photos/200",
                },
                updated: randomDate(new Date(2020, 0, 1), new Date()),
                content: (Math.random()
                    .toString(36)
                    .substr(2) + " ")
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