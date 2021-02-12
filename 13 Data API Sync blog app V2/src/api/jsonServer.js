import axios from 'axios';

export default axios.create({
    baseURL: 'http://715e8d0ce3f4.ngrok.io'     //note: ngrok base url changes everytime we run ngrok server 
})  