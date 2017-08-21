import React from 'react';

import 'react-contexify/dist/ReactContexify.min.css'
import 'react-table/react-table.css';
import './styles/css/main.css';

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
