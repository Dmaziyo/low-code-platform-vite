import { IPageInfo } from '@//types'
import { Button, Descriptions, Form, Input, Layout, Modal, Select } from '@arco-design/web-react'
import { IconEdit } from '@arco-design/web-react/icon'
import React, { useContext, useEffect, useState } from 'react'
import { context } from '@//store'
import { updatePage } from '@//utils/strapi'
import { BASE_URL } from '@//constants/env'
import * as ReactDOMServer from 'react-dom/server'

import './style.scss'
import { RHtml } from '@//views/render-html'

const Header = Layout.Header
const FormItem = Form.Item

const emptyNode = () => <span className="empty">未设置</span>

export const LowCodeHeader = () => {
  const { pageInfo, setPageInfo, params, components, width = 320, height = 600 } = useContext(context)
  const [headerInfo, setHeaderInfo] = useState<Array<{ label: string; value: string | React.ReactNode }>>([])
  const [form] = Form.useForm()

  const _updatePage = async () => {
    if (params?.id) {
      await updatePage(+params.id, components)
    }
  }

  const previewPage = () => {
    const url = `${BASE_URL}/preview/${params?.id}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  useEffect(() => {
    const tempHeaderInfo = [
      {
        label: '页面标题',
        value: pageInfo?.title || emptyNode()
      },
      {
        label: '平台',
        value: pageInfo?.platform || emptyNode()
      }
    ]
    setHeaderInfo(tempHeaderInfo)
  }, [pageInfo])

  const handleEdit = () => {
    if (!setPageInfo) {
      return
    }
    Modal.confirm({
      content: (
        <Form
          form={form}
          labelCol={{
            style: { flexBasis: 90 }
          }}
          wrapperCol={{
            style: { flexBasis: 'calc(100% - 90px)' }
          }}
        >
          <FormItem label="页面标题" field="title" rules={[{ required: true }]}>
            <Input placeholder="--请输入--" />
          </FormItem>
          <FormItem label="平台" required field="platform" rules={[{ required: true }]}>
            <Select placeholder="--请选择--" options={['PC', 'H5']} />
          </FormItem>
        </Form>
      ),
      okButtonProps: {
        status: 'danger'
      },
      onOk: async () => {
        await form.validate().then((res: IPageInfo) => {
          setPageInfo(res)
        })
      }
    })
  }
  const getHtml = () => {
    console.log(ReactDOMServer.renderToString(<RHtml width={width} height={height} components={components} />))
  }
  return (
    <Header className="header">
      <div className="page-info">
        <Descriptions colon=" :" size="large" layout="inline-horizontal" data={headerInfo} />
        <IconEdit className="edit" onClick={handleEdit} />
      </div>
      <div className="btn-group">
        <Button onClick={() => _updatePage()} type="primary">
          保存
        </Button>
        <Button onClick={() => previewPage()} status="warning">
          预览
        </Button>
        <Button type="secondary" onClick={() => getHtml()}>
          获取html
        </Button>
      </div>
    </Header>
  )
}
