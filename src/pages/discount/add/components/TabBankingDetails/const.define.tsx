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
    title: 'Bank Name',
    dataIndex: 'BankName',
    key: 'BankName',
  },
  {
    title: 'Address 2',
    dataIndex: 'BankAddress',
    key: 'BankAddress',
  },
  {
    title: 'Account Number',
    dataIndex: 'AccountNumber',
    key: 'AccountNumber',
  },
  {
    title: 'Postal Code',
    dataIndex: 'SWIFTCode',
    key: 'SWIFTCode',
  },
];
