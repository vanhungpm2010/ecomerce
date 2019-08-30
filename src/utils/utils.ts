import moment from 'moment';
import { dateFormatList } from '@/common/constants/const.define';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);

const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getRoleNameFromRoleType = (roleType: number): string => {
  let roleName = 'guest';
  switch (roleType) {
    case 1:
      roleName = 'admin';
      break;
    case 2:
      roleName = 'user';
      break;
    default:
      roleName = 'guest';
      break;
  }
  return roleName;
};

export { isAntDesignProOrDev, isAntDesignPro, isUrl };

export function setLangId(LangId: string) {
  if (!LangId || LangId === '') {
    return localStorage.removeItem('LangId');
  }
  return localStorage.setItem('LangId', LangId);
}

export function getLangId() {
  const LangId = localStorage.getItem('LangId');
  if (!LangId) return '';

  return LangId;
}

export function formatDateForSendingData(value: any): string | undefined {
  if (!value) {
    return undefined;
  }

  return moment(new Date(value) || null).format(dateFormatList[2]);
}

export function removeTempId(item: any) {
  const tmp = { ...item };
  if (tmp.id && typeof tmp.id === 'string' && tmp.id.match(/tmp/)) {
    tmp.id = undefined;
  }

  console.log('removeTempId', tmp);
  return tmp;
}

export function roundFloat(data: number, fix: number = 2) {
  return Number(data.toFixed(fix));
}

export function getADateFromADate(theDay: Date = new Date(), distanceOfDate: number): Date {
  return new Date(new Date(theDay).getTime() + 10 * 86400000);
}

export function calcDistanceOfDays(from: Date, to: Date) {
  console.log('calcDistanceOfDays', from, to);

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / MS_PER_DAY);
}
