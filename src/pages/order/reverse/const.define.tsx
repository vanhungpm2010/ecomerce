import React from 'react';
import { Icon } from 'antd';

export const columns = ({ removeAction, getColumnSearchProps, printAction, editAction }: any) => [
  {
    title: '',
    key: 'id',
    render: (
      value: string,
      rowValue: any, // account-master/add
    ) => (
      <div>
        {/* <Icon
            type="printer"
            style={{ color: 'blue' }}
            onClick={() => (printAction ? printAction(rowValue) : null)}
          />
          <br /> */}
        <Icon
          type="edit"
          style={{ color: 'blue' }}
          onClick={() => (editAction ? editAction(rowValue) : null)}
        />
      </div>
    ),
  },
  {
    title: 'Account Name',
    dataIndex: 'AccountName',
    key: 'AccountName',
    width: '20%',
    ...getColumnSearchProps('AccountName'),
    sorter: true,
  },
  {
    title: 'Account Type',
    dataIndex: 'AccountType',
    key: 'AccountType',
    width: '20%',
    sorter: true,
    render: (value: number) => (value === 1 ? 'Customer' : 'Vendor'),
  },
  {
    title: 'Company Name',
    dataIndex: 'Company',
    key: 'Company',
    sorter: true,
    render: (value: any) => (value ? value.CompanyName : ''),
  },
  {
    title: 'Account software Ref Code',
    dataIndex: 'ReferenceCode',
    key: 'ReferenceCode',
    ...getColumnSearchProps('ReferenceCode'),
    sorter: true,
  },
  {
    title: 'Delete',
    key: 'delete',
    render: (value: string, rowValue: any) => (
      <div style={{ textAlign: 'center' }}>
        <Icon
          type="delete"
          style={{ color: 'blue' }}
          onClick={() => (removeAction ? removeAction(rowValue) : null)}
        />
      </div>
    ),
  },
];
