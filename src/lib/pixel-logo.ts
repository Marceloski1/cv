import logos from '../data/pixel-logos.json';

const GRID = 16;

interface PixelLogoDefinition {
  palette: Record<string, string>;
  map: string[];
}

export type PixelLogoName = keyof typeof logos;

export type PixelPalette = Record<string, string>;

const registry = logos as Record<string, PixelLogoDefinition>;

export const pixelLogoNames = Object.keys(registry) as PixelLogoName[];

export function compilePixelPaths(definition: PixelLogoDefinition, overrides?: PixelPalette): string {
  const palette = { ...definition.palette, ...overrides };
  const byColor = new Map<string, string[]>();

  definition.map.forEach((row, y) => {
    if (row.length !== GRID) {
      throw new Error(`pixel row ${y} is ${row.length} wide, expected ${GRID}`);
    }
    let x = 0;
    while (x < GRID) {
      const char = row[x];
      if (char === '.') {
        x += 1;
        continue;
      }
      const color = palette[char];
      if (!color) {
        throw new Error(`no color mapped for "${char}"`);
      }
      let run = 1;
      while (x + run < GRID && row[x + run] === char) {
        run += 1;
      }
      const segments = byColor.get(color) ?? [];
      segments.push(`M${x} ${y}h${run}v1h-${run}z`);
      byColor.set(color, segments);
      x += run;
    }
  });

  return [...byColor.entries()]
    .map(([color, segments]) => `<path fill="${color}" d="${segments.join('')}"/>`)
    .join('');
}

export function renderPixelLogo(name: PixelLogoName, size = GRID, overrides?: PixelPalette): string {
  const definition = registry[name];
  if (!definition) {
    throw new Error(`unknown pixel logo: ${String(name)}`);
  }
  const paths = compilePixelPaths(definition, overrides);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${GRID} ${GRID}" shape-rendering="crispEdges" focusable="false">${paths}</svg>`;
}
