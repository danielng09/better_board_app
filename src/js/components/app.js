require('../../css/app.css')
import React from 'react';
import PostingIndex from './postingIndex';

export default class App extends React.Component {
  render () {
    console.log('render App component');

    return (
      <div id="mainApp">
        <h1>Better Board</h1>
        <PostingIndex />
      </div>
    )
  }
}