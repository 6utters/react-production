import {FC, useState} from 'react';

export const Component: FC = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <h3>{counter}</h3>
            <button onClick={() => setCounter(prevState => prevState + 1)}>Add</button>
        </div>
    );
};
