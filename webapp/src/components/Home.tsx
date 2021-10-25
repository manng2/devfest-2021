import React from 'react';
import IPage from '../types/pages';
import DragAndDrop from './DragAndDrop';
import Library from './Library';
import '../styles/Home.scss';

const HomePage: React.FunctionComponent<IPage> = props => {
  return (
    <div className="Home" id="home">
      <div className="position-relative">
        <Library></Library>
        <DragAndDrop></DragAndDrop>
      </div>
    </div>
  )
}

export default HomePage;
