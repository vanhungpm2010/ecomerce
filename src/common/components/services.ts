import request from '@/common/services/CMRequest';

export async function sendEmail(params: any): Promise<any> {
  return request('/service/sendmail', {
    method: 'POST',
    data: params,
  });
}
