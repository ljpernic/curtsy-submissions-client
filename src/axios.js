//////// THIS IS WHAT IS CREATING OUR HEADERS. IT ALLOWS FOR ACCESS TO PROTECTED RESOURCES VIA AUTHORIZATION HEADERS. ////////
//////// IF THERE IS A READER IN LOCAL STORAGE, IT PARSES IT AND SETS THE TOKEN IN THE HEADER FOR AUTHORIZATION. ////////

import axios from 'axios';
axios.defaults.baseURL = 'https://acolyte-submissions-api.heroku.com/api/v1';

axios.interceptors.request.use(function (req) {
  const reader = localStorage.getItem('reader');
//  console.log(`Client-side axios reader: ` + JSON.stringify(reader))                                // THIS SETS THE LOGGED-IN READER IN LOCAL STORAGE AS CONST READER. 
  if (reader) {
    const { token } = JSON.parse(localStorage.getItem('reader'));
    req.headers.authorization = `X-auth-token ${token}`;
//    console.log(`Client-side axios authorization: ` + JSON.stringify(req.headers.authorization))    // THIS PARSES OUT THE HEADER X-AUTH-TOKEN + THE TOKEN ITSELF.
    return req;
  }
  return req;
});
