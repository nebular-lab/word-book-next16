type Props = {
  children: React.ReactNode;
  className?: string;
};
export const H1 = ({ children, className }: Props) => {
  return <h1 className={`text-3xl font-semibold ${className}`}>{children}</h1>;
};
