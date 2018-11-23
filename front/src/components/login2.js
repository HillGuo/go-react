import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class LoginForm2 extends React.Component{
    
    
    handleSubmit=(e)=>{
        e.preventDefault();
       
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log('Received values of form: ',values);
            }
        });
        
    }

    render(){
        const {getFieldDecorator} =this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem hasFeedback='true' >
                {getFieldDecorator('userName',{
                    rules:[{required:true,message:'Please input your username!'}],
                })(
                    <Input prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>} placeholder="UserName"/>
                )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a  style={{float:'right'}} className="login-form-forgot" href="">Forgot password</a>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        )
    }
}
const LoginForm = Form.create()(LoginForm2);
export default LoginForm;