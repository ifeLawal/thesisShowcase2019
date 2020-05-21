import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-snapshot';
// import './main.js'
import './shuffle.scss';
import './bootstrap.min.css';
import './project.scss';

import Animalpage from './animalPage.js';
import ProjectMap from './projectMap.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Animalpage />
    </React.StrictMode>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
