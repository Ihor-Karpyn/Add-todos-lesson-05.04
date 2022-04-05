export interface Color {
  id: number;
  name: string;
}

export interface GoodWithoutColor {
  id: number;
  name: string;
  colorId: number;
}

export interface FullGood extends GoodWithoutColor {
  color?: Color;
}
