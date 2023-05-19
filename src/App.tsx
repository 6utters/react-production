import {FC} from 'react';
import {Counter} from "./components/Counter";
import './index.scss'

export const App: FC = () => {
    return (
        <div className='app'>
            Random Text
            <Counter />
        </div>
    );
};

