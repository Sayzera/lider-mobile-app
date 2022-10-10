import axios from 'axios';
import { config } from './config';

export default axios.create({
  baseURL: config.local ? config.localUrl : config.productionUrl,
  headers: {
    'Content-type': 'application/json',
  },
});
