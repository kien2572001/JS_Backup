import React from 'react'
import axios from 'axios'
import { Form, Input } from 'antd'
import './style.scss'
import PropTypes from 'prop-types'
import addTemplateTasksAPI from '../../../../api/add-template-task'
import * as Extensions from '../../../../utils/extensions'

const toHalfWidth = (v) => v.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))

const ItemInput = ({ display, form, name, setCheckSpace, setInput, setConfilm }) => {
  const checkTemplateTaskNameExisted = async () => {
    try {
      const templateName = form.getFieldValue(name)
      if (templateName) {
        const response = await addTemplateTasksAPI.isTemplateTaskExisted({
          name: templateName.trim(),
        })
        if (response.data.length) {
          document.getElementById('validate_name').style.border = '1px solid red'
          return document.getElementById('error-msg').removeAttribute('hidden')
        }
      }
      return null
    } catch (error) {
      if (error.response?.status === 404) {
        axios.push('/404')
      }
      return null
    }
  }
  const onValueNameChange = (e) => {
    setConfilm(true)
    setCheckSpace(false)
    setInput(e.target.value)
    const temp = {}
    temp[name] = toHalfWidth(e.target.value)
    form.setFieldsValue(temp)
    checkTemplateTaskNameExisted()
    document.getElementById('error-msg').setAttribute('hidden', 'true')
    // document.getElementById('validate_name').style.border = '1px solid #e5e7eb'
  }

  const templateTaskNameValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('この項目は必須です'))
    }
    // if (value.match(Extensions.Reg.specialCharacter)) {
    //   return Promise.reject(new Error('使用できない文字が含まれています'))
    // }
    if (value.match(Extensions.Reg.onlyNumber)) {
      return Promise.reject(new Error('数字のみを含めることはできない'))
    }
    if (value.trim().length === 0) {
      return Promise.reject(new Error('1文字以上の文字を入力してください。'))
    }

    return Promise.resolve()
  }
  return (
    <>
      <Form.Item
        noStyle
        labelAlign="left"
        name={name}
        className="justify-evenly"
        rules={[
          {
            validator: templateTaskNameValidator,
          },
        ]}
      >
        <Input
          style={{ display: display ? 'none' : '' }}
          id="validate_name"
          type="text"
          onChange={onValueNameChange}
          placeholder="テンプレートタスク名l"
        />
      </Form.Item>
      <span
        id="error-msg"
        style={{
          color: '#ff3860',
          fontSize: '14px',
        }}
        className="text-red-600"
        hidden
      >
        このテンプレートタスク名は存在しています
      </span>
    </>
  )
}

export default ItemInput

ItemInput.propTypes = {
  display: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  setCheckSpace: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired,
  setConfilm: PropTypes.func.isRequired,
}
