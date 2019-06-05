import React, { useRef, useState } from 'react'
import { Button, Col, Row } from 'antd'
import Cropper from 'react-cropper'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import 'cropperjs/dist/cropper.css'
import * as R from 'ramda'

import { IAccountDomain, IDispatchable } from '../../models'

import './styles.scss'

interface ICustomImageProps extends IDispatchable {
  readonly accountDomain: IAccountDomain
  readonly state: any
  readonly dispatchSetState: any
  readonly aspectRatio: any
}

const CustomImageCrop: React.FC<ICustomImageProps> = ({
  accountDomain,
  state,
  dispatchSetState,
  aspectRatio,
}) => {
  const cropper: any = useRef(null)
  const [cropperSrc, setCropperSrc] = useState(accountDomain.filePath)

  const setCropperUi = (data: any) => dispatchSetState(data)

  const handleInputImage = (e: any) => {
    e.preventDefault()
    let files: any
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      // @ts-ignore
      setCropperSrc(reader.result)
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(files[0])

      setCropperUi({
        fileName: !R.isEmpty(e.target.files[0]) && files[0].name,
      })
    }
  }

  const handleCropImage = () => {
    if (typeof cropper.current.getCroppedCanvas() === 'undefined') return
    setCropperUi({
      filePath: cropper.current.getCroppedCanvas().toDataURL(),
    })
  }

  return (
    <div className="custom-image-crop-wrapper">
      <div className="select-image-btn-wrapper">
        <Row type="flex">
          <Col xl={11}>
            <Button className="select-image-btn">
              <label className="select-image-label">
                <input type="file" onChange={handleInputImage} />
                이미지 선택
              </label>
            </Button>
          </Col>
          <Col xl={11}>
            <Button onClick={handleCropImage}>이미지 자르기</Button>
          </Col>
        </Row>
      </div>
      <Row type="flex" justify="start" align="middle">
        <Col xs={24} sm={24} md={24} lg={11} xl={11}>
          <Cropper
            className="select-image-cropper"
            aspectRatio={aspectRatio}
            preview=".img-preview"
            guides={true}
            src={cropperSrc}
            ref={cropper}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11}>
          <img
            className="select-image-cropper-result"
            src={state.filePath}
            alt=""
          />
        </Col>
      </Row>
    </div>
  )
}

const withConnect = connect()

export default compose<ICustomImageProps, ICustomImageProps>(withConnect)(
  CustomImageCrop
)
