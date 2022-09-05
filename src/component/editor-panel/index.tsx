import { context } from '@//store'
import { ComponentName } from '@//types/lowCodeCompo.type'
import { Layout, Tabs, Typography } from '@arco-design/web-react'
// import { Form } from '@arco-design/web-react'
import { useContext } from 'react'
import { ImageConfigComponents } from '../plugins/ImageComponent/edit-config'
import { ButtonConfigComponents } from '../plugins/ButtonComponent/edit-config'
import './style.scss'
import TabPane from '@arco-design/web-react/es/Tabs/tab-pane'
import { EditEvent } from './edit-events'
import { VideoConfigComponents } from '../plugins/VideoComponent/edit-config'
const Sider = Layout.Sider
// 编辑栏
export function PropsEditorPanel() {
  const { editingCompo, setReRender } = useContext(context)

  if (!editingCompo || !setReRender) {
    return null
  }
  return (
    <Sider collapsed={false} collapsible trigger={null} width={420} className={'nav nav-right'}>
      <Tabs defaultActiveTab="props">
        <TabPane key="props" title="属性">
          <Typography.Paragraph>
            {editingCompo.name === ComponentName.PictureComponent && <ImageConfigComponents />}
            {editingCompo.name === ComponentName.ButtonComponent && <ButtonConfigComponents />}
            {editingCompo.name === ComponentName.VideoComponent && <VideoConfigComponents />}
          </Typography.Paragraph>
        </TabPane>
        <TabPane key="events" title="事件">
          <Typography.Paragraph>
            <EditEvent></EditEvent>
          </Typography.Paragraph>
        </TabPane>
      </Tabs>
    </Sider>
  )
}
