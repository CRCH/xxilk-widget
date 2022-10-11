import { newSpecPage, mockFetch } from '@stencil/core/testing';
import { API_URL } from '../config';
import { XxilkWidget } from '../widget-xxilk';

// mocks
import { mock500, mock50, mock5000 } from './mocks'


describe('<widget-xxilk />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders for amount of 5000', async () => {
    mockFetch.json(mock5000);

    const page = await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="500000" language="en" hash="mockHash"></widget-xxilk>`,
    });

    expect(page.root)
    .toEqualHtml(`
      <widget-xxilk amount="500000" hash="mockHash" language="en">
        <mock:shadow-root>
          <div class="widget-wrapper">
            <div class="logo"></div>
            <div class="text-wrapper">
              <p class="text">
                <span>
                  Get now with 500€ down payment and 450€ X 10 (interest-free) payments
                </span>
                <br>
                <span>
                  or split from 125€ up to 36 payments with 15% interest rate
                </span>
                <span class="tooltip-wrapper">
                  i
                  <span class="tooltip">
                    Interest Rate: 15%
                    <br>
                    Grace period: 10
                    <br>
                    Monthly split payment: 450€
                    <br>
                    Min per month payment: 125€
                    <br>
                    Number of payments: 36
                    <br>
                    Downpayment amount: 500€
                    <br>
                    Total within grace period: 5000€
                    <br>
                  </span>
                </span>
              </p>
              <button class="cta-button">
                Learn more
              </button>
            </div>
          </div>
        </mock:shadow-root>
      </widget-xxilk>
    `)
  })

  it('renders for amount of 50', async () => {
    mockFetch.json(mock50);

    const page = await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="5000" language="en" hash="mockHash"></widget-xxilk>`,
    });

    expect(page.root)
    .toEqualHtml(`
      <widget-xxilk amount="5000" hash="mockHash" language="en">
        <mock:shadow-root>
          <div class="widget-wrapper">
            <div class="logo"></div>
            <div class="text-wrapper">
              <p class="text">
                Get now, pay later!
                <br>
                Split in 6 payments with 15% interest rate.
                <span class="tooltip-wrapper">
                  i
                  <span class="tooltip">
                    Interest Rate: 15%
                    <br>
                    Grace period: unavaliable
                    <br>
                    Monthly split payment: 0€
                    <br>
                    Min per month payment: 0€
                    <br>
                    Number of payments: 6
                    <br>
                    Downpayment amount: 0€
                    <br>
                    Total within grace period: unavaliable
                    <br>
                  </span>
                </span>
              </p>
              <button class="cta-button">
                Learn more
              </button>
            </div>
          </div>
        </mock:shadow-root>
      </widget-xxilk>
    `)
  })

  it('renders for amount of 500', async () => {
    mockFetch.json(mock500);

    const page = await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="50000" language="en" hash="mockHash"></widget-xxilk>`,
    });

    expect(page.root)
    .toEqualHtml(`
      <widget-xxilk amount="50000" hash="mockHash" language="en">
        <mock:shadow-root>
          <div class="widget-wrapper">
            <div class="logo"></div>
            <div class="text-wrapper">
              <p class="text">
                Get now, pay later!
                <br>
                50€ X 10 (interest-free) payments
                <br>
                <span>
                  or split from 13.89€ up to 36 payments with 15% interest rate
                </span>
                <span class="tooltip-wrapper">
                  i
                  <span class="tooltip">
                    Interest Rate: 15%
                    <br>
                    Grace period: 10
                    <br>
                    Monthly split payment: 50€
                    <br>
                    Min per month payment: 13.89€
                    <br>
                    Number of payments: 36
                    <br>
                    Downpayment amount: 0€
                    <br>
                    Total within grace period: 500€
                    <br>
                  </span>
                </span>
              </p>
              <button class="cta-button">
                Learn more
              </button>
            </div>
          </div>
        </mock:shadow-root>
      </widget-xxilk>`
    )
  })

  it('doesn\'t renders for amount less than 50', async () => {
    mockFetch.json({});

    const page = await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="40" language="en" hash="mockHash"></widget-xxilk>`,
    });

    expect(page.root).toEqualHtml(`
      <widget-xxilk amount="40" hash="mockHash" language="en">
        <mock:shadow-root></mock:shadow-root>
      </widget-xxilk>
    `)
  })

  it('doesn\'t renders for amount higher than 7000', async () => {
    mockFetch.json({});

    const page = await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="700001" language="en" hash="mockHash"></widget-xxilk>`,
    });

    expect(page.root).toEqualHtml(`
      <widget-xxilk amount="700001" hash="mockHash" language="en">
        <mock:shadow-root></mock:shadow-root>
      </widget-xxilk>
    `)
  })

  it('doesn\'t renders with incorrect passed amount', async () => {
    mockFetch.json({});

    const page = await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="someWrongProp" language="en" hash="mockHash"></widget-xxilk>`,
    });

    expect(page.root).toEqualHtml(`
      <widget-xxilk amount="someWrongProp" hash="mockHash" language="en">
        <mock:shadow-root></mock:shadow-root>
      </widget-xxilk>
    `)
  })

  it('makes api call with propper props', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="5000" language="en" hash="mockHash"></widget-xxilk>`,
    })

    expect(fetchSpy).toHaveBeenCalledWith(`${API_URL}/financing/monthly-payment?amount=5000&language=en&b=mockHash`)
  })

  it('doensn\'t make api call with incorrect props', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    await newSpecPage({
      components: [XxilkWidget],
      html: `<widget-xxilk amount="someRandomProp" language="en" hash="mockHash"></widget-xxilk>`,
    })

    expect(fetchSpy).toHaveBeenCalledTimes(0)
  })
})
