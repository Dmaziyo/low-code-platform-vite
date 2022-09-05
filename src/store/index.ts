import React from 'react'
import { Params } from 'react-router'
import { ComponentName, ComponentSchema, IPageInfo } from '../types'
type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>
export const context = React.createContext<
  Partial<{
    width: number
    setWidth: Dispatch<number>
    height: number
    setHeight: Dispatch<number>
    components: ComponentSchema[]
    setComponents: Dispatch<ComponentSchema[]>
    editingCompo: ComponentSchema | null
    setEditingCompo: Dispatch<ComponentSchema | null>
    reRender: boolean
    setReRender: Dispatch<boolean>
    clone: (conKey: ComponentName, schema?: ComponentSchema) => void
    pageInfo: IPageInfo | null
    setPageInfo: Dispatch<IPageInfo | null>
    params: Readonly<Params<string>>
    menuPos: number[]
    setMenuPos: React.Dispatch<React.SetStateAction<number[]>>
  }>
>({})
