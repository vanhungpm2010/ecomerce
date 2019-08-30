import React from 'react';
import { Icon } from 'antd';

export const columns = ({ editAction, deleteAction }: any) => [
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    render: (dataIndex: string, rowValue: any) => (
      <div>
        {dataIndex && (dataIndex.toString().match(/tmp/) || !dataIndex) ? (
          <div>
            <Icon type="delete" style={{ color: 'blue' }} onClick={() => deleteAction(dataIndex)} />
            <br />
          </div>
        ) : (
          ''
        )}
        <Icon type="edit" style={{ color: 'blue' }} onClick={() => editAction(rowValue)} />
      </div>
    ),
  },
  {
    title: 'Address 1',
    dataIndex: 'Address1',
    key: 'Address1',
  },
  {
    title: 'Address 2',
    dataIndex: 'Address2',
    key: 'Address2',
  },
  {
    title: 'State',
    dataIndex: 'State',
    key: 'State',
  },
  {
    title: 'Postal Code',
    dataIndex: 'PostalCode',
    key: 'PostalCode',
  },
  {
    title: 'Phone 1',
    dataIndex: 'Phone1',
    key: 'Phone1',
  },
  {
    title: 'Fax Num',
    dataIndex: 'Fax',
    key: 'Fax',
  },
  {
    title: 'Email Address',
    dataIndex: 'Email',
    key: 'Email',
  },
];
