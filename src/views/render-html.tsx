import '../component/canvas/style.scss'

import { CSSProperties } from 'react'
import { getComponent } from '../component/plugins/plugins'
import { ComponentSchema } from '../types'
import React from 'react'

interface CompoProps {
  components: ComponentSchema[] | undefined
  width: number
  height: number
}
// 画布
export const RHtml: React.FC<CompoProps> = ({ components, width, height }) => {
  if (components) {
    return (
      <div
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`,
          border: '1px solid black',
          backgroundColor: 'lightblue'
        }}
      >
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
      </div>
    )
  } else {
    return <div>Loading-----</div>
  }
}
