// Constants for board and card dimensions
export const BOARD_WIDTH_DESKTOP = 1920;
export const BOARD_HEIGHT_DESKTOP = 1080;
export const BOARD_WIDTH_MOBILE = 350;
export const BOARD_HEIGHT_MOBILE = 600;
export const CARD_WIDTH_DESKTOP = 380; // เพิ่มขึ้นจาก 340
export const CARD_HEIGHT_DESKTOP = 240; // เพิ่มขึ้นจาก 210
export const CARD_WIDTH_MOBILE = 320; // เพิ่มขึ้นจาก 280
export const CARD_HEIGHT_MOBILE = 200; // เพิ่มขึ้นจาก 180

export const BREAKPOINTS = {
  MOBILE: 768,
} as const;

export const LAYOUT_MARGINS = {
  DESKTOP: 60,
  MOBILE: 20,
} as const;

export const POSITIONING = {
  MIN_DISTANCE_DESKTOP: 100,
  MIN_DISTANCE_MOBILE: 60,
  MAX_ATTEMPTS_DESKTOP: 40,
  MAX_ATTEMPTS_MOBILE: 20,
  CLUSTER_PROBABILITY: 0.3,
  CLUSTER_DISTANCE_BASE: 120,
  CLUSTER_DISTANCE_RANDOM: 80,
} as const;

export const ANIMATIONS = {
  DEBOUNCE_DELAY: 300,
  SEARCH_DELAY: 300,
} as const;
