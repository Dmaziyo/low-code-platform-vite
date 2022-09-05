import { context } from '@//store'
import { IVideoEditConfig } from '@//types/editConfig.type'
import { IVideoComponent } from '@//types/lowCodeCompo.type'
import { Form } from '@arco-design/web-react'
import { useContext, useEffect, useState } from 'react'
import { getEditComponent } from '../../edit-component/base'
// import { EditInputProp } from './editbase.type'
// 获取并配置Video组件的编辑栏
export const VideoConfigComponents = () => {
  const { editingCompo, setReRender } = useContext(context)
  let { reRender } = useContext(context)
  const [formItems, setFormItems] = useState<Array<JSX.Element>>([])
  const videoCompo = editingCompo as IVideoComponent
  // const imageConfig = editorConfig.imgSrc
  // 遍历config动态生成修改部分

  useEffect(() => {
    const editorConfig = videoCompo.editConfig
    const tempFormItem: JSX.Element[] = []
    // 遍历 config 动态生成修改部分
    Object.keys(editorConfig).forEach((key) => {
      const curKey = key as keyof IVideoEditConfig
      const configItem = editorConfig[curKey]
      configItem.callback = (val: string) => {
        videoCompo.props[curKey] = val

        // 修改render使得页面数据刷新
        reRender = !reRender
        setReRender?.(reRender)
      }
      const formItem = getEditComponent(configItem, key)
      tempFormItem.push(formItem)
    })
    setFormItems(tempFormItem)
  }, [JSON.stringify(editingCompo?.editConfig)])

  return <Form>{formItems}</Form>
}
