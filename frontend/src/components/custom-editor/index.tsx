import React from 'react'
import ReactQuill from 'react-quill'

import './styles.scss'
import 'react-quill/dist/quill.snow.css'

const CustomEditor: React.FC = () => {
  return (
    <div className="custom-table-wrapper">
      <ReactQuill
        // value={}
        onChange={(contents: string) => console.log('Line: 12', contents)}
        theme={'snow'}
        placeholder={'내용을 작성해주세요.'}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link'],
            ['clean'],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        }}
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'video',
        ]}
      />
    </div>
  )
}

export default CustomEditor
