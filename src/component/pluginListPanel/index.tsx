import { context } from '@//store'
import { PLUGIN_LIST } from '@//constants/plugin-icon-list'
import { Card, Collapse, Layout } from '@arco-design/web-react'
// import TabPane from '@arco-design/web-react/es/Tabs/tab-pane'
import { useContext } from 'react'
import { DragButton } from './draggable-btn'
import './style.scss'

const { Grid } = Card
const Sider = Layout.Sider
const CollapseItem = Collapse.Item

//左侧组件列表
export function PluginListPanel() {
  const { clone } = useContext(context)
  return clone ? (
    <Sider collapsed={false} collapsible trigger={null} width={260} className={'nav nav-left'}>
      <Collapse defaultActiveKey={['components', 'structure']} expandIconPosition="right">
        <CollapseItem header="组件列表" name={'components'}>
          <Card bordered={false} className="component-list">
            {
              // 遍历所有的图标
              PLUGIN_LIST.map((compoIcon, index) => {
                const cb = () => clone(compoIcon.compKey)
                return (
                  <Grid
                    key={`${index}${compoIcon.compKey}`}
                    hoverable={true}
                    style={{
                      width: '50%',
                      textAlign: 'center'
                    }}
                  >
                    <Card style={{ width: '100%' }} bordered={false}>
                      {DragButton({ compoIcon, cb, index })}
                    </Card>
                  </Grid>
                )
              })
            }
          </Card>
        </CollapseItem>
      </Collapse>
    </Sider>
  ) : (
    <div>loading...</div>
  )
}
