import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('bruhaas-authority', JSON.stringify(proAuthority));
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}
