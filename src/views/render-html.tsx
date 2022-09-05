import '../component/canvas/style.scss'

import { CSSProperties, Dispatch, useState } from 'react'
import { getComponent } from '../component/plugins/plugins'
import { ComponentSchema } from '../types'
import React from 'react'

export const context = React.createContext<
  Partial<{
    reRender: boolean
    setReRender: Dispatch<boolean>
  }>
>({})

interface CompoProps {
  components: ComponentSchema[] | undefined
}
// 画布
export const RHtml: React.FC<CompoProps> = ({ components }) => {
  // 用于预览时能够初始化事件
  const [reRender, setReRender] = useState(false)
  // 获取预览页面数据

  if (components) {
    return (
      <context.Provider
        value={{
          reRender,
          setReRender
        }}
      >
        <div style={{ position: 'absolute', width: '350px', height: '600px', backgroundColor: 'lightblue' }}></div>
        <div className="canvas-wrapper preview-canvas">
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
