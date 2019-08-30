// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // GET POST 可省略
  'GET /api/v1/service-order-form': (req: any, res: any) => {
    const { query } = req;
    setTimeout(() => {
      if (query && query.page > 1) {
        res.send({
          status: 'ok',
          message: 'Success',
          data: [
            {
              key: '11',
              ServiceOrder: 'John Brown 11',
              OrderRefDate: 11,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '12',
              ServiceOrder: 'John Brown 12',
              OrderRefDate: 12,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '13',
              ServiceOrder: 'John Brown 13',
              OrderRefDate: 13,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '14',
              ServiceOrder: 'John Brown 14',
              OrderRefDate: 14,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '15',
              ServiceOrder: 'John Brown 15',
              OrderRefDate: 15,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '16',
              ServiceOrder: 'John Brown 16',
              OrderRefDate: 16,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '17',
              ServiceOrder: 'John Brown 17',
              OrderRefDate: 17,
              AccountName: 'New York No. 1 Lake Park',
            },
          ],
          totalRecorder: 20,
          currentPage: 1,
        });
      } else if (query && query.serviceOrder) {
        res.send({
          status: 'ok',
          message: 'Success',
          data: [
            {
              key: '11',
              ServiceOrder: 'John Brown 11',
              OrderRefDate: 11,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '12',
              ServiceOrder: 'John Brown 12',
              OrderRefDate: 12,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '13',
              ServiceOrder: 'John Brown 13',
              OrderRefDate: 13,
              AccountName: 'New York No. 1 Lake Park',
            },
          ],
          totalRecorder: 10,
          currentPage: 1,
        });
      } else {
        res.send({
          status: 'ok',
          message: 'Success',
          data: [
            {
              key: '1',
              ServiceOrder: 'John Brown 1',
              OrderRefDate: 1,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '2',
              ServiceOrder: 'John Brown 2',
              OrderRefDate: 2,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '3',
              ServiceOrder: 'John Brown 3',
              OrderRefDate: 3,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '4',
              ServiceOrder: 'John Brown 4',
              OrderRefDate: 4,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '5',
              ServiceOrder: 'John Brown 5',
              OrderRefDate: 5,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '6',
              ServiceOrder: 'John Brown 6',
              OrderRefDate: 6,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '7',
              ServiceOrder: 'John Brown 7',
              OrderRefDate: 7,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '8',
              ServiceOrder: 'John Brown 8',
              OrderRefDate: 8,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '9',
              ServiceOrder: 'John Brown 9',
              OrderRefDate: 9,
              AccountName: 'New York No. 1 Lake Park',
            },
            {
              key: '10',
              ServiceOrder: 'John Brown 10',
              OrderRefDate: 10,
              AccountName: 'New York No. 1 Lake Park',
            },
          ],
          totalRecorder: 20,
          currentPage: 1,
        });
      }
    }, 2000);
  },
  'DELETE /api/v1/service-order-form': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [
        {
          key: '2',
          ServiceOrder: 'John Brown 2',
          OrderRefDate: 2,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '3',
          ServiceOrder: 'John Brown 3',
          OrderRefDate: 3,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '4',
          ServiceOrder: 'John Brown 4',
          OrderRefDate: 4,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '5',
          ServiceOrder: 'John Brown 5',
          OrderRefDate: 5,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '6',
          ServiceOrder: 'John Brown 6',
          OrderRefDate: 6,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '7',
          ServiceOrder: 'John Brown 7',
          OrderRefDate: 7,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '8',
          ServiceOrder: 'John Brown 8',
          OrderRefDate: 8,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '9',
          ServiceOrder: 'John Brown 9',
          OrderRefDate: 9,
          AccountName: 'New York No. 1 Lake Park',
        },
        {
          key: '10',
          ServiceOrder: 'John Brown 10',
          OrderRefDate: 10,
          AccountName: 'New York No. 1 Lake Park',
        },
      ],
      totalRecorder: 10,
      currentPage: 1,
    });
  },
  'GET /api/v1/service-order-form/BHEntity': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      defaultValue: 'Florence Goh',
      defaultId: 1,
      data: [
        {
          id: '1',
          value: 'Florence Goh',
        },
        {
          id: '2',
          value: 'Fui Ting',
        },
        {
          id: '3',
          value: 'Ganesha Karuppaiya',
        },
        {
          id: '4',
          value: 'Gary Wong',
        },
      ],
    });
  },
  'GET /api/v1/service-order-form/BHEntityId': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [
        { Department: 1 },
        { Position: 2 },
        { NoticeAddress: 'qqqqqq' },
        { Email: 'abc@gmail.com' },
        { Tel: 'Tel' },
        { Cell: 'Cell' },
        { Fax: 'Fax' },
      ],
    });
  },
  'GET /api/v1/service-order-form/AccountingManagerById': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [{ Email: 'abc@gmail.com' }, { Tel: 'Tel' }, { Cell: 'Cell' }, { Fax: 'Fax' }],
    });
  },
  'GET /api/v1/service-order-form/Currency': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [
        {
          id: '1',
          value: 'US Dollar',
        },
        {
          id: '2',
          value: 'Euro',
        },
        {
          id: '3',
          value: 'Singapore Dollar',
        },
        {
          id: '4',
          value: 'Gary Wong',
        },
      ],
    });
  },
  'GET /api/v1/service-order-form/companyName': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [
        {
          id: '1',
          value: 'TELEKOM MALAYSIA (HONG KONG) LIMITED',
        },
        {
          id: '2',
          value: 'Test Customer',
        },
      ],
    });
  },
  'GET /api/v1/service-order-form/BusinessAddress': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [
        {
          id: '1',
          value: 'fatbuta, qửt, Ho Chi Minh, 2340',
        },
        {
          id: '2',
          value: 'MYT, Malyasia',
        },
        {
          id: '3',
          value: ' tphcm,tphc,',
        },
      ],
    });
  },
  'GET /api/v1/service-order-form/ContactPerson': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [
        {
          id: '1',
          value: 'Master  Test Customer',
        },
        {
          id: '2',
          value: 'Mr  Nguyen Chuan',
        },
        {
          id: '3',
          value: 'Mr  nhut minh',
        },
      ],
    });
  },
  'GET /api/v1/service-order-form/dataSelect': (req, res) => {
    res.send({
      status: 'ok',
      message: 'Success',
      data: [
        { Address1: 'Address1' },
        { Address2: 'Address2' },
        { City: 'City' },
        { Country: 'Country' },
        { PostalCode: 'Postal Code' },
        { Contact: 'Contact' },
        { Fax: 'Fax' },
        { Phone: 'Phone' },
        { Email: 'Email' },
      ],
    });
  },
};
