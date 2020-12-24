import React, { Fragment, memo, ReactElement } from 'react'
import './index.scss'

interface IProps {
  title: string,
  keywords?: Array<string>,
  children?: ReactElement<any>,
  style?: Object | string
}

const Layout = (props: IProps) => {
  // 子标题布局
  const _renderKeywordsCn = (): ReactElement => {
    let arr:Array<ReactElement> = []
    props.keywords && props.keywords.forEach((item, index) => {
      arr.push(
        <Fragment key={index}>
          <span className="keyword">{ item }</span>
          <span className="line">|</span>
        </Fragment>
      )
    })
    return <div className="keyword-wrapper">{arr}</div>
  }

  return (
    <div className={['cm-block-1', typeof props.style === 'string' ? props.style : ''].join(' ')} style={typeof props.style === 'object' ? props.style : {}}>
      <div className="top">
        <h2 className="title">{ props.title }</h2>
        { _renderKeywordsCn() }
        <div className="more">
          更多
        </div>
      </div>
      <>{props.children}</>
    </div>
  )
}

export default memo(Layout)