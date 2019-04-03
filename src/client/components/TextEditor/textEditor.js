import React, { useState } from 'react';
import styled from 'styled-components';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from 'lodash';

import axios from '../../axios-instance';

const AutoSaver = styled.div`
  position: absolute;
  bottom: 6%;
  right: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkmark = styled.svg`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.8s forwards, scale 2s ease-in-out 1.3s both;

  & > circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
  }

  & > path {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 1.2s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale {
    0% {
      transform: none;
      width: 38px;
    }
    20% {
      transform: scale3d(1.1, 1.1, 1);
      width: 38px;
    }
    40%,
    80% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: none;
      opacity: 0;
    }
  }

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #7ac142;
    }
  }
`;

const textEditor = ({ value, id, updateItems }) => {
  const [config, setConfig] = useState({
    visibility: false,
    text: value
  });

  const saveContent = (editor) => {
    const content = editor.getData();

    axios(`/items/${id}`, {
      method: 'PUT',
      data: {
        changedValues: {
          content
        }
      }
    })
      .then(() => {
        updateItems();
        if (document.getElementById(`Window${id}`)) {
          setConfig({
            visibility: true,
            text: editor.getData()
          });
          setTimeout(() => {
            if (document.getElementById(`Window${id}`)) {
              setConfig({
                visibility: false,
                text: editor.getData()
              });
            }
          }, 4000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const debouncedSaveContent = _.debounce(saveContent, 4000);
  const { visibility, text } = config;

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(_event, editor) => {
          debouncedSaveContent(editor);
        }}
        onBlur={(_event, editor) => {
          saveContent(editor);
        }}
      />
      {visibility && (
        <AutoSaver>
          <Checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="25" fill="none" />
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </Checkmark>
        </AutoSaver>
      )}
    </>
  );
};

export default React.memo(textEditor);
