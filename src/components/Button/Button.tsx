import React from 'react'

type ButtonProps = {
    styles: string;
    value: string;
    funcOnClick: () => void;
}

function Button({ styles, value, funcOnClick }: ButtonProps) {
  return (
    <button className={`btn ${styles}`} onClick={funcOnClick}>{ value }</button>
  )
}

export default Button