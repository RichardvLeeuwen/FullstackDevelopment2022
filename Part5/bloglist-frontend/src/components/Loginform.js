const LoginForm = ({ submitFunc, inputNameValue, inputNameChangeFunc, inputPasswordValue, inputPhoneChangeFunc }) => {
  return (
    <form onSubmit={submitFunc}>
      <div>
        username: <input value={inputNameValue} onChange={inputNameChangeFunc} />
        <br></br>
        password: <input value={inputPasswordValue} onChange={inputPhoneChangeFunc} />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm