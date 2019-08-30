import React from 'react';
import { Icon } from 'antd';
import { formatLang } from '@/common/constants/const.define';

export const columns = ({ removeAction, getColumnSearchProps, printAction, editAction }: any) => [
  {
    title: '',
    key: 'id',
    render: (value: any, rowValue: any) => (
      <div>
        {value.IsUserGoldTime ? (
          ''
        ) : (
          <Icon
            type="edit"
            style={{ color: 'blue' }}
            onClick={() => (editAction ? editAction(rowValue) : null)}
          />
        )}
      </div>
    ),
  },
  {
    title: formatLang('component.UserName.label'),
    dataIndex: 'UserName',
    key: 'UserName',
    width: '20%',
    ...getColumnSearchProps('UserName'),
    sorter: true,
  },
  {
    title: formatLang('component.UserType.label'),
    dataIndex: 'UserType',
    key: 'UserType',
    sorter: true,
  },
  {
    title: formatLang('component.FullName.label'),
    dataIndex: 'FullName',
    key: 'FullName',
    width: '20%',
    sorter: true,
  },
  {
    title: formatLang('component.PhoneNumber.label'),
    dataIndex: 'PhoneNumber',
    key: 'PhoneNumber',
    sorter: true,
  },
  {
    title: formatLang('component.BirthDate.label'),
    dataIndex: 'BirthDate',
    key: 'BirthDate',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
  },
  {
    title: 'Active',
    dataIndex: 'isLocked',
    key: 'isLocked',
    render: (value: any) => (value ? 'true' : 'false'),
  },
  {
    title: 'Delete',
    key: 'delete',
    render: (value: any, rowValue: any) => (
      <div style={{ textAlign: 'center' }}>
        {value.IsUserGoldTime ? (
          ''
        ) : (
          <Icon
            type="delete"
            style={{ color: 'blue' }}
            onClick={() => (removeAction ? removeAction(rowValue) : null)}
          />
        )}
      </div>
    ),
  },
];
