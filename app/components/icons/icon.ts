export type IconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
  fill?: string;
};
export type Icon = (props: IconProps) => React.ReactNode;
