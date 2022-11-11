import '@arco-design/web-react/dist/css/arco.css'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { ComponentName, ComponentSchema } from '../types/lowCodeCompo.type'
import { getComponentSchema } from '../component/plugins/plugins'

import React from 'react'
import { Canvas } from '../component/canvas'

import { PluginListPanel } from '../component/pluginListPanel'
import { PropsEditorPanel } from '../component/editor-panel'
import { Layout } from '@arco-design/web-react'
import { IPageInfo } from '../types'
import { LowCodeHeader } from '../component/header'
import Content from '@arco-design/web-react/es/Layout/content'
import { useNavigate, useParams } from 'react-router'
import { createPage, findPage } from '../utils/strapi'
import { context } from '../store'

export function Editor() {
  const [components, setComponents] = useState<ComponentSchema[]>([])
  const [editingCompo, setEditingCompo] = useState<ComponentSchema | null>(null)
  const [reRender, setReRender] = useState(false)
  const [width, setWidth] = useState(320)
  const [height, setHeight] = useState(600)
  const [pageInfo, setPageInfo] = useState<IPageInfo | null>(null)
  const [menuPos, setMenuPos] = useState<number[]>([])
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) {
      // 获取页面数据
      findPage(+params.id).then(
        ({ components, width, height }) => {
          setComponents(components)
          setWidth(width)
          setHeight(height)
          console.log(height)
        },
        () => {
          // 新建页面，并且重定向至新建页面
          void createPage(navigate)
        }
      )
    }
  }, [params.id])
  // 添加组件数据至数组中
  const clone = (conKey: ComponentName, schema?: ComponentSchema) => {
    // 添加组件
    if (!schema) {
      const schema = getComponentSchema(conKey)
      setComponents((components) => [...components, schema])
    }
    // 复制组件
    else {
      const newComponents = components.slice()
      const copyComponent = JSON.parse(JSON.stringify(schema)) as ComponentSchema

      if (copyComponent.style.top && copyComponent.style.left) {
        copyComponent.id = new Date().getTime().toString()
        copyComponent.style.top = parseInt(copyComponent.style.top) + 20 + 'px'
        copyComponent.style.left = parseInt(copyComponent.style.left) + 20 + 'px'

        newComponents.push(copyComponent)
        setComponents(newComponents)
      }
    }
  }

  return (
    <context.Provider
      value={{
        components,
        setComponents,
        editingCompo,
        setEditingCompo,
        reRender,
        setReRender,
        clone,
        pageInfo,
        setPageInfo,
        params,
        menuPos,
        setMenuPos,
        width,
        height,
        setWidth,
        setHeight
      }}
    >
      <LowCodeHeader />
      <Layout className="low-code-layout">
        <PluginListPanel></PluginListPanel>
        <Content
          className={classNames('content', { pc: pageInfo?.platform === 'PC', h5: pageInfo?.platform === 'H5' })}
        >
          <Canvas></Canvas>
        </Content>
        <PropsEditorPanel />
      </Layout>
    </context.Provider>
  )
}
