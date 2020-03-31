import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MainApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img class={'logo'} src={'/icons/favicon-512.png'} alt={'React Starter logo'}/>
                <h1 className={'title'}>React Starter</h1>
                <p>This is a simple template for a React web app. <a href={'https://github.com/tommymcglynn/react-starter'}>View project on GitHub</a>.</p>
            </div>
        );
    }
}

ReactDOM.render(<MainApp />, document.getElementById('react'));