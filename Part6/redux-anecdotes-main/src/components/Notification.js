import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(props.notifications.text === null) {
    return null
  }
  return (
    <div style={style}>
      {props.notifications.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedNotifcation = connect(mapStateToProps)(Notification)
export default ConnectedNotifcation