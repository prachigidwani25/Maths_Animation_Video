export const GRID = {
  width: 1920,
  height: 1080,
  marginX: 96,
  marginY: 64,
  columns: 12,
  columnWidth: 120,
  gutter: 24,
  baseline: 8,
};

// Compute X coordinate for a specific column index (0 to 11)
export const getColumnX = (colIndex: number): number => {
  return GRID.marginX + colIndex * (GRID.columnWidth + GRID.gutter);
};

// Compute width spanning multiple columns
export const getColumnSpan = (span: number): number => {
  return span * GRID.columnWidth + (span - 1) * GRID.gutter;
};
