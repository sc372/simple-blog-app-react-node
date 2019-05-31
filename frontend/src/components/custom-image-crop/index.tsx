import React, { useRef } from 'react'
import { Button, Col, Row } from 'antd'
import Cropper from 'react-cropper'

import './styles.scss'
import 'cropperjs/dist/cropper.css'

const CustomImageCrop: React.FC = () => {
  const cropper: any = useRef(null) // eslint-disable-line @typescript-eslint/no-explicit-any

  return (
    <div className="custom-image-crop-wrapper">
      <div className="select-image-btn-wrapper">
        <Row type="flex">
          <Col xl={11}>
            <Button className="select-image-btn">
              <label className="select-image-label">
                <input
                  type="file"
                  onChange={() => console.log('Line: 44', 'skdjhfsdk')}
                />
                이미지 선택
              </label>
            </Button>
          </Col>
          <Col xl={11}>
            <Button onClick={() => console.log('Line: 27', 'dskjghsdkjgh')}>
              이미지 자르기
            </Button>
          </Col>
        </Row>
      </div>
      <Row type="flex" justify="start" align="middle">
        <Col xs={24} sm={24} md={24} lg={11} xl={11}>
          <Cropper
            className="select-image-cropper"
            aspectRatio={80 / 92}
            preview=".img-preview"
            guides={true}
            src={'https://picsum.photos/1300/500'}
            ref={cropper}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11}>
          <img className="select-image-cropper-result" src="" alt="" />
        </Col>
      </Row>
    </div>
  )
}

export default CustomImageCrop
