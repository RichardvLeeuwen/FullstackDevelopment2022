import { Form, Button } from 'react-bootstrap'
const LoginForm = ({ submitFunc, inputNameValue, inputNameChangeFunc, inputPasswordValue, inputPhoneChangeFunc }) => {
  return (
    <Form onSubmit={submitFunc}>
      <Form.Group>
        <Form.Label>username:</Form.Label> <input value={inputNameValue} id='usernameLogin' onChange={inputNameChangeFunc} />
        <br></br>
        <Form.Label>password:</Form.Label> <input value={inputPasswordValue} id='passwordLogin' onChange={inputPhoneChangeFunc} />
        <br></br>
        <Button id='loginbutton' type="submit">login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm