// Payment infrastructure for probate fees and services

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'bank_transfer' | 'card' | 'paystack' | 'crypto';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface Invoice {
  id: string;
  caseId: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  currency: 'NGN' | 'USD';
  dueDate: Date;
  issuedDate: Date;
  paidDate?: Date;
  status: InvoiceStatus;
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxable: boolean;
}

export interface Payment {
  id: string;
  invoiceId: string;
  caseId: string;
  amount: number;
  currency: 'NGN' | 'USD';
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  reference?: string;
  paidAt?: Date;
  failureReason?: string;
  metadata?: Record<string, any>;
}

export interface PaymentPlan {
  id: string;
  caseId: string;
  invoiceId: string;
  totalAmount: number;
  installments: Installment[];
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Installment {
  id: string;
  dueDate: Date;
  amount: number;
  status: PaymentStatus;
  paymentId?: string;
}

// Fee structure
export const feeStructure = {
  application: {
    name: 'Application Fee',
    amount: 10000,
    description: 'One-time application fee for case initiation',
  },
  processing: {
    name: 'Processing Fee',
    baseFee: 5000,
    percentageOfEstate: 0.005, // 0.5% of estate value
    maxFee: 100000,
    description: 'Processing fee based on estate value',
  },
  government: {
    name: 'Government Levy',
    amount: 2500,
    description: 'Government processing levy',
  },
  documentation: {
    name: 'Documentation Fee',
    amount: 3000,
    description: 'Fee for document preparation and certification',
  },
  transmission: {
    name: 'Transmission Fee',
    amount: 5000,
    description: 'Fee for transmitting probate to beneficiaries',
  },
};

export class PaymentManager {
  /**
   * Calculate total fees for a case
   */
  static calculateCaseFees(estateValue: number): number {
    const applicationFee = feeStructure.application.amount;
    const processingFee = Math.min(
      estateValue * feeStructure.processing.percentageOfEstate,
      feeStructure.processing.maxFee
    );
    const governmentLevey = feeStructure.government.amount;
    const documentationFee = feeStructure.documentation.amount;
    const transmissionFee = feeStructure.transmission.amount;

    return (
      applicationFee +
      processingFee +
      governmentLevey +
      documentationFee +
      transmissionFee
    );
  }

  /**
   * Generate invoice for a case
   */
  static generateInvoice(
    caseId: string,
    estateValue: number,
    clientName: string
  ): Invoice {
    const totalFees = this.calculateCaseFees(estateValue);
    const items: InvoiceItem[] = [
      {
        description: feeStructure.application.name,
        quantity: 1,
        unitPrice: feeStructure.application.amount,
        total: feeStructure.application.amount,
        taxable: true,
      },
      {
        description: feeStructure.processing.name,
        quantity: 1,
        unitPrice: Math.min(
          estateValue * feeStructure.processing.percentageOfEstate,
          feeStructure.processing.maxFee
        ),
        total: Math.min(
          estateValue * feeStructure.processing.percentageOfEstate,
          feeStructure.processing.maxFee
        ),
        taxable: true,
      },
      {
        description: feeStructure.government.name,
        quantity: 1,
        unitPrice: feeStructure.government.amount,
        total: feeStructure.government.amount,
        taxable: false,
      },
      {
        description: feeStructure.documentation.name,
        quantity: 1,
        unitPrice: feeStructure.documentation.amount,
        total: feeStructure.documentation.amount,
        taxable: true,
      },
      {
        description: feeStructure.transmission.name,
        quantity: 1,
        unitPrice: feeStructure.transmission.amount,
        total: feeStructure.transmission.amount,
        taxable: true,
      },
    ];

    return {
      id: `INV-${caseId}-${Date.now()}`,
      caseId,
      invoiceNumber: `INV-${caseId}-${new Date().getFullYear()}`,
      description: `Professional Probate Administration Services for ${clientName}`,
      amount: totalFees,
      currency: 'NGN',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      issuedDate: new Date(),
      status: 'sent',
      items,
      notes: 'Payment is due within 14 days of invoice date. Taxes apply where applicable.',
    };
  }

  /**
   * Create payment plan for installments
   */
  static createPaymentPlan(
    caseId: string,
    invoiceId: string,
    totalAmount: number,
    installmentCount: number = 3
  ): PaymentPlan {
    const installmentAmount = Math.ceil(totalAmount / installmentCount);
    const installments: Installment[] = [];

    for (let i = 0; i < installmentCount; i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + i + 1);

      installments.push({
        id: `INST-${invoiceId}-${i + 1}`,
        dueDate,
        amount:
          i === installmentCount - 1
            ? totalAmount - installmentAmount * (installmentCount - 1)
            : installmentAmount,
        status: 'pending',
      });
    }

    return {
      id: `PLAN-${invoiceId}`,
      caseId,
      invoiceId,
      totalAmount,
      installments,
      startDate: new Date(),
      endDate: new Date(Date.now() + installmentCount * 30 * 24 * 60 * 60 * 1000),
      status: 'active',
    };
  }

  /**
   * Process payment
   */
  static async processPayment(payment: Payment): Promise<Payment> {
    // Simulate payment processing
    // In real implementation, would integrate with Paystack or other gateway
    const processedPayment: Payment = {
      ...payment,
      status: 'processing',
      transactionId: `TXN-${Date.now()}`,
    };

    // Simulate async processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      ...processedPayment,
      status: 'completed',
      paidAt: new Date(),
    };
  }

  /**
   * Process refund
   */
  static async processRefund(payment: Payment): Promise<Payment> {
    if (payment.status !== 'completed') {
      throw new Error('Can only refund completed payments');
    }

    return {
      ...payment,
      status: 'refunded',
      paidAt: undefined,
    };
  }

  /**
   * Get payment status
   */
  static getPaymentStatus(payment: Payment): {
    isPaid: boolean;
    isProcessing: boolean;
    isFailed: boolean;
  } {
    return {
      isPaid: payment.status === 'completed',
      isProcessing: payment.status === 'processing',
      isFailed: payment.status === 'failed',
    };
  }

  /**
   * Calculate overdue amounts
   */
  static calculateOverdueAmount(invoice: Invoice): number {
    if (invoice.status !== 'overdue') return 0;
    return invoice.amount;
  }

  /**
   * Get payment history for case
   */
  static getPaymentHistory(payments: Payment[], caseId: string): Payment[] {
    return payments.filter((p) => p.caseId === caseId);
  }

  /**
   * Validate payment amount
   */
  static validatePaymentAmount(payment: Payment, invoice: Invoice): boolean {
    return payment.amount <= invoice.amount && payment.amount > 0;
  }

  /**
   * Get invoice details with tax calculation
   */
  static calculateInvoiceTotals(invoice: Invoice): {
    subtotal: number;
    tax: number;
    total: number;
  } {
    const taxableItems = invoice.items.filter((item) => item.taxable);
    const subtotal = taxableItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.075; // 7.5% VAT
    const total = subtotal + tax + invoice.items.filter((i) => !i.taxable).reduce((sum, i) => sum + i.total, 0);

    return { subtotal, tax, total };
  }
}

// Paystack integration constants
export const paystackConfig = {
  publicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
  secretKey: process.env.PAYSTACK_SECRET_KEY || '',
  baseUrl: 'https://api.paystack.co',
  successUrl: '/dashboard/payments/success',
  failureUrl: '/dashboard/payments/failure',
};
