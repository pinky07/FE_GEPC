import React from 'react';

import './styles/app.css';
import 'react-contexify/dist/ReactContexify.min.css'
import 'react-table/react-table.css';
import './styles/allocationGrid.css';
import './styles/allocationTree.css';
import './styles/content.css';
import './styles/header.css';

import Header from './components/header';
import Content from './components/content';



class App extends React.Component {
 
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
