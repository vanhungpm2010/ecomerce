export interface RecordValue {
  id: number;
  AccountName: string;
  AccountType: number;
  ReferenceCode: string;
  Company: {
    id: number;
    CompanyName: string;
  };
}
