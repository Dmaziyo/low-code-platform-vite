import { context } from '@//store'
import { Menu } from '@arco-design/web-react'
import { MouseEvent, useContext } from 'react'
const MenuItem = Menu.Item

// 右键时出现的MenuBar
export function ContextMenu() {
  const { editingCompo, clone, menuPos, setMenuPos, components, setComponents } = useContext(context)
  function clickMenu(key: string) {
    switch (key) {
      case 'Copy': {
        if (clone && editingCompo) {
          clone(editingCompo.name, editingCompo)
        }
        break
      }
      case 'Delete': {
        if (components && setComponents) {
          const index = components.findIndex((item) => {
            return item.id === editingCompo?.id
          })
          const newComponents = components.slice()
          newComponents.splice(index, 1)
          setComponents(newComponents)
        }
        break
      }
    }
    hideContextMenu(setMenuPos)
  }
  if (menuPos?.length && editingCompo) {
    return (
      <Menu
        style={{
          width: 70,
          height: 100,
          left: menuPos[0] + 'px',
          top: menuPos[1] + 'px',
          userSelect: 'none',
          position: 'absolute',
          zIndex: 999
        }}
        onClickMenuItem={(key: string) => clickMenu(key)}
      >
        <MenuItem key="Copy">复制</MenuItem>
        <MenuItem key="Delete">删除</MenuItem>
      </Menu>
    )
  } else {
    return <></>
  }
}
export function bindContextMenu(
  e: MouseEvent,
  canvasRef: React.MutableRefObject<null>,
  setMenuPos: React.Dispatch<React.SetStateAction<number[]>> | undefined
) {
  e.preventDefault()
  const el = e.target as Element
  if (
    el.classList.contains('element-on-edit-canvas') ||
    el.parentElement?.classList.contains('element-on-edit-canvas')
  ) {
    if (canvasRef.current && setMenuPos) {
      const { x, y } = (canvasRef.current as Element)
        .getElementsByClassName('canvas-wrapper')[0]
        .getBoundingClientRect()
      const new_menuPos = [e.clientX - x, e.clientY - y]
      setMenuPos(new_menuPos)
    }
  } else {
    hideContextMenu(setMenuPos)
  }
}
export function hideContextMenu(setMenuPos: React.Dispatch<React.SetStateAction<number[]>> | undefined) {
  setMenuPos?.([])
}
