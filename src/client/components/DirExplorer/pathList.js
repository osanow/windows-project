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
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
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
  flex-shrink: 0;
  max-width: 6.5rem;
  white-space: nowrap;
  overflow: hidden;
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
  let maxAmount;
  const pathDisplay = document.getElementById(path);
  if (pathDisplay) maxAmount = Math.floor(pathDisplay.offsetWidth / (6.5 * 16));
  else maxAmount = 4;

  const pathArray = [];
  for (let i = displayPath.length - maxAmount; i < displayPath.length; i += 1) {
    if (i >= 0) {
      pathArray.push(
        <PathItem
          key={path[i]}
          onClick={() => changeDir(path[i], displayPath[i])}
        >
          {displayPath[i].length > 13
            ? `${displayPath[i].substring(0, 12)} ...`
            : displayPath[i]}
        </PathItem>
      );
    }
  }

  return (
    <PathList id={path}>
      <img src={directory} alt="source" />
      {pathArray}
    </PathList>
  );
};

export default pathList;
