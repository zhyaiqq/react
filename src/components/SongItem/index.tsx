
import { ISongItem } from '@/store/modules/recommend/types'
import React, { memo, ReactElement } from 'react'
import './index.scss'

interface IProps {
  song: ISongItem,
  style?: Object
}
export const SongItem = memo(({ song, style } : IProps): ReactElement => {
  return (
    <div className="song-item" style={style}>
      <img src={song.picUrl} style={{width: '100%'}} />
      <span>{ song.name }</span>
      <span>{ song.copywriter }</span>
    </div>
  )
})