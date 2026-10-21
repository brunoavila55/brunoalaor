import type { CSSProperties, PropsWithChildren, ComponentType } from "react";
type MagnetProps = PropsWithChildren<{
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  maxOffset?: number;
  exclusive?: boolean;
  axis?: "both" | "x" | "y";
  tilt?: number;
  scale?: number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  onActiveChange?: (active: boolean) => void;
  wrapperClassName?: string;
  innerClassName?: string;
  style?: CSSProperties;
}>;
declare const Magnet: ComponentType<MagnetProps>;
export default Magnet;
