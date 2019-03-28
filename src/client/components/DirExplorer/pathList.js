import React from 'react';
import styled from 'styled-components';

import arrow from '../../assets/icons/keyboard-right-arrow.svg';
import directory from '../../assets/icons/directory-empty.svg';

const PathList = styled.ul`
  position: relative;
  width: 100%;
  margin: 0 0.3rem;
  height: 1.3rem;
  border: 1px solid #ccc;
  padding: 0 0.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;

  & > img {
    width: 1rem;
    height: 1rem;
    margin: 0 0.3rem;
  }
`;

const PathItem = styled.li`
  position: relative;
  padding-left: 0.8rem;
  padding-right: 0.1rem;
  height: 100%;
  display: flex;
  font-size: 13px;
  align-items: center;
  border: 0.5px solid white;

  &::before {
    position: absolute;
    content: url(${arrow});
    width: 0.35rem;
    height: 1.3rem;
    left: 5px;
  }

  &:hover {
    border: 0.5px solid rgba(20, 171, 229, 0.6);
    background: rgba(20, 171, 229, 0.2);
  }
`;

const pathList = ({ path, displayPath, changeDir }) => {
  const pathArray = displayPath.map((item, index) => (
    <PathItem
      key={path[index]}
      onClick={() => changeDir(path[index], displayPath[index])}
    >
      {item}
    </PathItem>
  ));
  return (
    <PathList>
      <img src={directory} alt="source" />
      {pathArray}
    </PathList>
  );
};

export default pathList;
