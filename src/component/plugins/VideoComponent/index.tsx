import { EditComponentKey } from '@//types/editbase.type'
import { ComponentName, ComponentSchema, IVideoComponent, PluginComponentProps } from '@//types/lowCodeCompo.type'
import { defaultStyle } from '../plugins'
// import { initialOptions } from '@//types/video.js.type'
// Styles
// import { useEffect, useRef, useState } from 'react'

export const videoSchema = (id: string): ComponentSchema => {
  return {
    id,
    name: ComponentName.VideoComponent,
    props: {
      url: '/assets/video1.mp4',
      poster: '//vjs.zencdn.net/v/oceans.png'
      //   controlBar: true
    },
    events: {
      type: ['alert', 'openUrl', 'null'],
      clickEvents: {
        onClick: {
          callback: undefined,
          actionType: 'null',
          val: ''
        },
        dbClick: {
          callback: undefined,
          actionType: 'null',
          val: ''
        }
      }
    },
    editConfig: {
      url: {
        name: EditComponentKey.EDIT_VIDEO_INPUT,
        label: '视频地址',
        callback: null
      },
      poster: {
        name: EditComponentKey.EDIT_IMAGE_INPUT,
        label: '封面url',
        callback: null
      }
      //   controlBar: {
      //     name: EditComponentKey.EDIT_INPUT,
      //     propType: 'color',
      //     label: '字体颜色',
      //     value: '#ffffff',
      //     callback: null
      //   }
    },
    style: { ...defaultStyle, height: '140px', width: '250px', top: '88px', left: '51px' }
  }
}

export const VideoCompo: React.FC<PluginComponentProps> = ({ schema }) => {
  // const videoNode = useRef<HTMLVideoElement>(null)
  // const player = useRef<videojs.Player>()
  // const [videoPlayer, setVideoPlayer] = useState<VideoJsPlayer | null>()
  const compoSchema = schema as IVideoComponent
  const props = compoSchema.props
  // const options: videojs.PlayerOptions = {
  //   ...initialOptions,
  //   sources: [
  //     {
  //       src: '/assets/video1.mp4',
  //       type: 'video/mp4'
  //     }
  //   ]
  // }

  // useEffect(() => {
  //   // 修改路径
  //   if (videoPlayer) {
  //     videoPlayer.src(props.url)
  //     videoPlayer.poster(props.poster)
  //   }
  //   // 初始化video
  //   else {
  //     player.current = videojs(videoNode.current, {
  //       ...options
  //     }).ready(function (this) {
  //       setVideoPlayer(this)
  //     })
  //     return () => {
  //       if (player.current) {
  //         player.current.dispose()
  //       }
  //     }
  //   }
  // }, [options])

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <video className="video-js" controls preload="auto" width="300" height="100" data-setup="{}">
        <source src={props.url} type="video/mp4" />
      </video>
    </div>
  )
}
