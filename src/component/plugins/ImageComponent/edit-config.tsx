import { context } from '@//store'
import { IImageEditConfig } from '@//types/editConfig.type'
import { IPictureComponent } from '@//types/lowCodeCompo.type'
import { Form } from '@arco-design/web-react'
import { useContext, useEffect, useState } from 'react'
import { getEditComponent } from '../../edit-component/base'
// import { EditInputProp } from './editbase.type'
// 获取并配置image组件的编辑栏
export const ImageConfigComponents = () => {
  const { editingCompo, setReRender } = useContext(context)
  let { reRender } = useContext(context)
  const [formItems, setFormItems] = useState<Array<JSX.Element>>([])
  const imgCompo = editingCompo as IPictureComponent
  // const imageConfig = editorConfig.imgSrc
  // 遍历config动态生成修改部分

  useEffect(() => {
    const editorConfig = imgCompo.editConfig
    const tempFormItem: JSX.Element[] = []
    // 遍历 config 动态生成修改部分
    Object.keys(editorConfig).forEach((key) => {
      const curKey = key as keyof IImageEditConfig
      const configItem = editorConfig[curKey]
      configItem.callback = (val: string) => {
        imgCompo.props[curKey] = val
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
