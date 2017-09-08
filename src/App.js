import React from 'react';

import 'react-contexify/dist/ReactContexify.min.css'
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import './styles/css/app.css';

import Header from './components/header';
import Content from './components/content';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
