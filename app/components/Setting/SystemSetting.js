/**
 * @Summary 系统设置
 * @Author: hefan
 * @Date: 2019-09-11 15:30:36
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-17 19:11:08
 */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input, Icon } from 'antd'

const { dialog } = require('electron').remote

const FormItem = Form.Item

const formItemLayout = {
  colon: false,
  labelCol: { span: 7 },
  wrapperCol: { span: 14, offset: 1 },
}

@connect(({ file }) => ({
  path: file.currentFilePath,
}))
@Form.create()
class SystemSetting extends PureComponent {
  static propTypes = {
    form: PropTypes.objectOf(PropTypes.object).isRequired,
    path: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  handleOpenDir = () => {
    const {
      form: {
        setFieldsValue,
      },
      dispatch,
      path,
    } = this.props
    const dir = dialog.showOpenDialogSync({
      defaultPath: path,
      properties: ['openDirectory', 'createDirectory'],
    })
    if (dir) {
      setFieldsValue({
        path: dir[0],
      })
      dispatch({
        type: 'file/setPath',
        payload: {
          currentFilePath: dir[0],
        },
      })
    }
  }

  render() {
    const {
      form: {
        getFieldDecorator,
      },
      path,
    } = this.props

    return (
      <Form>
        <FormItem label="文档目录" {...formItemLayout}>
          {
            getFieldDecorator('path', {
              initialValue: path,
            })(
              <Input
                prefix={<Icon type="folder" />}
                onClick={this.handleOpenDir}
                readOnly
              />,
            )
          }
        </FormItem>
      </Form>
    )
  }
}

export default SystemSetting
