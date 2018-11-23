import React from 'react'
import { Modal, Button } from 'antd';

class LoginModal extends React.Component {
  render() {
    const { visible, confirmLoading, ModalText } = this.props;
    return (
      <div>
        <Modal title="登录"
          visible={true}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="登录"
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

export default LoginModal
