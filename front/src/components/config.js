import React from 'react'

import { Form, Input, Button,Select} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18 },
  };
class ConfigForm extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            disabled:false,
            running:false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.running){
            console.log('Send Notifition shutdown');
            this.setState({
                disabled:false,
                running:false
            })
        }else{
            this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch("/start").then(res=>{
                    return res.text();
                }).then(res=>{
                    console.log(res);
                    console.log(222);
                }).catch(error=>{
                    console.log(error);
                    console.log(3);
                })
                this.setState({
                    disabled:true,
                    running:true
                })
            }
            });
         }
      }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} >
        
            <FormItem {...formItemLayout}  label="server">
              
            {getFieldDecorator('server', {
                        rules: [{ required: true, message: 'Please input your server ip address!' }],
                })(
                <Input  placeholder="0.0.0.0"  disabled={this.state.disabled}   />
                        
            )}
            </FormItem>
     
            <FormItem {...formItemLayout}  label="server_port">
              
            {getFieldDecorator('server_port', {
                        rules: [{ required: true, message: 'Please input your server port !' }],
                })(
                <Input  type="number" placeholder="8080"  disabled={this.state.disabled}   />
                        
            )}
            </FormItem>
         
            <FormItem {...formItemLayout}  label="local">
              
            {getFieldDecorator('local', {
                        rules: [{ required: true, message: 'Please input your local ip address!' }],
                })(
                <Input  placeholder="0.0.0.0"  disabled={this.state.disabled}   />
                        
            )}
            </FormItem>
         
            <FormItem {...formItemLayout}  label="local_port">
              
            {getFieldDecorator('local_port', {
                        rules: [{ required: true, message: 'Please input your local port!' }],
                })(
                <Input  placeholder="1080"  disabled={this.state.disabled}   />
                        
            )}
            </FormItem>
       
            <FormItem {...formItemLayout}  label="password">
              
            {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input password' }],
                })(
                <Input  placeholder="password"  disabled={this.state.disabled}   />
                        
            )}
            </FormItem>
         
        
            <FormItem {...formItemLayout}  label="method">
              
            {getFieldDecorator('method', {
                        rules: [{ required: true, message: 'Please input crypo method' }],
                })(
                    <Select style={{ width: '100%' }} onChange={this.handleChange} disabled={this.state.disabled} >
                    <Option value="aes-256-cfb">aes-256-cfb</Option>
                  
                    </Select>
                        
            )}
            </FormItem>
          
          <FormItem>
            <Button style={{width:'100%'}} type={this.state.running?'danger':'primary'} htmlType="submit" className="login-form-button">
            {this.state.running?'Stop':'Start'}
          </Button>
            </FormItem>

        </Form>
        )
    }
}

export default Form.create()(ConfigForm);