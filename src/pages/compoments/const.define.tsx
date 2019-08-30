import React from 'react';
import { Icon, Button } from 'antd';

export const columns = ({ editAction, deleteAction, section }: any) => [
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    render: (dataIndex: string, rowValue: any) => (
      <div>
        <Icon type="delete" style={{ color: 'blue' }} onClick={() => deleteAction(dataIndex)} />
        <br />
        <Icon type="edit" style={{ color: 'blue' }} onClick={() => editAction(rowValue)} />
      </div>
    ),
  },
  {
    title: 'CID',
    dataIndex: 'CID',
    key: 'CID',
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    key: 'Description',
  },
  {
    title: 'Capacity',
    dataIndex: 'Capacity',
    key: 'Capacity',
  },
  {
    title: 'Bandwidth/ Part No',
    dataIndex: 'PartNo',
    key: 'PartNo',
  },
  {
    title: 'Qty',
    dataIndex: 'Quantity',
    key: 'Quantity',
  },
  {
    title: 'Charges',
    children: [
      { title: 'NRC', dataIndex: 'NRCCharge', key: 'NRCCharge' },
      { title: 'MRC', dataIndex: 'MRCCharge', key: 'MRCCharge' },
      { title: 'ARC', dataIndex: 'ARCCharge', key: 'ARCCharge' },
    ],
  },
];

export const docColumns = ({ editAction, deleteAction, preview }: any) => [
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    render: (dataIndex: string, rowValue: any) => (
      <div>
        {/* <Icon type="edit" style={{ color: 'blue' }} onClick={() => editAction(rowValue)} />
        <br /> */}
        <Icon type="delete" style={{ color: 'blue' }} onClick={() => deleteAction(dataIndex)} />
      </div>
    ),
  },
  {
    title: 'Document Type',
    dataIndex: 'DocumentType',
    key: 'DocumentType',
  },
  {
    title: 'Document Name',
    dataIndex: 'DocumentName',
    key: 'DocumentName',
  },
  {
    title: 'Preview',
    dataIndex: 'FileName',
    key: 'FileName',
    render: (dataIndex: string, rowValue: any) => (
      <Button onClick={() => preview(rowValue)}>Preview</Button>
    ),
  },
];
