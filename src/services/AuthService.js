import Parse from 'parse';

// Initialize Parse (make sure to replace with your actual Parse server URL and application ID)
Parse.initialize('YOUR_APP_ID', 'YOUR_JAVASCRIPT_KEY');
Parse.serverURL = 'https://your-parse-server.com/parse';

export const createUser = async (userData) => {
  const user = new Parse.User();
  user.set('firstName', userData.firstName);
  user.set('lastName', userData.lastName);
  user.set('email', userData.email);
  user.set('username', userData.email); // Assuming email as username
  user.set('password', userData.password);
  try {
    const userCreated = await user.signUp();
    return userCreated;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const loginUser = async (credentials) => {
  try {
    const user = await Parse.User.logIn(credentials.email, credentials.password);
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export const getCurrentUser = () => {
  return Parse.User.current();
};
