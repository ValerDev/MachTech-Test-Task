import React, { useState } from 'react';
import Board from './components/Board/Board';
import Tools from './components/Tools/Tools';
import s from './App.module.scss';

function App() {
  const [cuts, setCuts] = useState([]);

  const addCut = (cut, isRotated) => {
    if(isRotated) [cut.width, cut.height] = [cut.height, cut.width];
    setCuts([...cuts, cut]);
  };

  const editCut = (index, newCut) => {
    const updatedCuts = [...cuts];
    updatedCuts[index] = newCut;
    setCuts(updatedCuts);
  };

  const deleteCut = (index) => {
    const updatedCuts = [...cuts];
    updatedCuts.splice(index, 1);
    setCuts(updatedCuts);
  };

  return (
    <div className={s.app}>
      <div className={s.content}>
        <Tools onAddCut={addCut} cuts={cuts} editCut={editCut} deleteCut={deleteCut} />
        <Board cuts={cuts} />
      </div>
    </div>
  );
}

export default App;
