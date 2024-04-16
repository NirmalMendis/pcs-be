/**
 * @typedef {Object} WelcomeEmailTemplateDataType
 * @property {string} companyName
 * @property {string} firstName
 * @property {string} redirectURL
 */

/**
 * A function that greets a user.
 * @param {WelcomeEmailTemplateDataType} data - The user object.
 */
const welcomeTemplate = (data) => {
  // return `<b><h1>${data.branch?.title}</h1>Hello world? ${data.redirectURL}</b>`;
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <body style="background-image:url(&quot;https://stg.sas-assetank.xyz.lk/public/assets/login-layout-img.png&quot;);background-size:cover;background-repeat:no-repeat;background-color:rgb(255,255,255);margin-top:1.25rem;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;padding-left:0.5rem;padding-right:0.5rem">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:465px;border-width:1px;border-style:solid;border-color:rgb(229,229,229);background-color:rgb(255,255,255);border-radius:0.25rem;margin-left:auto;margin-right:auto;padding:20px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td><img src="https://stg.sas-assetank.xyz.lk/public/assets/logo192.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" width="80px" /></td>
                </tr>
              </tbody>
            </table>
            <h1 class="" style="color:rgb(0,0,0);font-size:24px;font-weight:400;text-align:center;padding:0px;margin-top:30px;margin-bottom:30px;margin-left:0px;margin-right:0px">Welcome to Assetank !</h1>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hello ${data.firstName},</p>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">You have been invited by ${data.companyName} to join Assetank.</p>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Please click the button below to set a new password and login to the system.</p>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px">
              <tbody>
                <tr>
                  <td><a href="${data.redirectURL}" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;background-color:rgb(37,99,235);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Join the team</span><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Or copy and paste this URL into your browser:<!-- --> <a href="${data.redirectURL}" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" target="_blank">${data.redirectURL}</a></p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px" />
            <p class="" style="font-size:12px;line-height:24px;margin:16px 0;color:rgb(87,83,78)">This is an auto-generated email sent to you by Assetank. Please do not reply to this email.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>`;
};

module.exports = welcomeTemplate;
