/**
 * 当选择好了类型后，后面的input关键词就会更改
 * 例如onClick.eventType:openUrl -> 打开[]
 *     onClick.eventType:openUrl -> 警告[]
 * @returns
 */

import { context } from '@//store'
import { Collapse, Select, Input } from '@arco-design/web-react'
// import { useEffect } from 'react'
import { useContext } from 'react'
const CollapseItem = Collapse.Item
const Option = Select.Option

export function EditEvent() {
  const { editingCompo, reRender, setReRender } = useContext(context)
  const events = editingCompo?.events
  if (events && setReRender) {
    const clickEvents = events.clickEvents
    // 根据action类型动态修改展示内容
    const ClickInput = (eventType: keyof typeof events.clickEvents) => {
      switch (clickEvents[eventType].actionType) {
        case 'alert':
        case 'openUrl':
          return (
            <>
              <span>{clickEvents[eventType].actionType === 'alert' ? '警告' : '打开'}</span>
              <Input
                value={clickEvents[eventType].val}
                onChange={(val: string) => {
                  events.clickEvents[eventType].val = val
                  setReRender(!reRender)
                }}
                style={{ width: 150 }}
              />
            </>
          )

        case 'null':
          clickEvents[eventType].callback = undefined
          return <></>
        default:
          break
      }
    }
    return (
      <Collapse defaultActiveKey={['onClick', 'dbClick']} style={{ maxWidth: 1180 }}>
        {/* 遍历生成自定义事件编辑器 */}
        {Object.keys(clickEvents).map((key, index) => {
          const eventType = key as keyof typeof clickEvents
          return (
            <CollapseItem key={key + index} header={key} name={key}>
              <span
                style={{
                  backgroundColor: 'rgb(246, 248, 250)',
                  marginBottom: '5px',
                  padding: '8px',
                  wordBreak: 'break-all'
                }}
              >
                当点击组件时，可以跳转至(http://baidu,com)
              </span>
              <div>
                <span style={{ marginRight: '8px' }}>动作类型:</span>
                <Select
                  placeholder="类型"
                  style={{ width: 80 }}
                  onChange={(value) => {
                    clickEvents[eventType].actionType = value
                    clickEvents[eventType].val = ''
                    setReRender(!reRender)
                  }}
                  defaultValue={clickEvents[eventType].actionType}
                >
                  {events.type.map((item, index) => {
                    return (
                      <Option key={item + index} value={item}>
                        {item}
                      </Option>
                    )
                  })}
                </Select>
                {ClickInput(eventType)}
              </div>
            </CollapseItem>
          )
        })}
      </Collapse>
    )
  } else {
    return <div>no editingComponent</div>
  }
}
