type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className = "", id }: Props) {
  return (
    <section
      id={id}
      className={
        "relative z-10 max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-12 " + className
      }
    >
      {children}
    </section>
  );
}
