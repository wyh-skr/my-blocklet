import { useRequest } from 'ahooks';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';

import api from '../libs/api';

export default function BaseView() {
  const [form] = Form.useForm();

  const [editeable, setEditable] = useState(false);

  useRequest(() => api.get('/api/account'), {
    onSuccess(data) {
      if (data) {
        form.setFieldsValue(data);
      }
    },
  });

  const { loading: submitLoading, run: onSubmit } = useRequest((values) => api.post('/api/account', values), {
    manual: true,
    onSuccess(result) {
      if (result) {
        message.success('提交成功');
        setEditable(false);
      }
    },
  });

  return (
    <>
      <Form layout="vertical" size="large" onFinish={onSubmit} form={form} disabled={!editeable}>
        <Form.Item label="用户名" name={'name'} rules={[{ required: true, message: '请输入昵称' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name={'email'}
          rules={[
            { required: true, message: '请输入邮箱' },
            { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱' },
          ]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name={'phone'}
          rules={[
            { required: true, message: '请输入手机号' },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '请输入正确的手机号',
            },
          ]}>
          <Input placeholder="请输入手机号" />
        </Form.Item>
      </Form>
      {!editeable ? (
        <Button type="primary" disabled={false} onClick={() => setEditable(true)}>
          编辑
        </Button>
      ) : (
        <Button type="primary" danger loading={submitLoading} onClick={() => form.submit()}>
          保存
        </Button>
      )}
    </>
  );
}
