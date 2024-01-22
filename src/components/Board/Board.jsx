// Board.js
import React from 'react';
import s from './Board.module.scss';

function Board({ cuts }) {
    const generateCutPieces = () => {
        let allCutPieces = [];
        let currentLeft = 0;
        let currentTop = 0;
        let boards = [];

        const sortedCuts = cuts.slice().sort((a, b) => b.height - a.height);

        sortedCuts.forEach((cut, cutIndex) => {
            for (let i = 0; i < cut.quantity; i++) {
                if (currentLeft + cut.width > 1830) {
                    currentLeft = 0;
                    currentTop += cut.height;
                }

                if (currentTop + cut.height > 3630) {

                    boards.push(
                        <div key={`board_${boards.length}`} className={s.boardVisualization}>
                            {allCutPieces}
                        </div>
                    );
                    currentLeft = 0;
                    currentTop = 0;
                    allCutPieces = [];
                }

                while (currentTop < 3630 && !isPositionValid(allCutPieces, currentLeft, currentTop, cut.width, cut.height)) {
                    currentLeft += 1;
                    if (currentLeft + cut.width > 1830) {
                        currentLeft = 0;
                        currentTop += 1;
                    }
                }

                const isSmall = cut.width < 50 && cut.height < 50;
                const style = {
                    left: `${currentLeft}px`,
                    top: `${currentTop}px`,
                    width: `${cut.width}px`,
                    height: `${cut.height}px`,
                    fontSize: isSmall ? '6px' : '12px',
                };

                allCutPieces.push(
                    <div key={`${cutIndex}_${i}`} className={s.cutPiece} style={style}>
                        {isSmall ? `${cut.width} x ${cut.height}` : `Cut ${cutIndex + 1}:\n ${cut.width} x ${cut.height} mm`}
                    </div>
                );

                currentLeft += cut.width;
            }
        });

        boards.push(
            <div key={`board_${boards.length}`} className={s.boardVisualization}>
                {allCutPieces}
            </div>
        );

        return boards;
    };

    const isPositionValid = (pieces, left, top, width, height) => {
        return !pieces.some(piece => {
            const pieceLeft = parseInt(piece.props.style.left, 10);
            const pieceTop = parseInt(piece.props.style.top, 10);
            const pieceWidth = parseInt(piece.props.style.width, 10);
            const pieceHeight = parseInt(piece.props.style.height, 10);

            return (
                left < pieceLeft + pieceWidth &&
                left + width > pieceLeft &&
                top < pieceTop + pieceHeight &&
                top + height > pieceTop
            );
        });
    };

    return (
        <div className={s.board}>
            {cuts.length > 0 && generateCutPieces()}
            <span>{'1830 x 3630 (mm)'}</span>
            {cuts.length === 0 && (
                <div className={s.boardVisualization}>
                </div>
            )}
        </div>
    );
}

export default Board;
