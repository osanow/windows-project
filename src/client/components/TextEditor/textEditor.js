import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const textEditor = ({ value }) => (
  <CKEditor
    editor={ClassicEditor}
    data={value}
    onChange={(event, editor) => {
      const data = editor.getData();
      console.log({ event, editor, data });
    }}
  />
);

export default textEditor;
