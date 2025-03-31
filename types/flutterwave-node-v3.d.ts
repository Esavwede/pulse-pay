// src/types/flutterwave-node-v3.d.ts
declare module "flutterwave-node-v3" {
  interface ChargeMethods {
    bank_transfer: (params: any) => Promise<any>
    // add any other methods if needed
  }

  interface TransactionMethods {
    verify_by_tx: (params: any) => Promise<any>
  }

  class Flutterwave {
    public Charge: ChargeMethods

    public Transaction: TransactionMethods
    constructor(publicKey: string, secretKey: string)
  }

  export = Flutterwave
}
