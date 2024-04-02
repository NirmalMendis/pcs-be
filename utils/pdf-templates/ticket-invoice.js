const { AddressType } = require('../types');
const { CustomerType } = require('../../models/customer');
const { ItemType } = require('../../models/item');
const { PawnTicketType } = require('../../models/pawn-ticket');
const { format } = require('date-fns');
const { DD_MM_YYY_FORMAT } = require('../constants/generic-constantss');

/**
 * @typedef {Object} CompanyType
 * @property {AddressType} address - The address of the company.
 * @property {string} mobileNo
 * @property {string} name
 */

/**
 * @typedef {Object} TicketInvoiceTemplateType
 * @property {CompanyType} company - The address of the company.
 * @property {Pick<CustomerType, 'firstName' | 'lastName' | 'nicNo' | 'addressLine1' | 'addressLine2' | 'addressLine3' | 'city' | 'postalCode' | 'mobileNo'>} customer
 * @property {Array<Pick<ItemType, "description" | "appraisedValue" | "pawningAmount" | "weight">>} items
 * @property {Pick<PawnTicketType, 'dueDate' | 'interestRate' | 'serviceCharge' | 'principalAmount' | 'pawnDate' | 'id'>} pawnTicket
 * @property {Date} firstInterestDate
 * @property {number} monthlyInterest
 */

/**
 *
 * @param {TicketInvoiceTemplateType} data
 * @returns
 */
