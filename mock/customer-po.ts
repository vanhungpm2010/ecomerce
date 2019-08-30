// === service mock ===

function randomNumber({ min, max }: { min: number; max: number }) {
  const random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomString(length: number) {
  const strValues = 'abcdefghijklmnopqxyz1234567890';
  let strResult = '';

  for (let i = 0; i < length; i++) {
    strResult += strValues.charAt(Math.round(strValues.length * Math.random()));
  }

  return strResult;
}

function makeEmail() {
  return `${randomString(10)}@nichietsu.com`;
}

export default {
  // Object return data
  'GET /api/v1/customer-po': (req: any, res: any) => {
    setTimeout(() => {
      const totalElement = 100;
      const data: any = {
        status: 'ok',
        message: 'Success',
        data: {
          result: [],
          totalElement,
          currentPage: 1,
        },
      };

      for (let i = 0; i < 10; i += 1) {
        data.data.result.push({
          id: i,
          Quantity: randomNumber({ min: 1000, max: 9999 }),
          PurchaseOrderNo: `#${randomNumber({ min: 1000, max: 9999 })}`,
          revision: '',
          AccountName: 'garywong',
          attentionName: 'Gary Wong',
          DateCreated: randomDate(new Date(2018, 0, 1), new Date()),
          totalPaidAmt: randomNumber({ min: 1000, max: 9999 }),
          totalAmt: randomNumber({ min: 1000, max: 9999 }),
          orderBy: '',
          preview: '',
          sendEmail: makeEmail(),
        });
      }

      res.send(data);
    }, 2000);
  },
  'GET /api/v1/customer-po/1': (req: any, res: any) => {
    res.send({
      // === General info ===
      from: [{ id: 1, name: 'Test Vendor' }, { id: 2, name: 'Demo Vendor' }],
      PurchaseOrderId: `#${randomNumber({ min: 1000, max: 9999 })}`,
      Rev: `Rev #${randomNumber({ min: 1000, max: 9999 })}`,
      AccountLocation: [{ id: 1, name: 'MYT, Malaysia' }, { id: 2, name: 'HCMC, Vietnam' }],
      IssueBy: 'Nam', // TODO: missing field, need to confirm
      QuotationId: [{ id: 1, name: 'Quot_Vendor_123' }, { id: 2, name: 'Others' }],

      // === info tab 1 ===
      Attention: [{ id: 1, name: 'Master Test Vendor' }, { id: 2, name: 'Master Demo Vendor' }],
      Email: makeEmail(),
      date: randomDate(new Date(2018, 0, 1), new Date()),
      fax: randomNumber({ min: 1000000000, max: 9999999999 }),
      tel: randomNumber({ min: 1000000000, max: 9999999999 }),
      cc: '',

      // === info tab 2 ===
      PurchaseValidity: randomDate(new Date(2018, 0, 1), new Date()),
      ContractTerm: 'Q3',
      ServiceActivatedDate: randomDate(new Date(2018, 0, 1), new Date()),
      PaymentTerm: 'Q4',
      currency: [{ id: 1, name: 'US Dollar' }, { id: 2, name: 'Euro' }],
      tax: 0.5,
      TerminationNotice: randomString(10),
      TerminationPenalty: randomString(10),
      SLA: '',
      OperationsMaintenance: '',
      ServiceExpiry: randomDate(new Date(2018, 0, 1), new Date()),
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
          bandwidth: randomNumber({ min: 1000, max: 150000 }),
          capacity: randomNumber({ min: 1000, max: 150000 }),
          charge: 5,
          des: '',
          qty: 'qty',
        },
      ],
      GSTID: randomNumber({ min: 1000, max: 150000 }),
      GSTPercentage: randomNumber({ min: 1000, max: 150000 }),
      ShippingAndHandling: '',
      SubTotal: randomNumber({ min: 1000, max: 150000 }),
      paidAmt: randomNumber({ min: 1000, max: 150000 }),
      taxAmt: randomNumber({ min: 1000, max: 150000 }),
      totalAmt: randomNumber({ min: 1000, max: 150000 }),

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
  },
  'POST /api/v1/customer-po': (req: any, res: any) => {
    const data = {};
    setTimeout(() => {
      res.send(data);
    }, 2000);
  },
  'PATCH /api/v1/customer-po': (req: any, res: any) => {
    const data = {};
    setTimeout(() => {
      res.send(data);
    }, 2000);
  },
  'DELETE /api/v1/customer-po': (req: any, res: any) => {
    const data = {};
    setTimeout(() => {
      res.send(data);
    }, 2000);
  },
};
