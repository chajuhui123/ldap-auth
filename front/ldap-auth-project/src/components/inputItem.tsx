import React from "react";
import styled from "styled-components";

interface IProps {
  type?: "text" | "password";
  label: string;
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const InputItem = ({ type = "text", label, value, onChange }: IProps) => {
  return (
    <StyledWrapper>
      <input type={type} value={value} onChange={onChange} required />
      <label>{label}</label>
      <span></span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 310px;
  margin: 50px 30px;

  input {
    font-size: 15px;
    color: #222222;
    width: 300px;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
    background: none;
    z-index: 5;
  }

  input::placeholder {
    color: #aaaaaa;
  }
  input:focus {
    outline: none;
  }

  span {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0%;
    background-color: #666;
    width: 0;
    height: 2px;
    border-radius: 2px;
    transition: 0.5s;
  }

  label {
    position: absolute;
    color: #aaa;
    left: 10px;
    font-size: 20px;
    bottom: 8px;
    transition: all 0.2s;
  }

  input:focus ~ label,
  input:valid ~ label {
    font-size: 16px;
    bottom: 40px;
    color: #666;
    font-weight: bold;
  }

  input:focus ~ span,
  input:valid ~ span {
    width: 100%;
  }
`;

export default InputItem;
