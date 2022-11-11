import { IDragIcon } from '@//types/pluginList.type'
import { ComponentName } from '@//types/lowCodeCompo.type'
import { useContext, useRef } from 'react'
import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import { Shape } from '../shape'
import './style.scss'
import { getComponent } from '../plugins/plugins'
import { bindContextMenu, ContextMenu, hideContextMenu } from '../context-menu'
import { context } from '@//store'

// 画布
export function Canvas() {
  const { components, setEditingCompo, clone, setReRender, setMenuPos, menuPos, width, height, setWidth, setHeight } =
    useContext(context)
  const canvasRef = useRef(null)
  // 实现拖拽的配置
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DragIcon', //写自定义的image拖拽type
    drop: (item: IDragIcon) => (clone as (conKey: ComponentName) => void)(item.compKey),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  if (components && setEditingCompo && setReRender) {
    return (
      <div ref={canvasRef}>
        <div
          onContextMenu={(e) => bindContextMenu(e, canvasRef, setMenuPos)}
          className={classNames('canvas-wrapper', { over: isOver })}
          ref={drop}
          onClick={() => {
            if (menuPos?.length) hideContextMenu(setMenuPos)
          }}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {components.map((componentSchema, index) => {
            const schema = componentSchema
            // 根据schema的名称进行相应的渲染
            return (
              <Shape key={`compo-${index}`} component={schema}>
                {getComponent(schema)}
              </Shape>
            )
          })}
          <ContextMenu></ContextMenu>
          <div style={{ position: 'absolute', bottom: '-20px', width: `${width}px`, textAlign: 'center' }}>
            <input
              className="size-input "
              value={width}
              onChange={(e) => {
                setWidth?.(+e.target.value)
              }}
              type="number"
            />
            <input
              className="size-input "
              onChange={(e) => {
                setHeight?.(+e.target.value)
                console.log(setHeight)
              }}
              value={height}
              type="number"
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
