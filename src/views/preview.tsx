// import { CSSProperties } from 'react'
import { useParams } from 'react-router-dom'
// import { useAsync } from 'react-async'
import '../component/canvas/style.scss'
import { findPage } from '../utils/strapi'
import { CSSProperties, Dispatch, useEffect, useState } from 'react'
import { getComponent } from '../component/plugins/plugins'
import { ComponentSchema } from '../types'
import { Message } from '@arco-design/web-react'
import React from 'react'

export const context = React.createContext<
  Partial<{
    reRender: boolean
    setReRender: Dispatch<boolean>
  }>
>({})

// 画布
export function Preview() {
  const params = useParams()
  const [components, setComponents] = useState<ComponentSchema[]>([])
  const [width, setWidth] = useState(320)
  const [height, setHeight] = useState(600)
  // 用于预览时能够初始化事件
  const [reRender, setReRender] = useState(false)
  // 获取预览页面数据
  useEffect(() => {
    if (params.id) {
      findPage(+params.id)
        .then(({ components, width, height }) => {
          setComponents(components)
          setWidth(width)
          setHeight(height)
        })
        .catch(() => {
          Message.error('页面获取失败')
        })
    }
  }, [params.id])

  if (components) {
    return (
      <context.Provider
        value={{
          reRender,
          setReRender
        }}
      >
        <div className="canvas-wrapper preview-canvas" style={{ width: `${width}px`, height: `${height}px` }}>
          {components.map((componentSchema, index) => {
            const schema = componentSchema
            // 根据schema的名称进行相应的渲染
            return (
              <div style={{ ...(schema?.style as CSSProperties), display: 'inline-block' }} key={`compo-${index}`}>
                {getComponent(schema)}
              </div>
            )
          })}
        </div>
      </context.Provider>
    )
  } else {
    return <div>Loading-----</div>
  }
}
