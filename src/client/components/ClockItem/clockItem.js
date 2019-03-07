import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding: 0.3rem 0.3rem;
  height: 100%;
  color: white;
  margin: 0 0.3rem;
  cursor: pointer;

  & > p {
    margin: 0;
    padding: 0;
    font-size: 13px;
    position: relative;
    height: 50%;
  }

  &:hover {
    background-color: rgba(150, 150, 150, 0.1);
  }
`;

const clock = () => {
  let currentDate = new Date();

  const [date, setDate] = useState([
    currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric'
    }),
    currentDate.toLocaleDateString()
  ]);

  useEffect(() => {
    setInterval(() => {
      currentDate = new Date();

      setDate([
        currentDate.toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric'
        }),
        currentDate.toLocaleDateString()
      ]);
    }, 30000);
  }, []);

  return (
    <Wrapper>
      <p>{date[0]}</p>
      <p>{date[1]}</p>
    </Wrapper>
  );
};

export default clock;
