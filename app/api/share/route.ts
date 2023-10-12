import { NextResponse } from "next/server";
import { mailOptions, transport } from "@/config/nodemailer";

type feedbackProps = {
  firstname?: string;
  lastname?: string;
  email?: string;
  link?: string;
};

const CONTACT_MESSAGE_FIELDS: { [key: string]: string } = {
  firstname: "First Name",
  lastname: "Last Name",
  email: "Email",
  link: "Link",
};

const generateEmailContent = (data: object) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );

  const emailData = Object.values(data);

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml><o:officedocumentsettings><o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml><![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><title></title><style type="text/css">@media only screen and (min-width:520px){.u-row{width:500px!important}.u-row .u-col{vertical-align:top}.u-row .u-col-100{width:500px!important}}@media (max-width:520px){.u-row-container{max-width:100%!important;padding-left:0!important;padding-right:0!important}.u-row .u-col{min-width:320px!important;max-width:100%!important;display:block!important}.u-row{width:100%!important}.u-col{width:100%!important}.u-col>div{margin:0 auto}}body{margin:0;padding:0}table,td,tr{vertical-align:top;border-collapse:collapse}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}table,td{color:#000}#u_body a{color:#00e;text-decoration:underline}#u_content_text_2 a{color:#000;text-decoration:none}</style></head><body class="clean-body u_body" style="margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#e7e7e7;color:#000"><!--[if IE]><div class="ie-container"><![endif]--><!--[if mso]><div class="mso-container"><![endif]--><table id="u_body" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;min-width:320px;margin:0 auto;background-color:#e7e7e7;width:100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align:top"><td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#e7e7e7"><![endif]--><div class="u-row-container" style="padding:0;background-color:transparent"><div class="u-row" style="margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"><div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr style="background-color:transparent"><![endif]--><!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#fff;width:500px;padding:20px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width:320px;min-width:500px;display:table-cell;vertical-align:top"><div style="background-color:#fff;height:100%;width:100%!important"><!--[if (!mso)&(!IE)]><!--><div style="box-sizing:border-box;height:100%;padding:20px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"><!--<![endif]--><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right:0;padding-left:0" align="center"><img align="center" border="0" src="https://live.staticflickr.com/65535/53252945123_d7f75b240d_t.jpg" alt="" title="" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:100%;max-width:70px" width="70"></td></tr></table></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></div><div class="u-row-container" style="padding:0;background-color:transparent"><div class="u-row" style="margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"><div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr style="background-color:transparent"><![endif]--><!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#ecf0f1;width:500px;padding:50px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width:320px;min-width:500px;display:table-cell;vertical-align:top"><div style="background-color:#ecf0f1;height:100%;width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0"><!--[if (!mso)&(!IE)]><!--><div style="box-sizing:border-box;height:100%;padding:50px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0"><!--<![endif]--><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:0;font-family:arial,helvetica,sans-serif" align="left"><div style="font-size:14px;line-height:140%;text-align:left;word-wrap:break-word"><p style="line-height:140%">Greetings ${emailData[0]},</p><p style="line-height:140%"> </p><p style="line-height:140%">We are delighted that you decided to join us in this effort to enhance mental health and general wellbeing in Nigeria.</p><p style="line-height:140%"> </p><p style="line-height:140%">To finish registering, please adhere to these 2 steps.</p></div></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0 0;font-family:arial,helvetica,sans-serif" align="left"><h2 style="margin:0;line-height:140%;text-align:left;word-wrap:break-word;font-size:20px;font-weight:400">Step 1</h2></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0 0;font-family:arial,helvetica,sans-serif" align="left"><table height="0px" align="left" border="0" cellpadding="0" cellspacing="0" width="33%" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;border-top:2px solid #000;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"><tbody><tr style="vertical-align:top"><td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0;line-height:0;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"><span>&#160;</span></td></tr></tbody></table></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0 0;font-family:arial,helvetica,sans-serif" align="left"><div style="font-size:14px;line-height:140%;text-align:left;word-wrap:break-word"><p style="line-height:140%">Download the WeBe app on your device.</p></div></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left"><!--[if mso
                                  ]><style>
                                    .v-button {
                                      background: transparent !important;
                                    }
                                  </style><!
                                [endif]--><div align="left"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://apps.apple.com/us/app/webe-life/id1619188434" style="height:37px;v-text-anchor:middle;width:113px" arcsize="11%" stroke="f" fillcolor="#000000"><w:anchorlock><center style="color:#fff"><![endif]--><a href="https://apps.apple.com/us/app/webe-life/id1619188434" target="_blank" class="v-button" style="box-sizing:border-box;display:inline-block;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#fff;background-color:#000;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none;font-size:14px"><span style="display:block;padding:10px 20px;line-height:120%"><span style="line-height:16.8px">Apple Store</span></span></a><!--[if mso]><![endif]--></div></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:arial,helvetica,sans-serif" align="left"><!--[if mso
                                  ]><style>
                                    .v-button {
                                      background: transparent !important;
                                    }
                                  </style><!
                                [endif]--><div align="left"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://play.google.com/store/apps/details?gl=US&hl=en&id=com.webelife.webelife.webe_flutter" style="height:37px;v-text-anchor:middle;width:116px" arcsize="11%" stroke="f" fillcolor="#34a853"><w:anchorlock><center style="color:#fff"><![endif]--><a href="https://play.google.com/store/apps/details?gl=US&hl=en&id=com.webelife.webelife.webe_flutter" target="_blank" class="v-button" style="box-sizing:border-box;display:inline-block;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#fff;background-color:#34a853;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none;font-size:14px"><span style="display:block;padding:10px 20px;line-height:120%"><span style="line-height:16.8px">Google Play</span></span></a><!--[if mso]><![endif]--></div></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0 0;font-family:arial,helvetica,sans-serif" align="left"><h2 style="margin:0;line-height:140%;text-align:left;word-wrap:break-word;font-size:20px;font-weight:400">Step 2</h2></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0 0;font-family:arial,helvetica,sans-serif" align="left"><table height="0px" align="left" border="0" cellpadding="0" cellspacing="0" width="33%" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;border-top:2px solid #000;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"><tbody><tr style="vertical-align:top"><td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0;line-height:0;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"><span>&#160;</span></td></tr></tbody></table></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0 0;font-family:arial,helvetica,sans-serif" align="left"><div style="font-size:14px;line-height:140%;text-align:left;word-wrap:break-word"><p style="line-height:140%">Click on the button to join the WeBe Enhanced Affinity Group.</p></div></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:arial,helvetica,sans-serif" align="left"><!--[if mso
                                  ]><style>
                                    .v-button {
                                      background: transparent !important;
                                    }
                                  </style><!
                                [endif]--><div align="left"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:37px;v-text-anchor:middle;width:185px" arcsize="11%" stroke="f" fillcolor="#ffb21a"><w:anchorlock><center style="color:#34495e"><![endif]--><a href="${emailData[3]}" target="_blank" class="v-button" style="box-sizing:border-box;display:inline-block;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#34495e;background-color:#ffb21a;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none;font-size:14px"><span style="display:block;padding:10px 20px;line-height:120%"><span style="line-height:16.8px">Join Team Nigeria EAG</span></span></a><!--[if mso]><![endif]--></div></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0 0;font-family:arial,helvetica,sans-serif" align="left"><div style="font-size:14px;line-height:140%;text-align:left;word-wrap:break-word"><p style="line-height:140%">We are appreciative of your effort in going through the steps and look forward to having your input in developing this community.</p></div></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></div><div class="u-row-container" style="padding:0;background-color:transparent"><div class="u-row" style="margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"><div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr style="background-color:transparent"><![endif]--><!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#fff;width:500px;padding:20px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width:320px;min-width:500px;display:table-cell;vertical-align:top"><div style="background-color:#fff;height:100%;width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0"><!--[if (!mso)&(!IE)]><!--><div style="box-sizing:border-box;height:100%;padding:20px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0"><!--<![endif]--><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left"><div align="center"><div style="display:table;max-width:167px"><!--[if (mso)|(IE)]><table width="167" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;width:167px"><tr><![endif]--><!--[if (mso)|(IE)]><td width="32" style="width:32px;padding-right:10px" valign="top"><![endif]--><table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:10px"><tbody><tr style="vertical-align:top"><td align="left" valign="middle" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top"><a href="https://www.facebook.com/webelifeinc/" title="Facebook" target="_blank"><img src="https://live.staticflickr.com/65535/53252652106_770a8763d4_t.jpg" alt="Facebook" title="Facebook" width="32" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important"></a></td></tr></tbody></table><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td width="32" style="width:32px;padding-right:10px" valign="top"><![endif]--><table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:10px"><tbody><tr style="vertical-align:top"><td align="left" valign="middle" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top"><a href="https://x.com/webelifeinc/" title="X" target="_blank"><img src="https://live.staticflickr.com/65535/53253008534_991e50a12d_t.jpg" alt="X" title="X" width="32" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important"></a></td></tr></tbody></table><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td width="32" style="width:32px;padding-right:10px" valign="top"><![endif]--><table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:10px"><tbody><tr style="vertical-align:top"><td align="left" valign="middle" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top"><a href="https://www.instagram.com/webe.life/" title="Instagram" target="_blank"><img src="https://live.staticflickr.com/65535/53253151600_4245fb65ea_t.jpg" alt="Instagram" title="Instagram" width="32" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important"></a></td></tr></tbody></table><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td width="32" style="width:32px;padding-right:0" valign="top"><![endif]--><table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:0"><tbody><tr style="vertical-align:top"><td align="left" valign="middle" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top"><a href="https://www.linkedin.com/company/webe-life/mycompany/" title="LinkedIn" target="_blank"><img src="https://live.staticflickr.com/65535/53252652116_9539c3f8ab_t.jpg" alt="LinkedIn" title="LinkedIn" width="32" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important"></a></td></tr></tbody></table><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></td></tr></tbody></table><table style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left"><table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="52%" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;border-top:2px solid #bbb;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"><tbody><tr style="vertical-align:top"><td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0;line-height:0;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"><span>&#160;</span></td></tr></tbody></table></td></tr></tbody></table><table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif" align="left"><div style="font-size:14px;color:#e6e6e6;line-height:140%;text-align:center;word-wrap:break-word"><p style="line-height:140%"><a href="https://www.webelife.com/biolinks">webelife.com/biolinks</a></p></div></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></div><!--[if (mso)|(IE)]><![endif]--></td></tr></tbody></table><!--[if mso]><![endif]--><!--[if IE]><![endif]--></body></html>`,
  };
};

export async function POST(request: Request) {
  if (request.method === "POST") {
    const data: feedbackProps = await request.json();

    //return NextResponse.json(data);
    try {
      await transport.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: `${data.firstname} - Here's your Invitation to Join the WeBe EAG`,
        to: `${data.email}`,
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
