import React from 'react';
import s from './Board.module.scss';

function Board({ cuts }) {

    const generateCutPieces = () => {
        let allCutPieces = [];
        let currentLeft = 0;
        let currentTop = 0;
        let boards = [];

        cuts.forEach((cut, cutIndex) => {
            for (let i = 0; i < cut.quantity; i++) {

                if (currentLeft + cut.width > 1830 || currentTop + cut.height > 3630) {

                    boards.push(
                        <div key={`board_${boards.length}`} className={s.boardVisualization}>
                            {allCutPieces}
                        </div>
                    );

                    currentLeft = 0;
                    currentTop = 0;
                    allCutPieces = [];
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

                currentLeft += +cut.width;
                if (currentLeft + cut.width > 1830) {
                    currentLeft = 0;
                    currentTop += +cut.height;
                }
            }
        });

        boards.push(
            <div key={`board_${boards.length}`} className={s.boardVisualization}>
                {allCutPieces}
            </div>
        );

        return boards;
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
