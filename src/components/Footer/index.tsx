import React, { Fragment, memo } from 'react'

import { footerLinks, footerImages } from '@/assets/local-data'
import { IFooterItem } from '@/types/common'
import './index.scss'

function Footer () {
  const showCopyItem = (data: IFooterItem, index: number) => {
    return (
      <Fragment key={data.title}>
        <a href={data.link}>{data.title}</a>
        <span className="line">|</span>
      </Fragment>
    )
  }
  const showItem = (data: any, index: number) => {
    return (
      <div key={data.link} className="item">
        <a href={data.link} rel="noopener noreferrer" target="_blank" className="link"> </a>
        <span className="title">{data.title}</span>
      </div>
    )
  }
  return (
    <div className="footer">
      <div className="footer-content w980">
        <div className="footer-left">
          <p className="copy">{footerLinks.map((item, index) => showCopyItem(item, index))}</p>
          <p>
            <span className="footer-company">网易公司版权所有©1997-2020</span>
            <span>杭州乐读科技有限公司运营：浙网文[2018]3506-263号</span>
          </p>
          <p>
            <span className="footer-alert">
              违法和不良信息举报电话：0571-89853516
            </span>
            <span>举报邮箱：ncm5990@163.com</span>
          </p>
          <p>
            <span>粤B2-20090191-18</span>
            <span className="footer-manage-system">
              工业和信息化部备案管理系统网站
            </span>
            <span>浙公网安备 33010902002564号</span>
          </p>
        </div>
        <div className="footer-right">{footerImages.map((item, index) => showItem(item, index))}</div>
      </div>
    </div>
  )
}

export default memo(Footer)