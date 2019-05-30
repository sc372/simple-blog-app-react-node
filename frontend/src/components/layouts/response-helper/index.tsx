import React from 'react'
import Responsive from 'react-responsive'

const Min1000 = (props: any) => <Responsive {...props} minWidth={1000} />
const Max1000 = (props: any) => <Responsive {...props} maxWidth={1000} />

export default {
  Min1000,
  Max1000,
}
