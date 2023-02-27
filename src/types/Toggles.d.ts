export type ActiveToggleType = number | null;
export type HandleToggleType = (index: number) => void;
export type HandleKeyDownType = (
  event: React.KeyboardEvent<HTMLElement>,
  index: number
) => void;
