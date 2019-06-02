import 'react-redux'
import { AnyAction } from 'redux'
import { Component } from 'react'

declare module 'react-redux' {
  // Add removed inferrable type to support connect as decorator
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/16652
  export type InferableComponentDecorator<TOwnProps> = <
    T extends Component<TOwnProps>
  >(
    component: T
  ) => T
}
