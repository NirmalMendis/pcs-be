const ticketInvoiceTemplate = () => {
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
            padding: 15px;
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

        .redemption {
            padding: 10px;
            background-color: #e3faeb;
            border-top: 1px solid #7ec296;
        }
    </style>
    <meta charset="utf-8">
    <title>Example 1</title>
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
                        </td>
                        <td colspan="1">
                            <div class="address">
                                <p class="line">S A S FERNANDO</p>
                                <p class="line">Pawning Center</p>
                                <p class="line">532/1 කපුවත්ත ජා-ඇළ</p>
                                <p class="line">070 185 1123 / 075 123 1234</p>
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
                    2024.12.23
                </p>
            </div>
            <div class="table-container">
                <table class="pawner-details-table">
                    <tbody>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Name (නම):</p>
                                    <h4 class="line">Mr S A Fernando</h4>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">ID (ජා හැ අංකය):</p>
                                    <h4 class="line">123546235</h4>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Address (ලිපිනය) :</p>
                                    <h4 class="line">No123, Tewatta, Ragama</h4>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Phone No (දුරකථන අංකය): </p>
                                    <h4 class="line">123546235</h4>
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
                        <tr>
                            <td class="item-name">
                                Ring
                            </td>
                            <td class="item-weight">
                                4.5 g
                            </td>
                            <td>
                                Rs. 45000
                            </td>
                            <td>
                                Rs. 30000
                            </td>
                        </tr>
                        <tr>
                            <td class="item-name">
                                Necklace
                            </td>
                            <td class="item-weight">
                                10.5 g
                            </td>
                            <td>
                                Rs. 445000
                            </td>
                            <td>
                                Rs. 200000
                            </td>
                        </tr>
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
                                    <h4 class="line">2024.12.02</h4>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Redemption Date (බේරා ගන්න දිනය)</p>
                                    <h4 class="line">2024.5.6</h4>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Interest Rate (පොලී අනුපාතය)</p>
                                    <h4 class="line">5 %</h4>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Monthly Interest ( මාසික පොලී)</p>
                                    <h4 class="line">Rs 5100</h4>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Service Charge (සේවා ගාස්තුව)</p>
                                    <h4 class="line">Rs.50</h4>
                                </div>
                            </td>
                            <td colspan="1">
                                <div class="cell">
                                    <p class="line head">Total Amount Payable ( ගෙවිය යුතු මුළු මුදල)</p>
                                    <h4 class="line">Rs 5100</h4>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section>
            <p class="declaration">
                I hereby pawn and handover to SK GOLD LOANS center the above gold articles owned by me. I declare that the above particulars are true and correct. I agere to redeem on or before the redemption date in the pawning ticket. I declare that the above particulars
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
            <p class="redemption">
                These articles pawned on the ticket as per given in the document having been received. I hereby discharge SK GOLD LOANS center from all obligations and liabilities in respect of this pawn.
            </p>
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
