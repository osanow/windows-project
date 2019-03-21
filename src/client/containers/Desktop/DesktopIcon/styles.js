import styled from 'styled-components';
import { imageContainer } from '../../../assets/styles/globalStyles';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;

  cursor: ${({ isDragging, loading }) => {
    if (loading) return 'progress';
    if (isDragging) return 'grabbing';
    return 'pointer';
  }};
  transition: ${({ isDragging }) => (!isDragging ? 'none' : 'transform .1s linear')};
  transform: ${({ left, top, isDragging }) => (isDragging ? `translate( ${left}px, ${top}px )` : 'translate( 0px, 0px )')};
  grid-column-start: ${({ colPos }) => colPos};
  grid-row-start: ${({ rowPos }) => rowPos};

  pointer-events: all;
  user-select: none;

  &:hover {
    border: 1px solid rgba(107, 128, 160, 0.3);
    background: rgba(89, 151, 249, 0.1);
  }

  &:active {
    border: 1px solid #4286f4;
    background: rgba(89, 151, 249, 0.4);
  }
`;

export const ItemIcon = styled(imageContainer)``;

export const ItemName = styled.p`
  color: white;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
  padding: 0;
  margin: 0.3rem 0 0 0;
`;

export const NameChanging = styled.input`
  width: 90%;
  margin: 0.2rem auto;
  color: black;
  text-align: center;
  background-color: whitesmoke;
  border: 1px solid gray;
`;
