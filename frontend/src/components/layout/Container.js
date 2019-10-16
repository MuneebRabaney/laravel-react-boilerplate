import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  ${({ grid }) =>
    grid &&
    css`
      display: grid;
      background: lightblue;
      grid-template-columns: auto auto auto auto;
      grid-template-rows: repeat(5, 120px);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
    `}
  ${({ centerInnerElements }) =>
    centerInnerElements &&
    css`
      text-align: center;
    `}
`;

export default Container;
