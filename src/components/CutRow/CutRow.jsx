import { useState } from 'react';
import s from './CutRow.module.scss';

const CutRow = ({ cut: { width, height, quantity, index }, editCut, deleteCut }) => {
    const [heightForEdit, setHeightForEdit] = useState(height);
    const [widthForEdit, setWidthForEdit] = useState(width);
    const [quantityForEdit, setQuantityForEdit] = useState(quantity);

    return <div key={index} className={s.cut}>
        <div className={s.cutRow}>
            <input
                type="number"
                placeholder="Height (mm)"
                value={heightForEdit}
                onChange={(e) => setHeightForEdit(e.target.value)}
            />
            <input
                type="number"
                placeholder="Width (mm)"
                value={widthForEdit}
                onChange={(e) => setWidthForEdit(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantityForEdit}
                onChange={(e) => setQuantityForEdit(e.target.value)}
            />
        </div>
        <button onClick={() => editCut(index, {
            height: +heightForEdit,
            width: +widthForEdit,
            quantity: +quantityForEdit,
        })}>Edit</button>
        <button onClick={() => deleteCut(index)}>Delete</button>
    </div>
}

export default CutRow;
