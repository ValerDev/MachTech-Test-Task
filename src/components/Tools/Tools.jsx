import React, { useState } from 'react';
import s from './Tools.module.scss';
import CutRow from '../CutRow/CutRow';

function Tools({ cuts, onAddCut, editCut, deleteCut }) {
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');


  const handleAddCut = () => {
    // Input validation
    if (!height || !width || !quantity) {
      setError('Please fill in all fields.');
      return;
    }

    if (parseFloat(height) <= 0 || parseFloat(width) <= 0 || parseInt(quantity) <= 0) {
      setError('Please enter positive values for height, width, and quantity.');
      return;
    }

    const newCut = {
      height: parseFloat(height),
      width: parseFloat(width),
      quantity: parseInt(quantity),
    };

    onAddCut(newCut);

    setHeight('');
    setWidth('');
    setQuantity('');
    setError('');
  };

  return (
    <div className={s.tools}>
      <div className={s.addCut}>
        <input
          type="number"
          placeholder="Height (mm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Width (mm)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className={s.tool}>
        {error && <p className={s.error}>{error}</p>}
        <button onClick={handleAddCut}>Add Cut</button>
      </div>

      {cuts.map((cut, index) => (
        <CutRow key={index} cut={{ index, ...cut }} editCut={editCut} deleteCut={deleteCut} />
      ))}
    </div>
  );
}

export default Tools;
