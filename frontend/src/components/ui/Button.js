import styled, { css } from 'styled-components';

const Button = styled.button`
  margin: 20px;
  width: 200px;
  height: 35px;
  display: inline-block;
  ${({ activated }) =>
    activated &&
    css`
      background: green;
    `}
`;

export default Button;
