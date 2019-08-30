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
    title: 'Code',
    dataIndex: 'orderCode',
    key: 'orderCode',
    width: '20%',
    sorter: true,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'ProductName',
    key: 'ProductName',
    width: '20%',
    ...getColumnSearchProps('ProductName'),
    sorter: true,
    render: (value: any) => (value ? value.ProductName : ''),
  },
  {
    title: 'Ngày order',
    dataIndex: 'orderDate',
    key: 'orderDate',
    width: '20%',
    sorter: true,
  },
  {
    title: 'User',
    dataIndex: 'Username',
    key: 'Username',
    width: '20%',
    ...getColumnSearchProps('Username'),
    sorter: true,
    render: (value: any) => (value ? value.Username : ''),
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
    sorter: true,
  },
  {
    title: 'Chi tiết',
    dataIndex: 'detail',
    key: 'detail',
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
