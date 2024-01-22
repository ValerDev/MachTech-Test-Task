import React, { useState } from 'react';
import s from './Tools.module.scss';
import CutRow from '../CutRow/CutRow';

function Tools({ cuts, onAddCut, editCut, deleteCut }) {
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');


  const handleAddCut = () => {
    if (!height || !width || !quantity) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 1000);
      return;
    }

    if (parseFloat(height) <= 0 || parseFloat(width) <= 0 || parseInt(quantity) <= 0) {
      setError('Please enter positive values for height, width, and quantity.');
      setTimeout(() => setError(''), 1000);
      return;
    }

    const newCut = {
      height: parseFloat(height),
      width: parseFloat(width),
      quantity: parseInt(quantity),
    };
    onAddCut(newCut, !!warning);

    setHeight('');
    setWidth('');
    setQuantity('');
    setError('');
    setWarning('');
  };


  const handleHeightChange = (e) => {
    setWarning('')
    setError('')
    if (e.target.value > 3630 || (width > 1830 && e.target.value > 1830) || width > 3630) {
      setWarning('')
      setError('The piece(s) is outside the board')
    }
    else if (width > 1830 && e.target.value < 3630) {
      setWarning('The piece(s) will be rotated');
    }
    setHeight(e.target.value);
  }

  const handleWidthChange = (e) => {
    setWarning('')
    setError('')
    if (e.target.value > 1830) {
      setWarning('The piece(s) will be rotated');
      if (height > 1830 || e.target.value > 3630) {
        setWarning('')
        setError('The piece(s) is outside the board')
      }
    };
    if (height > 3630) {
      setWarning('')
      setError('The piece(s) is outside the board')
    }
    setWidth(e.target.value)
  }

  return (
    <div className={s.tools}>
      <div className={s.addCut}>
        <input
          type="number"
          placeholder="Height (mm)"
          value={height}
          onChange={handleHeightChange}
        />
        <input
          type="number"
          placeholder="Width (mm)"
          value={width}
          onChange={handleWidthChange}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className={s.tool}>
        {error && <p className={s.error}>🔴 {error}</p>}
        {warning && <p className={s.warning}>⚠️ {warning}</p>}
        <button onClick={handleAddCut} style={error ? { opacity: '.6', pointerEvents: 'none' } : {}}>Add Cut</button>
      </div>

      {cuts.map((cut, index) => (
        <CutRow key={index} cut={{ index, ...cut }} editCut={editCut} deleteCut={deleteCut} />
      ))}
    </div>
  );
}

export default Tools;
