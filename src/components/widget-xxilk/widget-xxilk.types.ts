export interface PaymentDetails {
    numberOfPayments: number;
    gracePeriodPaymentCount: number;
    principalAmount: number;
    monthlySplitPaymentAmount?: number;
    downPaymentAmount: number;
    monthlyPaymentStartingFromAmount?: number;
    interestRate: number;
    merchantCountry: "LVA";
    financingProductType: 'GRACE_PERIOD' | 'INSTALLMENT_CREDIT'
}