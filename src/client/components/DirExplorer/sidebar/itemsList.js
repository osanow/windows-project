import React from 'react';
import styled from 'styled-components';

const ItemsList = styled.ul`
  list-style: none;
  padding-left: 0.5rem;
  overflow: hidden;
`;

const itemsList = (props) => {
  console.log(props);
  return <ItemsList />;
};

export default itemsList;
