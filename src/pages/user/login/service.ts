import request from '@/common/services/CMRequest';
import { FromDataType } from './index';

export async function accountLogin(params: FromDataType) {
  return request('/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
