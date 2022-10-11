import { Component, Prop, h, State } from '@stencil/core';
// types
import { Language } from '../../global.types';
import { PaymentDetails } from './widget-xxilk.types';
// constants
import { MIN_VALUE, MAX_VALUE, API_URL } from './config';
// assets
import Logo from '../../assets/logo.svg'


@Component({
  tag: 'widget-xxilk',
  styleUrl: './widget-xxilk.css',
  shadow: true,
})
export class XxilkWidget {
  @Prop() amount: number;
  @Prop() language: Language;
  @Prop() hash: string;

  @State() paymentDetails: PaymentDetails | undefined;
  @State() isLoading: boolean = false;

  handleLinkClick = (): void => {
    window.open('https://google.com/search?q=learn+more', '_blank')
  }

  validateAmount = (): boolean => {
    const amount = Number(this.amount)
    return !isNaN(amount) && (amount >= MIN_VALUE) && (amount <= MAX_VALUE)
  }

  fetchAPI = () => {
    this.isLoading = true;
    fetch(`${API_URL}/financing/monthly-payment?amount=${this.amount}&language=${this.language}&b=${this.hash}`)
      .then((response: Response) => response.json())
      .then((data) => this.paymentDetails = data)
      .catch((err) => console.error('Failed to fetch widget API', err))
      .finally(() => { this.isLoading = false });
  }

  componentWillLoad() {
    if (!this.validateAmount()) return;
    
    this.fetchAPI();
  }

  renderText = () => {
    const {
      interestRate,
      monthlySplitPaymentAmount,
      gracePeriodPaymentCount,
      monthlyPaymentStartingFromAmount,
      numberOfPayments,
      financingProductType,
      downPaymentAmount
    } = this.paymentDetails || {};

    switch(financingProductType) {
      case 'GRACE_PERIOD':
        return [
          downPaymentAmount > 0 && [
            <span>{`Get now with ${downPaymentAmount}€ down payment and ${monthlySplitPaymentAmount}€ X ${gracePeriodPaymentCount} (interest-free) payments`}</span>,
            <br />,
            <span>{`or split from ${monthlyPaymentStartingFromAmount}€ up to ${numberOfPayments} payments with ${interestRate}% interest rate`}</span>
          ],
          downPaymentAmount === 0 && [
            'Get now, pay later!',
            <br />,
            `${monthlySplitPaymentAmount}€ X ${gracePeriodPaymentCount} (interest-free) payments`,
            <br />,
            <span>{`or split from ${monthlyPaymentStartingFromAmount}€ up to ${numberOfPayments} payments with ${interestRate}% interest rate`}</span>
          ],
        ]
      case 'INSTALLMENT_CREDIT':
        return [
          'Get now, pay later!',
          <br />,
          `Split in ${numberOfPayments} payments with ${interestRate}% interest rate.`
        ];
      default:
        return 'No availiable deals for this purchase.';
    }
  }

  renderTooltipText = () => {
    const {
      interestRate,
      monthlySplitPaymentAmount,
      gracePeriodPaymentCount,
      monthlyPaymentStartingFromAmount,
      numberOfPayments,
      downPaymentAmount,
    } = this.paymentDetails || {};
    const totalWithinGrace = downPaymentAmount + monthlySplitPaymentAmount * gracePeriodPaymentCount;
    
    return [
      `Interest Rate: ${interestRate}%`,
      `Grace period: ${gracePeriodPaymentCount || 'unavaliable'}`,
      `Monthly split payment: ${monthlySplitPaymentAmount || 0}€`,
      `Min per month payment: ${monthlyPaymentStartingFromAmount || 0}€`,
      `Number of payments: ${numberOfPayments}`,
      `Downpayment amount: ${downPaymentAmount}€`,
      `Total within grace period: ${gracePeriodPaymentCount > 0 ? totalWithinGrace + '€' : 'unavaliable'}`,
    ].map(item => [item, <br />])
  }

  render() {
    
    if ((!this.paymentDetails || !this.validateAmount()) && !this.isLoading) return null;

    return (
      <div class='widget-wrapper'>
        <div class={{ logo: true, loading: this.isLoading }} innerHTML={Logo} />
        {!this.isLoading && (
          <div class='text-wrapper'>
            <p class='text'>
              {this.renderText()}
              <span class='tooltip-wrapper'>
                i
                <span class='tooltip'>{this.renderTooltipText()}</span>
              </span>
            </p>
            <button class='cta-button' onClick={this.handleLinkClick}>Learn more</button>
          </div>
        )}
      </div>
    )
  }
}