const ticketInvoiceTemplate = (data) => {
  const branchAddress = () => {
    const addressArray = [];
    if (data.company.name)
      addressArray.push(`<p class="line">${data.company.name}</p>`);
    if (data.company.address.addressLine1)
      addressArray.push(
        `<p class="line">${data.company.address.addressLine1}</p>`,
      );
    if (data.company.address.addressLine2)
      addressArray.push(
        `<p class="line">${data.company.address.addressLine2}</p>`,
      );
    if (data.company.address.addressLine3)
      addressArray.push(
        `<p class="line">${data.company.address.addressLine3}</p>`,
      );
    if (data.company.address.city)
      addressArray.push(`<p class="line">${data.company.address.city}</p>`);
    if (data.company.address.postalCode)
      addressArray.push(
        `<p class="line">${data.company.address.postalCode}</p>`,
      );
    return addressArray.join('');
  };

  const ticketNumber = `<h4>Pawn Ticket No: ${data.pawnTicket.id !== undefined ? data.pawnTicket.id : 'XXXX'}</h4>`;
  const customerName = `<h4 class="line">${data.customer.firstName} ${data.customer.lastName}</h4>`;
  const customerNIC = `<h4 class="line">${data.customer.nicNo}</h4>`;
  const customerAddress = () => {
    const address = [];
    if (data.customer.addressLine1) address.push(data.customer.addressLine1);
    if (data.customer.addressLine2) address.push(data.customer.addressLine2);
    if (data.customer.addressLine3) address.push(data.customer.addressLine3);
    if (data.customer.city) address.push(data.customer.city);
    if (data.customer.postalCode) address.push(data.customer.postalCode);
    return address.join(', ');
  };
  const customerPhoneNo = `<h4 class="line">${data.customer.mobileNo}</h4>`;

  const getItems = () => {
    const itemRows = [];
    data.items.map((item) => {
      itemRows.push(
        `<tr>
           <td class="item-name">${item.description}</td>
           <td class="item-weight">${item.weight} g</td>
           <td>Rs. ${item.appraisedValue}</td>
           <td>Rs. ${item.pawningAmount}</td>
         </tr>`,
      );
    });
    return itemRows.join('');
  };

  const firstInterestDate = `<h4 class="line">${format(new Date(data.firstInterestDate), DD_MM_YYY_FORMAT)}</h4>`;
  const redemptionDate = `<h4 class="line">${format(new Date(data.pawnTicket.dueDate), DD_MM_YYY_FORMAT)}</h4>`;
  const interestRate = `<h4 class="line">${data.pawnTicket.interestRate} %</h4>`;
  const monthlyInterest = `<h4 class="line">Rs. ${data.monthlyInterest}</h4>`;
  const serviceCharge = `<h4 class="line">Rs. ${data.pawnTicket.serviceCharge}</h4>`;
  const totalAmount = `<h4 class="line">Rs. ${data.pawnTicket.principalAmount}</h4>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
        }

        table td,
        th {
            padding-bottom: 10px;
        }

        body {
            padding: 0px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-family: Arial;
            display: flex;
            flex-direction: column;
            gap: 10px;
            line-height: 1.5;
        }

        p {
            margin: 0;
        }

        .invoice-title {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 10px;
            h4 {
                margin: 0;
            }
        }

        .invoice-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .address {
            display: flex;
            flex-direction: column;
            .line {
                margin: 0;
            }
            text-align: end
        }

        .pawner-details-header {
            background-color: #f7d7d5;
            border-top: 1px solid #c95c55;
            padding: 10px;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
        }

        .pawner-details-table {
            .cell {
                display: flex;
                flex-direction: column;
                gap: 3px;
                .line {
                    margin: 0;
                }
                .head {
                    font-size: 10px;
                }
            }
        }

        .table-container {
            padding: 10px;
        }

        .item-details-table {
            .cell {
                display: flex;
                flex-direction: column;
                gap: 3px;
                .line {
                    margin: 0;
                }
                .head {
                    font-size: 10px;
                }
            }
            .item-name {
                text-align: start;
            }
            .item-weight {
                text-align: center;
            }
            tbody {
                text-align: end;
            }
            th {
                font-size: 10px;
            }
            td {
                padding-bottom: 10px;
            }
        }

        .item-description {
            background-color: #fff8d6;
            border-top: 1px solid #ebd36c;
            padding: 10px;
            font-weight: 700;
        }

        .invoice-Summary-header {
            background-color: #d6faff;
            border-top: 1px solid #86c8d1;
            padding: 10px;
            font-weight: 700;
        }

        .invoice-summary-table {
            .cell {
                display: flex;
                flex-direction: column;
                gap: 3px;
                .line {
                    margin: 0;
                }
                .head {
                    font-size: 10px;
                }
            }
        }

        .declaration {
            padding: 10px;
            background-color: #fff8d6;
            border-top: 1px solid #ebd36c;
        }

        .signature-table {
            td {
                text-align: center;
            }
            .cell {
                display: flex;
                flex-direction: column;
            }
        }

        .redemption-header {
            font-weight: 700;
            padding: 10px;
            padding-left: 0px;
        }
        .redemption {
            padding: 10px;
            background-color: #e3faeb;
            border-top: 1px solid #7ec296;
        }
    </style>
    <meta charset="utf-8">
</head>

<body>
    <header>
        <div class="invoice-header">
            <table>
                <tbody>
                    <tr>
                        <td colspan="1">
                            <div>
                                <svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
<path style="fill:#F9D984;" d="M335.008,107.58H176.991l-3.626,5.444c-2.005,3.011-1.79,6.966,0.53,9.748l60.337,72.316h43.537
	l60.336-72.316c2.321-2.782,2.537-6.736,0.529-9.748L335.008,107.58z"/>
<polygon style="fill:#FDF276;" points="223.304,118.09 248.881,195.087 263.118,195.087 288.696,118.09 "/>
<path style="fill:#FEFAC8;" d="M338.633,113.023l-27.017-40.572c-1.537-2.303-4.136-3.688-6.922-3.688h-97.384
	c-2.786,0-5.389,1.386-6.921,3.688l-27.021,40.572c-1.023,1.537-1.464,3.32-1.347,5.067h167.962
	C340.098,116.343,339.658,114.561,338.633,113.023z"/>
<g>
	<path style="fill:#FDF276;" d="M203.542,69.671c-1.256,0.634-2.353,1.578-3.154,2.78l-27.023,40.572
		c-1.023,1.536-1.464,3.319-1.347,5.067h63.772L203.542,69.671z"/>
	<path style="fill:#FDF276;" d="M276.209,118.09h63.773c0.117-1.748-0.323-3.531-1.35-5.067l-27.02-40.572
		c-0.802-1.203-1.895-2.146-3.155-2.78L276.209,118.09z"/>
</g>
<polygon style="fill:#F9D984;" points="255.952,68.764 223.1,118.09 288.9,118.09 256.047,68.764 "/>
<g>
	<path style="fill:#EFBA50;" d="M256,0c-4.262,0-7.719,3.455-7.719,7.719v19.125c0,4.262,3.457,7.719,7.719,7.719
		c4.263,0,7.719-3.455,7.719-7.719V7.719C263.719,3.455,260.263,0,256,0z"/>
	<path style="fill:#EFBA50;" d="M136.799,137.966h-19.181c-4.263,0-7.719,3.455-7.719,7.719s3.455,7.719,7.719,7.719h19.181
		c4.263,0,7.719-3.457,7.719-7.719S141.062,137.966,136.799,137.966z"/>
	<path style="fill:#EFBA50;" d="M394.382,137.966H375.2c-4.263,0-7.719,3.455-7.719,7.719s3.456,7.719,7.719,7.719h19.182
		c4.263,0,7.72-3.457,7.72-7.719S398.646,137.966,394.382,137.966z"/>
</g>
<g>
	<path style="fill:#F9D984;" d="M359.317,42.68c-3.009-3.019-7.896-3.027-10.915-0.018L334.84,56.184
		c-3.02,3.009-3.027,7.897-0.018,10.916c1.507,1.513,3.487,2.27,5.466,2.27c1.971,0,3.943-0.751,5.449-2.252L359.3,53.596
		C362.319,50.586,362.328,45.698,359.317,42.68z"/>
	<path style="fill:#F9D984;" d="M163.599,42.662c-3.019-3.01-7.906-3.003-10.915,0.016c-3.01,3.02-3.003,7.906,0.017,10.916
		l13.563,13.523c1.507,1.503,3.478,2.253,5.45,2.253c1.978,0,3.958-0.758,5.466-2.268c3.009-3.019,3.002-7.906-0.017-10.916
		L163.599,42.662z"/>
</g>
<path style="opacity:0.1;enable-background:new    ;" d="M238.936,195.087c-15.637-26.538-42.879-72.316-42.879-72.316
	c-2.321-2.782-2.535-6.736-0.53-9.748l27.02-40.572c1.534-2.303,4.136-3.688,6.921-3.688h-22.16c-2.786,0-5.389,1.386-6.921,3.688
	l-27.021,40.572c-2.005,3.011-1.79,6.966,0.53,9.748l60.337,72.316L238.936,195.087L238.936,195.087z"/>
<path style="fill:#BF953E;" d="M295.942,215.197c0,2.919-2.389,5.309-5.309,5.309h-69.265c-2.92,0-5.308-2.39-5.308-5.309v-26.002
	c0-2.919,2.388-5.308,5.308-5.308h69.265c2.921,0,5.309,2.389,5.309,5.308V215.197z"/>
<path style="opacity:0.1;enable-background:new    ;" d="M237.951,215.197v-26.002c0-2.919,2.389-5.308,5.308-5.308h-21.893
	c-2.92,0-5.308,2.389-5.308,5.308v26.002c0,2.919,2.388,5.309,5.308,5.309h21.893C240.341,220.506,237.951,218.116,237.951,215.197z
	"/>
<path style="fill:#EFBA50;" d="M256,208.937c-83.941,0-151.988,67.843-151.988,151.531C104.012,444.157,172.059,512,256,512
	s151.988-67.843,151.988-151.532C407.988,276.78,339.941,208.937,256,208.937z M256,472.375
	c-61.891,0-112.245-50.201-112.245-111.908c0-61.705,50.353-111.908,112.245-111.908s112.244,50.202,112.244,111.908
	C368.244,422.174,317.891,472.375,256,472.375z"/>
<g style="opacity:0.1;">
	<path d="M126.134,360.468c0-79.98,62.151-145.48,140.926-151.13c-3.652-0.262-7.34-0.401-11.06-0.401
		c-83.941,0-151.988,67.843-151.988,151.531C104.012,444.157,172.059,512,256,512c3.72,0,7.408-0.14,11.06-0.402
		C188.284,505.948,126.134,440.447,126.134,360.468z"/>
</g>
</svg>
                            </div>
                        </td>
                        <td colspan="1" class="invoice-title">
                            <h4>Pawn Ticket Invoice</h4>
                            ${ticketNumber}
                        </td>
                        <td colspan="1">
                            <div class="address">
                               ${branchAddress()}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </header>
    <main>
        <section>
            <div class="pawner-details-header">
                <p>
                    Details of the pawner (උකස් කරන්නාගේ විස්තර )
                </p>
                <p>
                    ${format(new Date(data.pawnTicket.pawnDate), DD_MM_YYY_FORMAT)}
                </p>
            </div>
            <div class="table-container">
                <table class="pawner-details-table">
                    <tbody>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Name (නම):</p>
                                    ${customerName}
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">ID (ජා හැ අංකය):</p>
                                    ${customerNIC}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Address (ලිපිනය) :</p>
                                    <h4 class="line">${customerAddress()}</h4>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Phone No (දුරකථන අංකය): </p>
                                    ${customerPhoneNo}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section>
            <p class="item-description">
                Item Description (අයිතම විස්තරය)
            </p>
            <div class="table-container">
                <table class="item-details-table ">
                    <thead>
                        <tr>
                            <th>Item (අයිතමය)</th>
                            <th>Weight (බර)</th>
                            <th>Appraised Value (තක්සේරු වටිනාකම)</th>
                            <th>Pawning Amount (උකස් මුද)</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${getItems()}
                    </tbody>
                </table>
            </div>
        </section>
        <section>
            <p class="invoice-Summary-header">
                Invoice Summary (ඉන්වොයිස් සාරාංශය)
            </p>
            <div class="table-container">
                <table class="invoice-summary-table">
                    <tbody>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">First Interest Due Date (පළමු පොලී ගෙවීමේ දිනය):</p>
                                    ${firstInterestDate}
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Redemption Date (බේරා ගන්න දිනය)</p>
                                    ${redemptionDate}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Interest Rate (පොලී අනුපාතය)</p>
                                    ${interestRate}
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Monthly Interest ( මාසික පොලී)</p>
                                    ${monthlyInterest}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Service Charge (සේවා ගාස්තුව)</p>
                                    ${serviceCharge}
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Total Amount Payable ( ගෙවිය යුතු මුළු මුදල)</p>
                                    ${totalAmount}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section>
            <p class="declaration">
                මා සතු ඉහත සදහන් රන් භාණ්ඩ  මෙයින් ${data.company.name} මධමධ්‍යස්ථානය වත උකස් කර භාර දෙමි. උකස් බිල්පතෙහි සදහන් බේරාගන්නා දිනයේදී හෝ ඊට පෙර බේරාගන්නා බවට පොරොන්දු වෙමි. ඉහත සදහන් තොරතුරු සත්‍ය හා නිවැරදි බව තහවුරු කරමි.
                I hereby pawn and handover to ${data.company.name} the above gold articles owned by me. I declare that the above particulars are true and correct. I agere to redeem on or before the redemption date in the pawning ticket. I declare that the above particulars
                are true and correct.
            </p>
            <div class="table-container">
                <table class="signature-table">
                    <tbody>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p> ......................................</p>
                                    <p>Valuer (තක්සේරුකරු)</p>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p> ......................................</p>
                                    <p>Manager (කළමනාකරු)</p>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p> ......................................</p>
                                    <p>Pawner (උකස්කරු)</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section>
            <div class="redemption">
                <p class="redemption-header">
                    Redemption of Pawn (උකස් බේරුම)
                </p>
                <p>
                    මෙම පත්‍රිකාවේ සදහන් උකස් කල භාණ්ඩ සියල්ලම බේරාගන්නා ලද බැවින් මෙම උකස් පිළිබඳ සියළු වගකීම් හා බැදීම් වලින් ${data.company.name} මධ්‍යස්ථානය නිදහස් කරමි.
                    These articles pawned on the ticket as per given in the document having been received. I hereby discharge ${data.company.name} from all obligations and liabilities in respect of this pawn.
                </p>
            </div>
            <div class="table-container">
                <table class="signature-table">
                    <tbody>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p> ......................................</p>
                                    <p>Date (දිනය)</p>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p> ......................................</p>
                                    <p>Pawner (උකස්කරු)</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</body>

</html>`;
};

module.exports = ticketInvoiceTemplate;
