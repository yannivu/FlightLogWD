import * as ENV from '../environment.js';
import Parse from 'parse';

// Initialize Parse
const appId = ENV.REACT_APP_PARSE_APP_ID;
const jsKey = ENV.REACT_APP_PARSE_JAVASCRIPT_KEY;
const serverUrl = ENV.REACT_APP_PARSE_HOST_URL;

Parse.initialize(appId, jsKey);
Parse.serverURL = serverUrl;

export default Parse;
