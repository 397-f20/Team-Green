export const Validation = (_displayName, _password, _confirmPassword, setErrorMessage) => {
  //NEED TO ADD SIGN IN VALIDATION 
  if (_password.length < 6) {
      setErrorMessage('Error: password must be at least 6 characters');
      return false;
  }
  if (_password !== _confirmPassword) {
      setErrorMessage('Error: password fields do not match')
      return false;
  }
  if (_displayName === '') {
      setErrorMessage('Error: please enter a display name')
      return false;
  }
  return true;
}