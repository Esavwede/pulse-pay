import * as paymentAPI from "../../src/payment/flutterwave.service"
import PaymentService from "../../src/payment/payment.service"

// Mock flutterwave-node-v3 at the top of your test file
jest.mock("flutterwave-node-v3", () =>
  jest.fn(() => ({
    Charge: {
      bank_transfer: jest.fn().mockResolvedValue({}), // Provide a default mock
    },
    Transaction: {
      verify_by_tx: jest.fn().mockResolvedValue({}),
    },
  })),
)

describe("let it work", () => {
  it("should be true", async () => {
    const mockReturnValue = {
      status: "success",
      message: "Charge initiated",
      meta: {
        authorization: {
          transfer_reference: "MockFLWRef-1689847855598",
          transfer_account: "0067100155",
          transfer_bank: "Mock Bank",
          account_expiration: 1689847855598,
          transfer_note: "Mock note",
          transfer_amount: "1500.00",
          mode: "banktransfer",
        },
      },
    }

    const paymentService = new PaymentService()
    const mockChargeViaBankTransfer = jest
      .fn()
      .mockResolvedValue(mockReturnValue)

    jest
      .spyOn(paymentAPI, "chargeViaBankTransfer")
      .mockImplementation(mockChargeViaBankTransfer)
    await paymentService.processPayment({
      name: "name",
      amount: 1000,
      email: "email@gmail.com",
    })

    expect(mockChargeViaBankTransfer).toHaveBeenCalledTimes(1)
    expect(1).toBe(1)
  })
})
