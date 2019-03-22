import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from 'lodash';
import axios from '../../axios-instance';

const textEditor = ({ value, itemId, updateDesktopIcon }) => {
  const saveContent = (content) => {
    console.log(
      'auto saved!',
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
    updateDesktopIcon(itemId, { content });
    axios(`/items/${itemId}`, {
      method: 'PUT',
      data: {
        changedValues: {
          content
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const debouncedSaveContent = _.debounce(saveContent, 8000);

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(_event, editor) => {
        const data = editor.getData();
        debouncedSaveContent(data);
      }}
      onBlur={(_event, editor) => {
        const data = editor.getData();
        saveContent(data);
      }}
    />
  );
};

export default textEditor;
