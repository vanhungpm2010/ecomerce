function randomNumber({ min, max }: { min: number; max: number }) {
  const random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}

export default {
  'DELETE /api/v1/customer-invoice': (req: any, res: any) => {
    setTimeout(() => {
      const data = { status: 'ok' };
      res.send(data);
    }, 2000);
  },
  'GET /api/v1/customer-invoice': (req: any, res: any) => {
    setTimeout(() => {
      const totalElement = 1000;
      const pageSize = 10;

      const data: any = {
        status: 'ok',
        message: 'Success',
        data: {
          result: [],
          totalElement,
          currentPage: 1,
        },
      };

      for (let i = 0; i < pageSize; i += 1) {
        data.data.result.push({
          addAmt: randomNumber({ min: 1, max: 5000 }),
          plReport: '',
          invoiceNo: `#${randomNumber({ min: 1, max: 5000 })}`,
          poNumber: randomNumber({ min: 1, max: 5000 }),
          revNo: randomNumber({ min: 1, max: 5000 }),
          accName: 'GaryVong',
          attname: '',
          invoiceDate: new Date(),
          validTillDate: new Date(),
          totalRecDAmt: randomNumber({ min: 1, max: 5000 }),
          totalInvDAmt: randomNumber({ min: 1, max: 5000 }),
          createBy: 'Gary',
          oldInvoiceNo: randomNumber({ min: 1, max: 5000 }),
          preview: 'None',
          previewInvoice: 'None',
          sendMail: '',
          delete: '',
        });
      }
      res.send(data);
    }, 2000);
  },
  'GET /api/v1/customer-report-list': (req: any, res: any) => {
    setTimeout(() => {
      const totalElement = 1000;
      const pageSize = 10;

      const data: any = {
        status: 'ok',
        message: 'Success',
        data: {
          result: [],
          totalElement,
          currentPage: 1,
        },
      };

      for (let i = 0; i < pageSize; i += 1) {
        data.data.result.push({
          addAmt: randomNumber({ min: 1, max: 5000 }),
          plReport: '',
          invoiceNo: `#${randomNumber({ min: 1, max: 5000 })}`,
          poNumber: randomNumber({ min: 1, max: 5000 }),
          revNo: randomNumber({ min: 1, max: 5000 }),
          accName: 'GaryVong',
          attname: '',
          invoiceDate: new Date(),
          validTillDate: new Date(),
          totalRecDAmt: randomNumber({ min: 1, max: 5000 }),
          totalInvDAmt: randomNumber({ min: 1, max: 5000 }),
          createBy: 'Gary',
          oldInvoiceNo: randomNumber({ min: 1, max: 5000 }),
          preview: 'None',
          previewInvoice: 'None',
          sendMail: '',
          delete: '',
        });
      }
      res.send(data);
    }, 2000);
  },
};
