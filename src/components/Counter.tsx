import {FC, useState} from 'react';
import classes from './Counter.module.scss'

export const Counter: FC = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div className={classes.button}>
            <h3>{counter}</h3>
            <button onClick={() => setCounter(prevState => prevState + 1)}>Add</button>
        </div>
    );
};
