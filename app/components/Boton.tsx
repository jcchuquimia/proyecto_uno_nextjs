import React from 'react'

type BotonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function Boton({onClick, className, children }: BotonProps) {
  return (
      <button
      onClick={onClick} className={className}  
      >
      {children}
      </button>
  )
}
