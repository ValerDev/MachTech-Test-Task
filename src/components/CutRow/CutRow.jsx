import { useState } from 'react';
import s from './CutRow.module.scss';

const CutRow = ({ cut: { width, height, quantity, index }, editCut, deleteCut }) => {
    const [heightForEdit, setHeightForEdit] = useState(height);
    const [widthForEdit, setWidthForEdit] = useState(width);
    const [quantityForEdit, setQuantityForEdit] = useState(quantity);
    const [error, setError] = useState('');

    const handleRotate = (index, rotatedElement) => {
        editCut(index, rotatedElement)
        setHeightForEdit(rotatedElement.height);
        setWidthForEdit(rotatedElement.width);
    }

    const handleEdit = () => {
        if (!heightForEdit || !widthForEdit || !quantityForEdit) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 1000);
            return;
        }

        if (parseFloat(heightForEdit) <= 0 || parseFloat(widthForEdit) <= 0 || parseInt(quantityForEdit) <= 0) {
            setError('Please enter positive values for height, width, and quantity.');
            setTimeout(() => setError(''), 1000);
            return;
        }

        editCut(index, {
            height: +heightForEdit,
            width: +widthForEdit,
            quantity: +quantityForEdit,
        })
    }

    const handleHeightForEdit = (e) => {
        setError('')
        if (e.target.value > 3630 || widthForEdit > 1860) {
            setError('The piece(s) is outside the board')
        }
        setHeightForEdit(e.target.value);
    }

    const handleWidthForEdit = (e) => {
        setError('')
        if (e.target.value > 1860 || heightForEdit > 3630) {
            setError('The piece(s) is outside the board')
        };
        
        setWidthForEdit(e.target.value);
    }

    return <>
        <div key={index} className={s.cut}>
            <div className={s.cutRow}>
                <input
                    type="number"
                    placeholder="Height (mm)"
                    value={heightForEdit}
                    onChange={handleHeightForEdit}
                />
                <input
                    type="number"
                    placeholder="Width (mm)"
                    value={widthForEdit}
                    onChange={handleWidthForEdit}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantityForEdit}
                    onChange={(e) => setQuantityForEdit(e.target.value)}
                />
            </div>
            <button onClick={handleEdit} style={error ? { opacity: '.6', pointerEvents: 'none' } : {}}>Edit</button>
            <button onClick={() => deleteCut(index)}>Delete</button>
            <button onClick={() => handleRotate(index, {
                height: +widthForEdit,
                width: +heightForEdit,
                quantity: +quantityForEdit,
            })} style={heightForEdit > 1830 || error ? { opacity: '.6', pointerEvents: 'none' } : {}}>↻</button>
        </div>
        {error && <p className={s.error}>🔴 {error}</p>}
    </>
}

export default CutRow;
