import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { IDispatchable } from '../../models'

import './styles.scss'
import 'react-quill/dist/quill.snow.css'

interface ICustomEditorProps extends IDispatchable {
  readonly dispatchSetState: any
  readonly initialContents: any
}

const CustomEditor: React.FC<ICustomEditorProps> = ({
  dispatchSetState,
  initialContents,
}) => {
  const [contents, setContents] = useState(initialContents)
  useEffect(() => {
    dispatchSetState({ contents })
  }, [contents]) // eslint-disable-line

  return (
    <div className="custom-table-wrapper">
      <ReactQuill
        value={contents}
        onChange={(contents: string): void => {
          setContents(contents)
        }}
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

const withConnect = connect()

export default compose<ICustomEditorProps, ICustomEditorProps>(withConnect)(
  CustomEditor
)
