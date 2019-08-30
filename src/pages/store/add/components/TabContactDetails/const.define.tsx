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
    title: 'Prefix',
    dataIndex: 'Prefix',
    key: 'Prefix',
  },
  {
    title: 'First Name',
    dataIndex: 'FirstName',
    key: 'FirstName',
  },
  {
    title: 'Middle Name',
    dataIndex: 'MiddelName',
    key: 'MiddelName',
  },
  {
    title: 'Last Name',
    dataIndex: 'LastName',
    key: 'LastName',
  },
  {
    title: 'Designation',
    dataIndex: 'Designation',
    key: 'Designation',
  },
  {
    title: 'Department',
    dataIndex: 'Department',
    key: 'Department',
  },
  {
    title: 'Phone 1',
    dataIndex: 'Tel',
    key: 'Tel',
  },
  {
    title: 'Phone 2',
    dataIndex: 'Phone',
    key: 'Phone',
  },
  {
    title: 'Fax Number',
    dataIndex: 'Fax',
    key: 'Fax',
  },
  {
    title: 'Email Address',
    dataIndex: 'Email',
    key: 'Email',
  },
];
