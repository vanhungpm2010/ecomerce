// === service mock ===
function randomNumber({ min, max }: { min: number; max: number }) {
  const random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}

export default {
  // Object return data
  'GET /api/v1/vendor-po': (req: any, res: any) => {
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
          id: i,
          Quantity: randomNumber({ min: 1000, max: 9999 }),
          PurchaseOrderNo: randomNumber({ min: 1000, max: 9999 }),
          revision: '',
          AccountName: 'garywong',
          attentionName: 'Gary Wong',
          DateCreated: new Date(),
          totalPaidAmt: randomNumber({ min: 1000, max: 9999 }),
          totalAmt: randomNumber({ min: 1000, max: 9999 }),
          orderBy: '',
          preview: '',
          sendEmail: '',
        });
      }

      res.send(data);
    }, 1000);
  },
  'POST /api/vendorPO/add': {
    status: 'ok',
  },
  'GET /api/v1/vendor-po/1': (req: any, res: any) => {
    setTimeout(() => {
      res.send({
        // === General info ===
        from: [{ id: 1, name: 'Test Vendor' }, { id: 2, name: 'Demo Vendor' }],
        PurchaseOrderId: '#123214',
        Rev: 'Rev #231',
        AccountLocation: [{ id: 1, name: 'MYT, Malaysia' }, { id: 2, name: 'HCMC, Vietnam' }],
        IssueBy: 'Nam', // TODO: missing field, need to confirm
        QuotationId: [{ id: 1, name: 'Quot_Vendor_123' }, { id: 2, name: 'Others' }],

        // === info tab 1 ===
        Attention: [{ id: 1, name: 'Master Test Vendor' }, { id: 2, name: 'Master Demo Vendor' }],
        Email: 'VendorTest@email.test.com',
        date: new Date('2019-06-24T09:08:26.166Z'),
        fax: '092312309021930',
        tel: '09302183213',
        cc: '',

        // === info tab 2 ===
        PurchaseValidity: new Date(),
        ContractTerm: 'Q3',
        ServiceActivatedDate: new Date(),
        PaymentTerm: 'Q4',
        currency: [{ id: 1, name: 'US Dollar' }, { id: 2, name: 'Euro' }],
        tax: 0.5,
        TerminationNotice: 'test data',
        TerminationPenalty: 'penalty',
        SLA: '',
        OperationsMaintenance: 'None',
        ServiceExpiry: new Date(),
        ServiceAvailability: '',
        Warranty: '',
        TransferOfTitle: '',
        ShippingTerm: '',
        ShippingMethod: 'Airport',
        AdditionalInformation: '',

        // === info tab 3 ===
        ProposalList: [
          {
            action: '',
            bandwidth: 150000,
            capacity: 300,
            charge: 5,
            des: '',
            qty: 'qty',
          },
        ],
        GSTID: 14123,
        GSTPercentage: 5,
        ShippingAndHandling: '',
        SubTotal: 500,
        paidAmt: 200,
        taxAmt: 1,
        totalAmt: 5000,

        // === info tab 4 ===
        documentInfo: [
          {
            action: '',
            docType: 'docx',
            docName: 'price report',
            doc: 'https://google.com.vn',
          },
        ],
      });
    }, 2000);
  },

  'GET /api/v1/vendor-invoice': (req: any, res: any) => {
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
          id: i,
          addAmt: randomNumber({ min: 100, max: 9999 }),
          plReport: '',
          invoiceNo: `#${randomNumber({ min: 1000, max: 9999 })}`,
          poNumber: randomNumber({ min: 1000, max: 9999 }),
          revNo: randomNumber({ min: 1000, max: 9999 }),
          accName: 'GaryWong',
          attname: '',
          invoiceDate: new Date(),
          validTillDate: new Date(),
          totalRecDAmt: randomNumber({ min: 1000, max: 9999 }),
          totalInvDAmt: randomNumber({ min: 1000, max: 9999 }),
          createBy: 'Gary',
          oldInvoiceNo: '',
          preview: '',
          previewInvoice: '',
          sendMail: '',
        });
      }

      res.send(data);
    }, 2000);
  },
};
