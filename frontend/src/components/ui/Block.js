import styled, { css } from 'styled-components';

const Block = styled.div`
  background: lightgreen;
  position: relative;
  color: #000;
  ${({ selected }) =>
    selected &&
    css`
      background: tomato;
    `}
  > span {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Block;
