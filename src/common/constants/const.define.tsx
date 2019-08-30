// File: const.define.tsx
// config constants for the system
import { formatMessage } from 'umi-plugin-react/locale';

export const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'YYYY-MM-DD', 'YYYY/MM/DD'];
export enum ACTION {
  ADD = 'ACTION_ADD',
}

// === cosnt http request ===
// export const BASE_URL = 'http://localhost:3010/api/v1';
export const BASE_URL = ' http://ecommerce.nichietsuvn.com/api/v1';

// === common message ===
export const commonMsg = {
  delete: {
    title: 'Are you sure delete this?',
  },
  validate: {
    isRequire: 'This field is required!',
    number: 'The value have to be a number',
  },
};

export const pattern = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  number: /[0-9]+/,
  float: /[+-]?([0-9]*[.])?[0-9]+/,

  str_email: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
  str_number: '[0-9]+',
  str_float: '[+-]?([0-9]*[.])?[0-9]+',
};

export enum USER_ROLE {
  ADMIN = '1',
  USER = '2',
}

export const UploadedFolderType = {
  Category: '1',
  Stores: '2',
};

export const formatDate = {
  YYYYMMDD: 'YYYY/MM/DD',
};
export const formatLang = (id: string) => {
  return formatMessage({ id });
};
