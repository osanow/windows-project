import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import axios from '../../../axios-instance';
import SidebarItem from './sidebarItem';

import { fetchIcons } from '../../../utils/utility';

import expandIcon from '../../../assets/icons/keyboard-right-arrow.svg';

const ItemsListDiv = styled.div`
  list-style: none;
  padding-left: 0.5rem;
  position: relative;
`;

const ItemsBox = styled.ul`
  overflow: hidden;
  height: ${({ active }) => (active ? 'auto' : '0px')};
  padding-left: 0;
  border-left: 1px solid gray;
`;

const ExpandIcon = styled.span`
  display: ${({ isEmpty }) => (isEmpty ? 'none' : 'inline')};
  position: absolute;
  width: .5rem;
  height: .5rem;
  top: -0.75rem;
  left: 0.3rem;
  background: url(${expandIcon});
  transform: ${({ active }) => (active ? 'rotateZ(90deg)' : 'rotateZ(0deg)')};
  cursor: pointer;
  padding: 0.1rem;
`;

const ItemsList = (props) => {
  const { path, active, changeDirHandler } = props;

  const [items, setItems] = useState([]);
  const [isActive, setIsActive] = useState(active);

  const toggleChildItemsHandler = () => {
    setIsActive(!isActive);
  };

  const fetchItems = async () => {
    try {
      const fetchedItems = (await axios('items/', {
        method: 'GET',
        params: { path }
      })).data;
      const itemsWithIcons = await fetchIcons(fetchedItems);

      const listItems = [];
      itemsWithIcons.forEach((item) => {
        if (item.type.find(type => type === 'container')) {
          listItems.push(item);
        }
      });

      const newItems = listItems.map(item => (
        <React.Fragment key={item._id}>
          <SidebarItem icon={item.iconPath} path={item.path} changeDirHandler={() => changeDirHandler(item._id, item.name, `${item.path}/${item._id}`)}>{item.name}</SidebarItem>
          <ItemsList path={`${item.path}/${item._id}`} changeDirHandler={changeDirHandler} />
        </React.Fragment>
      ));

      setItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems(path);
  }, [isActive]);

  return (
    <ItemsListDiv>
      <ExpandIcon onClick={toggleChildItemsHandler} active={isActive} isEmpty={items.length === 0} />
      <ItemsBox active={isActive}>
        {items}
      </ItemsBox>
    </ItemsListDiv>
  );
};

export default ItemsList;
