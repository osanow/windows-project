import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { changeFormat } from '../../../utils/utility';

const ContextMenu = styled.ul`
  position: absolute;
  z-index: 99;
  width: 13rem;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  background: rgb(240, 240, 240);
  border: 1px solid gray;
  list-style: none;
  padding: 0.3rem;
`;

const MenuOption = styled.li`
  position: relative;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  padding: 3px 3px 3px 1.5rem;
  background: rgb(240, 240, 240);
  text-transform: capitalize;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  & > ul {
    display: none;
  }

  &:hover {
    background: rgb(220, 220, 220);

    & > ul {
      border-left: none;
      display: block;
    }
  }
`;

const contextMenu = ({
  left, top, options, data
}) => {
  const optionsArray = Object.entries(options).map((el) => {
    if (typeof el[1] === 'object') {
      return (
        <MenuOption key={el[0]}>
          <span>{changeFormat(el[0])}</span>
          <span>{'>'}</span>
          <ContextMenu left={13 * 16 - 0.5 * 16} top={-0.35 * 16}>
            {Object.entries(el[1]).map(nestedEl => (
              <MenuOption key={nestedEl[0]} onClick={() => nestedEl[1](data)}>
                <span>{changeFormat(nestedEl[0])}</span>
              </MenuOption>
            ))}
          </ContextMenu>
        </MenuOption>
      );
    }
    return (
      <MenuOption key={el[0]} onClick={() => el[1](data)}>
        <span>{changeFormat(el[0])}</span>
      </MenuOption>
    );
  });

  return ReactDOM.createPortal(
    <ContextMenu left={left} top={top}>
      {optionsArray}
    </ContextMenu>,
    document.getElementById('app-contextMenu')
  );
};

export default contextMenu;
