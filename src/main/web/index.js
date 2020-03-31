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
                <h1>React Starter</h1>
                <p>This is a simple template for a React web app.</p>
            </div>
        );
    }
}

ReactDOM.render(<MainApp />, document.getElementById('react'));