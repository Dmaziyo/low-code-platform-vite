import { context } from '@//store'
import { IButtonComponent } from '@//types/lowCodeCompo.type'
import { Collapse, Form } from '@arco-design/web-react'
import { useContext, useEffect, useState } from 'react'
import { getEditComponent } from '../../edit-component/base'
import { EditInputProp, IKeyofButtonEditConfig } from '@//types'
// import { EditInputProp } from './editbase.type'

const CollapseItem = Collapse.Item
// 获取并配置 button 组件的编辑栏
export const ButtonConfigComponents = () => {
  const { editingCompo, setEditingCompo, setReRender } = useContext(context)
  let { reRender } = useContext(context)
  const [formItems, setFormItems] = useState<{ attr: JSX.Element[]; style: JSX.Element[] } | null>(null)

  useEffect(() => {
    const btnCompo = { ...editingCompo } as IButtonComponent
    const editorConfig = btnCompo.editConfig
    const attrFormItem: JSX.Element[] = []
    const styleFormItem: JSX.Element[] = []
    // 遍历 config 动态生成修改部分
    Object.keys(editorConfig).forEach((key) => {
      const curKey = key as IKeyofButtonEditConfig
      const configItem: EditInputProp | undefined = editorConfig[curKey]
      if (!configItem) {
        return
      }
      const handleObj = configItem.type === 'style' ? btnCompo.style : btnCompo.props
      const handleObjKey = key as keyof typeof handleObj
      configItem.value = handleObj[handleObjKey]?.toString()
      configItem.callback = (val: string) => {
        handleObj[handleObjKey] = val
        // 修改render使得页面数据刷新
        reRender = !reRender
        setReRender?.(reRender)
      }
      const formItem = getEditComponent(configItem, key)
      if (configItem.type === 'attribute') {
        attrFormItem.push(formItem)
      } else {
        styleFormItem.push(formItem)
      }
    })
    if (!setEditingCompo) {
      return
    }
    setEditingCompo(btnCompo)
    setFormItems({
      attr: attrFormItem,
      style: styleFormItem
    })
  }, [JSON.stringify(editingCompo)])

  return (
    <Collapse defaultActiveKey={['style', 'attr']} expandIconPosition="right">
      <CollapseItem header="通用样式" name={'style'}>
        <Form className={'style-config'}>{formItems?.style}</Form>
      </CollapseItem>
      <CollapseItem header="属性设置" name={'attr'}>
        <Form className={'attr-config'}>{formItems?.attr}</Form>
      </CollapseItem>
    </Collapse>
  )
}
