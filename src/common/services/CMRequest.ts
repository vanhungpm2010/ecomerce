/* ===
 File: CMRequest.ts
 Using: request api
 Ref: https://github.com/umijs/umi-request

 For Example:
    // requestType: 'form', header will automatically bring application/x-www-form-urlencoded
    request('/api/v1/some/api', { method:'post', requestType: 'form', data: {foo: 'bar'} });

 */

import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';

import { BASE_URL } from '../constants/const.define';
import { getToken } from '@/utils/authority';
import { getLangId } from '@/utils/utils';

let CMRequest: any = null;

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'The data was deleted successfully.',
  400: 'The request was made with an error and the server did not perform any operations to create or modify data.',
  401: 'User does not have permission (token, username, password is incorrect).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request is made for a record that does not exist and the server does not operate.',
  406: 'The format of the request is not available.',
  410: 'The requested resource is permanently deleted and will not be retrieved.',
  422: 'A validation error occurred when creating an object.',
  500: 'An error occurred on the server. Please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
  504: 'The gateway timed out.',
};

const errorHandler = (error: { response: Response; data: any }): void => {
  const { response, data } = error;
  console.log('error : ', response);
  if (response && response.status) {
    const errorText = data.message || codeMessage[response.status];
    const { status } = response;

    notification.error({
      // message: `Request error ${status}: ${url}`,
      message: `[${status}] Cannot excute the request ...!`,
      description: errorText,
    });

    switch (response.status) {
      case 401:
        router.push('/user/login');
        break;
      default:
        break;
    }
  }
  console.log('data: ', data);
  return data;
};

export const initialize = (token: string, langId: string = ''): void => {
  let authorization = token;
  let id = langId;

  if (!token || token === '') {
    authorization = getToken();
  }
  if (!langId || langId === '') {
    id = getLangId();
  }

  CMRequest = extend({
    maxCache: 10,
    prefix: '',
    suffix: '',
    errorHandler,
    headers: {
      Authorization: authorization,
      LangId: id,
    },
    // params: { GlobalParam: 'value' },
  });

  // request interceptor, change url or options.
  CMRequest.interceptors.request.use((url: string, options: any) => {
    let tmpUrl = url;
    let isRunIntercepter = false;

    if (url && !url.toLocaleLowerCase().match(/^http:\/\//)) {
      tmpUrl = BASE_URL + tmpUrl;
    } else {
      isRunIntercepter = true;
    }

    return {
      url: `${tmpUrl}`,
      options: { ...options, interceptors: isRunIntercepter },
    };
  });
};

function getRequest() {
  if (!CMRequest) initialize('');
  return CMRequest;
}

// === custom interceptor ===
// CMRequest.interceptors.response.use((response) => {
//     const codeMaps = {
//         502: 'Gateway error. ',
//         503: 'The service is unavailable, the server is temporarily overloaded or maintained. ',
//         504: 'The gateway timed out. ',
//     };
//     message.error(codeMaps[response.status]);
//     return response;
// });

export default getRequest();
