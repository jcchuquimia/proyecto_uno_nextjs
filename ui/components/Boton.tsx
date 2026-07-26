import React from 'react'

type BotonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export default function Boton({ onClick, className, children, type = "button" }: BotonProps) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
