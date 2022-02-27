const LoginForm = ({ submitFunc, inputNameValue, inputNameChangeFunc, inputPasswordValue, inputPhoneChangeFunc }) => {
  return (
    <form onSubmit={submitFunc}>
      <div>
        username: <input value={inputNameValue} id='usernameLogin' onChange={inputNameChangeFunc} />
        <br></br>
        password: <input value={inputPasswordValue} id='passwordLogin' onChange={inputPhoneChangeFunc} />
      </div>
      <div>
        <button id='loginbutton' type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm