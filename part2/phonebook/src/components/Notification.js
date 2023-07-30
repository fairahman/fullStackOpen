const Notification = ( {message} ) => {
  if (message === null) {
    return null;
  }
  let notificationClass = '';
  if (message.includes('successfully')) {
    notificationClass = 'success';
  } 
  else notificationClass = 'error';
  return (
    <div className={notificationClass}>
      {message}
    </div>
  ) 
}
export default Notification;