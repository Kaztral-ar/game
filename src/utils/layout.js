import { shuffle } from './shuffle';

export function generateLayout(count, buttonSize, playWidth, playHeight) {
  const gap = Math.max(4, Math.min(8, Math.round(buttonSize * 0.12)));
  const cellSize = buttonSize + gap;
  const maxColumns = Math.max(1, Math.floor((playWidth + gap) / cellSize));

  // Choose the fewest rows that fit horizontally while keeping every cell inside
  // the available play area. The caller supplies a button size that already fits.
  const columns = Math.min(Math.max(maxColumns, 1), count);
  const rows = Math.max(Math.ceil(count / columns), 1);

  const totalWidth = columns * cellSize - gap;
  const totalHeight = rows * cellSize - gap;
  const startX = Math.max(0, (playWidth - totalWidth) / 2);
  const startY = Math.max(0, (playHeight - totalHeight) / 2);

  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      cells.push({ row: r, col: c });
    }
  }

  return shuffle(cells).slice(0, count).map(({ row, col }) => ({
    x: startX + col * cellSize,
    y: startY + row * cellSize,
  }));
}
