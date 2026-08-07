/* ============================================================================
   STARLIT INSIGHTS — LEGAL / POLICY MODULE
   ----------------------------------------------------------------------------
   Fully self-contained. This ONE file adds:
     • a legal link row in the footer
     • a full-screen overlay with all five Razorpay-required policies
     • deep links so each policy has its own shareable URL
     • all of its own CSS

   TO ENABLE   — keep this file, and keep this line in index.html:
                   <script src="legal.js" defer></script>
   TO DISABLE  — delete this file. Nothing else breaks: the footer links and
                 the overlay simply never get created. (The script tag will
                 log a harmless 404 in the console; remove it too if you like.)

   URLS FOR RAZORPAY VERIFICATION — paste these into the form:
     https://starlitinsights.com/#terms
     https://starlitinsights.com/#privacy
     https://starlitinsights.com/#shipping
     https://starlitinsights.com/#refunds
     https://starlitinsights.com/#contact

   ⚠  FILL IN THE CONFIG BELOW BEFORE SUBMITTING TO RAZORPAY.
      Razorpay will reject the application if the contact details are
      placeholders or missing.

   ⚠  These are working drafts written to satisfy Razorpay's checklist.
      They are not legal advice. Have someone qualified read them before
      you rely on them.
   ========================================================================== */

(function () {
  "use strict";

  /* ==========================================================================
     1. CONFIG — EDIT THIS BLOCK, NOTHING ELSE
     ========================================================================== */
  var CONFIG = {
    brand:    "Starlit Insights",
    site:     "starlitinsights.com",

    // ⚠ REQUIRED by Razorpay. Use a brand address, not a personal one.
    email:    "starlitinsights24@gmail.com",

    // ⚠ Razorpay normally wants a phone number. Leave "" to hide the row.
    phone:    "",

    // ⚠ Razorpay normally wants at least city + state + country.
    city:     "Kanpur",
    state:    "Uttar Pradesh",
    country:  "India",

    // Optional full postal address. Leave "" to hide the row.
    address:  "",

    price:    "₹500",
    duration: "15 minutes",
    hours:    "Monday to Saturday, 10:00–19:00 IST",
    reply:    "within 2 business days",
    updated:  "4 August 2026"
  };

  /* ==========================================================================
     2. POLICY CONTENT
     ========================================================================== */
  var C = CONFIG;
  var contactLine =
    'Email <a href="mailto:' + C.email + '">' + C.email + '</a>' +
    (C.phone ? ' · Phone ' + C.phone : '') + '.';

  var DOCS = [
    {
      id: "terms",
      nav: "Terms &amp; Conditions",
      title: "Terms and Conditions",
      body:
        '<p class="sl-meta">Last updated ' + C.updated + '</p>' +

        '<h3>1. About these terms</h3>' +
        '<p>These Terms and Conditions govern your use of ' + C.site + ' (the “Site”) and any ' +
        'astrology consultation booked through it (the “Service”), provided by ' + C.brand + ' ' +
        '(“we”, “us”, “our”). By booking a consultation you confirm that you have read, understood ' +
        'and accepted these terms. If you do not accept them, please do not book.</p>' +

        '<h3>2. What the Service is</h3>' +
        '<p>The Service is a ' + C.duration + ' one-to-one Vedic astrology (Jyotisha) consultation, ' +
        'delivered remotely by audio or video call at a time you select. The reading is prepared ' +
        'from the birth details and query you supply at the time of booking.</p>' +
        '<p>Consultations are offered for reflection, self-understanding and perspective on timing. ' +
        'They are interpretive in nature and are provided on an “as is” basis.</p>' +

        '<h3>3. What the Service is not</h3>' +
        '<p>This is important, and we state it plainly:</p>' +
        '<ul>' +
        '<li>A consultation is <b>not</b> medical, psychological, psychiatric, legal, financial, ' +
        'investment, taxation or any other form of professional advice, and must never be treated ' +
        'as a substitute for it.</li>' +
        '<li>We do <b>not</b> make predictions concerning death, terminal illness, serious medical ' +
        'diagnosis, pregnancy outcomes, legal verdicts or disasters, and will decline such requests.</li>' +
        '<li>We do <b>not</b> guarantee any specific outcome, result, event or benefit arising from ' +
        'a consultation.</li>' +
        '<li>Nothing said in a consultation should be used as the sole basis for any significant ' +
        'life, health, legal or financial decision. Responsibility for your decisions remains ' +
        'entirely your own.</li>' +
        '</ul>' +

        '<h3>4. Eligibility</h3>' +
        '<p>You must be at least 18 years old to book a consultation. By booking, you confirm that ' +
        'you are. We do not knowingly provide consultations to minors. Where a consultation concerns ' +
        'a third party, you confirm you have that person’s consent to share their birth details.</p>' +

        '<h3>5. Booking and scheduling</h3>' +
        '<p>Slots are booked through the booking form displayed on the website. You will be ' +
        'asked for your date of birth, time of birth, place of birth and a short note describing ' +
        'what you would like the reading to cover. Accurate birth details are essential ' +
        '— the quality of a reading depends directly on them, and we cannot be held ' +
        'responsible for a reading rendered inaccurate by incorrect information supplied to us.</p>' +
        '<p><marquee><b>No payment is taken at the time of booking. Pay post-completion of your 15 minute session</b></marquee></p>' +

        '<h3>6. Fees and payment</h3>' +
        '<p>The fee for a consultation is <b>' + C.price + '</b> (Indian Rupees), inclusive of any ' +
        'applicable taxes unless stated otherwise.</p>' +
        '<p>Payment is requested <b>after</b> the consultation has taken place. A secure payment ' +
        'link is issued by our payment partner, once the session ' +
        'concludes. We do not collect, process or store your card, UPI or bank details at any point.</p>' +

        '<h3>7. Your responsibilities</h3>' +
        '<ul>' +
        '<li>Supply accurate and complete birth information.</li>' +
        '<li>Attend at the scheduled time, or cancel or reschedule in advance.</li>' +
        '<li>Behave respectfully during the consultation.</li>' +
        '<li>Not record, reproduce, publish or redistribute any part of a consultation without our ' +
        'prior written consent.</li>' +
        '</ul>' +

        '<h3>8. Our right to decline or end a session</h3>' +
        '<p>We may decline a booking, or end a consultation in progress, if a request falls outside ' +
        'the scope described in section 3, if the conduct of the participant is abusive or ' +
        'threatening, or if we believe continuing would not be in your interest. Where we end a ' +
        'session for these reasons, no fee is payable.</p>' +

        '<h3>9. Intellectual property</h3>' +
        '<p>All content on the Site — text, design, calculations, code and interactive tools — is ' +
        'owned by ' + C.brand + ' and protected by applicable law. You may read and share links to ' +
        'it. You may not copy, republish or use it commercially without written permission.</p>' +
        '<p>Any written summary supplied to you after a consultation is for your personal use.</p>' +

        '<h3>10. Third-party services</h3>' +
        '<p>The Site relies on third-party services for scheduling, payments and video calling. ' +
        'Their availability, performance and privacy practices are governed by their own terms, ' +
        'and are outside our control.</p>' +

        '<h3>11. Limitation of liability</h3>' +
        '<p>To the fullest extent permitted by law, our total liability arising out of or in ' +
        'connection with a consultation shall not exceed the fee actually paid by you for that ' +
        'consultation. We shall not be liable for indirect, incidental, consequential or punitive ' +
        'loss, including loss of profit, opportunity, data or goodwill, however arising.</p>' +

        '<h3>12. Changes to these terms</h3>' +
        '<p>We may update these terms from time to time. The version published on the Site at the ' +
        'moment you book is the version that applies to that booking.</p>' +

        '<h3>13. Governing law and jurisdiction</h3>' +
        '<p>These terms are governed by the laws of ' + C.country + '. Any dispute shall be subject ' +
        'to the exclusive jurisdiction of the courts of ' + C.city + ', ' + C.state + '.</p>' +

        '<h3>14. Contact</h3>' +
        '<p>' + contactLine + '</p>'
    },

    {
      id: "privacy",
      nav: "Privacy Policy",
      title: "Privacy Policy",
      body:
        '<p class="sl-meta">Last updated ' + C.updated + '</p>' +

        '<h3>1. Our position on your data</h3>' +
        '<p>A birth chart consultation requires unusually personal information — your exact time of ' +
        'birth, and often the reason you are asking. We treat that as confidential. We do not sell ' +
        'it, rent it, trade it or share it for advertising, and we never will.</p>' +

        '<h3>2. What we collect</h3>' +
        '<ul>' +
        '<li><b>Identity and contact details</b> — the name and email address you give when booking.</li>' +
        '<li><b>Birth details</b> — your date, time and place of birth, which are required to ' +
        'compute the chart.</li>' +
        '<li><b>Your query</b> — the short note you write describing what you would like read.</li>' +
        '<li><b>Consultation notes</b> — working notes we make while preparing and delivering ' +
        'your reading.</li>' +
        '<li><b>Payment records</b> — transaction identifiers and amounts returned to us. ' +
        'We never see or hold your card number, UPI ID, CVV or bank credentials.</li>' +
        '</ul>' +
        '<p>The Site itself is a static page. The sidereal sign calculator on it runs entirely in ' +
        'your browser — the date you enter there is never transmitted to us or to anyone else, and ' +
        'is not stored.</p>' +

        '<h3>3. Why we collect it</h3>' +
        '<ul>' +
        '<li>To prepare and deliver the consultation you booked.</li>' +
        '<li>To contact you about your appointment.</li>' +
        '<li>To issue a payment request after the session and keep lawful financial records.</li>' +
        '<li>To answer any question you send us.</li>' +
        '</ul>' +
        '<p>We do not use your information for marketing without your explicit consent.</p>' +

        '<h3>4. Who else processes it</h3>' +
        '<p>We use a small number of third-party services, each of which handles a defined slice ' +
        'of your data under its own privacy policy:</p>' +
        '<ul>' +
        '<li><b>Cal.com</b> — appointment scheduling. Receives your name, email, birth details and ' +
        'query, because these are collected on the booking form.</li>' +
        '<!--<li><b>Razorpay Software Private Limited</b> — payment processing. Receives your name, ' +
        'email and payment instrument details. We receive only a transaction confirmation.</li>-->' +
        '<li><b>Video conferencing provider</b> — used to hold the call itself.</li>' +
        '<li><b>GitHub Pages</b> — static hosting for this website. Standard server logs may record ' +
        'IP addresses.</li>' +
        '</ul>' +
        '<p>We do not share your data with anyone else, except where we are legally compelled to.</p>' +

        '<h3>5. Cookies</h3>' +
        '<p>We set no cookies of our own and run no analytics or advertising trackers. The embedded ' +
        'booking calendar may set cookies necessary for it to function; these are governed by ' +
        'Cal.com’s privacy policy.</p>' +

        '<h3>6. How long we keep it</h3>' +
        '<p>Birth details and consultation notes are retained only as long as needed to serve you ' +
        'and to answer follow-up questions — normally no more than 24 months — after which they are ' +
        'deleted. Financial records are retained for the period required by Indian tax law.</p>' +

        '<h3>7. Security</h3>' +
        '<p>We apply reasonable technical and organisational measures to protect your information. ' +
        'The Site is served over HTTPS. No system is perfectly secure, and we cannot guarantee ' +
        'absolute security of data transmitted over the internet.</p>' +

        '<h3>8. Your rights</h3>' +
        '<p>You may ask us at any time to:</p>' +
        '<ul>' +
        '<li>tell you what information we hold about you;</li>' +
        '<li>correct anything inaccurate;</li>' +
        '<li>delete your birth details and consultation notes;</li>' +
        '<li>stop contacting you.</li>' +
        '</ul>' +
        '<p>Write to <a href="mailto:' + C.email + '">' + C.email + '</a> and we will respond ' +
        C.reply + '. Deletion requests are honoured except where a record must be kept for legal ' +
        'or accounting reasons.</p>' +

        '<h3>9. Children</h3>' +
        '<p>The Service is for adults aged 18 and over. We do not knowingly collect information from ' +
        'children. If you believe a child has provided us with data, contact us and we will delete it.</p>' +

        '<h3>10. Changes</h3>' +
        '<p>If this policy changes, the revised version will be published here with an updated date.</p>' +

        '<h3>11. Contact</h3>' +
        '<p>' + contactLine + '</p>'
    },

    {
      id: "shipping",
      nav: "Shipping &amp; Delivery",
      title: "Shipping and Delivery Policy",
      body:
        '<p class="sl-meta">Last updated ' + C.updated + '</p>' +

        '<h3>1. No physical goods are sold or shipped</h3>' +
        '<p>' + C.brand + ' provides a consultation service only. We do not sell, stock, dispatch ' +
        'or ship any physical product — no gemstones, no yantras, no printed reports, no ' +
        'merchandise. Accordingly, no shipping charges, courier arrangements, delivery addresses or ' +
        'customs formalities apply to any purchase made through this website.</p>' +

        '<h3>2. How the service is delivered</h3>' +
        '<p>Your consultation is delivered <b>electronically</b>, as a live one-to-one call:</p>' +
        '<ul>' +
        '<li>You select an available slot through the booking calendar on this website.</li>' +
        '<li>A confirmation email containing the joining link is sent to you immediately on booking.</li>' +
        '<li>The consultation takes place at the scheduled time and lasts approximately ' +
        C.duration + '.</li>' +
        '<li>Delivery of the service is complete when the consultation has been held.</li>' +
        '</ul>' +

        '<h3>3. Delivery timeline</h3>' +
        '<p>The service is delivered at the appointment time you yourself selected. There is no ' +
        'dispatch period and no waiting time beyond that appointment.</p>' +
        '<p>Where a written summary is offered as part of a consultation, it is sent to the email ' +
        'address used for the booking, normally within 3 business days of the session.</p>' +

        '<h3>4. Failure to deliver</h3>' +
        '<p>If a consultation cannot be held at the scheduled time because of a fault on our side — ' +
        'including technical failure, connectivity loss or practitioner unavailability — we will ' +
        'reschedule at no cost to you. No fee is payable for a session that did not take place. ' +
        'See our Cancellation and Refunds policy.</p>' +

        '<h3>5. Geographic availability</h3>' +
        '<p>Because the service is delivered online, it is available anywhere with an internet ' +
        'connection. Appointment times are shown and confirmed in Indian Standard Time (IST) unless ' +
        'your booking calendar converts them to your local timezone.</p>' +

        '<h3>6. Contact</h3>' +
        '<p>' + contactLine + '</p>'
    },

    {
      id: "refunds",
      nav: "Cancellation &amp; Refunds",
      title: "Cancellation and Refunds Policy",
      body:
        '<p class="sl-meta">Last updated ' + C.updated + '</p>' +

        '<h3>1. You pay after the consultation, not before</h3>' +
        '<p>This policy is short because of how we charge. <b>No payment is taken at the time of ' +
        'booking.</b> A payment link for ' + C.price + ' is issued only once your consultation has ' +
        'actually taken place. Most refund situations therefore never arise — if the session does ' +
        'not happen, there is nothing to refund, because nothing was collected.</p>' +

        '<h3>2. Cancelling or rescheduling your booking</h3>' +
        '<ul>' +
        '<li>You may cancel or reschedule <b>free of charge at any time</b> before the appointment, ' +
        'using the link in your booking confirmation email.</li>' +
        '<li>No cancellation fee is charged under any circumstances.</li>' +
        '<li>We ask, as a courtesy, for at least 2 hours’ notice so the slot can be released to ' +
        'someone else. This is a request, not a condition.</li>' +
        '</ul>' +

        '<h3>3. If you do not attend</h3>' +
        '<p>If you miss your appointment without cancelling, nothing is charged. You are welcome to ' +
        'book again. Repeated no-shows may lead us to decline further bookings.</p>' +

        '<h3>4. If we cancel</h3>' +
        '<p>If we have to cancel or cannot attend, we will tell you as early as possible and offer ' +
        'you a rescheduled slot at your convenience. No fee is payable for a consultation that did ' +
        'not take place.</p>' +

        '<h3>5. If the session was interrupted</h3>' +
        '<p>If a technical failure prevents a meaningful consultation, we will either continue at a ' +
        'rescheduled time at no additional cost, or waive the fee entirely. You will not be asked to ' +
        'pay twice for one consultation.</p>' +

        '<h3>6. If you have already paid and are dissatisfied</h3>' +
        '<p>Because payment follows the session, you are always free to simply decline to pay if the ' +
        'consultation was not worth it to you. You will not be pursued for the fee, and you remain ' +
        'welcome to book again.</p>' +
        '<p>If you have already paid and feel the consultation fell short, write to us at ' +
        '<a href="mailto:' + C.email + '">' + C.email + '</a> within <b>7 days</b> of the session ' +
        'with a brief explanation. Where the complaint is reasonable, we will refund in full. We do ' +
        'not require you to justify the request at length.</p>' +

        '<h3>7. What is not refundable</h3>' +
        '<p>Refunds are not available where a consultation was delivered as described and the ' +
        'request is made more than 7 days afterwards, or where a refund is sought on the basis that ' +
        'a predicted or hoped-for outcome did not occur. As stated in our Terms, no outcome is ' +
        'guaranteed by an astrological consultation.</p>' +

        '<h3>8. How refunds are processed</h3>' +
        '<ul>' +
        '<li>Approved refunds are returned to the original payment method.</li>' +
        '<li>We initiate the refund within <b>3 business days</b> of approving it.</li>' +
        '<li>Your bank or card issuer typically credits it within <b>5–7 business days</b> after ' +
        'that. This part is outside our control.</li>' +
        '<li>No processing fee is deducted from a refund by us.</li>' +
        '</ul>' +

        '<h3>9. Contact</h3>' +
        '<p>For any cancellation or refund question — ' + contactLine + ' We respond ' + C.reply + '.</p>'
    },

    {
      id: "contact",
      nav: "Contact Us",
      title: "Contact Us",
      body:
        '<p class="sl-meta">Last updated ' + C.updated + '</p>' +

        '<p>We answer every message ourselves. There is no ticketing system and no call centre.</p>' +

        '<div class="sl-contact">' +
          '<div class="sl-crow"><span>Email</span><b><a href="mailto:' + C.email + '">' + C.email + '</a></b></div>' +
          (C.phone   ? '<div class="sl-crow"><span>Phone</span><b>' + C.phone + '</b></div>' : '') +
          (C.address ? '<div class="sl-crow"><span>Address</span><b>' + C.address + '</b></div>' : '') +
          '<div class="sl-crow"><span>Location</span><b>' + C.city + ', ' + C.state + ', ' + C.country + '</b></div>' +
          '<div class="sl-crow"><span>Hours</span><b>' + C.hours + '</b></div>' +
          '<div class="sl-crow"><span>Response time</span><b>Typically ' + C.reply + '</b></div>' +
          '<div class="sl-crow"><span>Website</span><b>' + C.site + '</b></div>' +
        '</div>' +

        '<h3>What to write to us about</h3>' +
        '<ul>' +
        '<li><b>Booking help</b> — trouble finding a slot, or needing a time outside those listed.</li>' +
        '<li><b>Birth details</b> — corrections, or questions about an uncertain birth time.</li>' +
        '<li><b>Payments and refunds</b> — anything covered by our Cancellation and Refunds policy.</li>' +
        '<li><b>Your data</b> — access, correction or deletion requests under our Privacy Policy.</li>' +
        '<li><b>Anything you think we got wrong.</b> Corrections are welcome and taken seriously.</li>' +
        '</ul>' +

        '<h3>Before you write about a reading</h3>' +
        '<p>If your question is about what a placement or period means, the fastest route is usually ' +
        'to book a consultation rather than to exchange emails — a chart cannot responsibly be read ' +
        'in a message thread without the full birth data in front of us.</p>' +

        '<h3>Grievance</h3>' +
        '<p>If you are unhappy with any aspect of the service or with how your data has been handled, ' +
        'write to <a href="mailto:' + C.email + '">' + C.email + '</a> with “Grievance” in the ' +
        'subject line. We will acknowledge ' + C.reply + ' and aim to resolve the matter within ' +
        '30 days.</p>'
    }
  ];

  /* ==========================================================================
     3. STYLES
     ========================================================================== */
  var CSS = [
    '.sl-footnav{display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;',
      'padding:22px 0 0;margin-top:26px;border-top:1px solid rgba(255,255,255,.09)}',
    '.sl-footnav>b{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10px;',
      'letter-spacing:.2em;text-transform:uppercase;color:#6f7c96;font-weight:400;margin-right:4px}',
    '.sl-footnav a{font-size:.83rem;color:#aeb8cc;cursor:pointer;transition:color .3s;',
      'text-decoration:none;border-bottom:1px solid transparent}',
    '.sl-footnav a:hover{color:#f2c879;border-bottom-color:rgba(242,200,121,.4)}',

    '.sl-ov{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;',
      'padding:26px;background:rgba(2,4,9,.86);backdrop-filter:blur(14px);',
      '-webkit-backdrop-filter:blur(14px);opacity:0;visibility:hidden;transition:opacity .4s,visibility .4s}',
    '.sl-ov.on{opacity:1;visibility:visible}',
    '.sl-panel{width:min(1000px,100%);height:min(86vh,860px);display:flex;overflow:hidden;',
      'border-radius:22px;border:1px solid rgba(255,255,255,.13);background:#080d18;',
      'box-shadow:0 40px 120px -40px rgba(0,0,0,.95);transform:translateY(16px) scale(.985);',
      'transition:transform .45s cubic-bezier(.22,1,.36,1)}',
    '.sl-ov.on .sl-panel{transform:none}',

    '.sl-side{flex:0 0 232px;border-right:1px solid rgba(255,255,255,.09);padding:24px 16px;',
      'display:flex;flex-direction:column;gap:3px;background:rgba(255,255,255,.022);overflow-y:auto}',
    '.sl-side>b{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:9.5px;',
      'letter-spacing:.2em;text-transform:uppercase;color:#6f7c96;font-weight:400;padding:0 12px 12px}',
    '.sl-side button{text-align:left;padding:11px 13px;border-radius:9px;border:1px solid transparent;',
      'background:none;color:#aeb8cc;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.86rem;',
      'cursor:pointer;transition:.3s;line-height:1.35}',
    '.sl-side button:hover{background:rgba(255,255,255,.05);color:#eef2fa}',
    '.sl-side button.on{background:rgba(242,200,121,.1);border-color:rgba(242,200,121,.3);color:#f2c879}',

    '.sl-main{flex:1;display:flex;flex-direction:column;min-width:0}',
    '.sl-bar{display:flex;align-items:center;justify-content:space-between;gap:14px;',
      'padding:20px 26px;border-bottom:1px solid rgba(255,255,255,.09);flex:0 0 auto}',
    '.sl-bar h2{font-family:"Space Grotesk",system-ui,sans-serif;font-size:1.16rem;font-weight:500;',
      'letter-spacing:-.025em;color:#eef2fa;margin:0;line-height:1.2}',
    '.sl-x{flex:0 0 auto;width:34px;height:34px;border-radius:50%;cursor:pointer;',
      'border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04);color:#aeb8cc;',
      'font-size:17px;line-height:1;transition:.3s}',
    '.sl-x:hover{background:rgba(255,255,255,.1);color:#fff;transform:rotate(90deg)}',

    '.sl-body{flex:1;overflow-y:auto;padding:26px 30px 46px;scroll-behavior:auto}',
    '.sl-body h3{font-family:"Space Grotesk",system-ui,sans-serif;font-size:.98rem;font-weight:500;',
      'letter-spacing:-.015em;color:#f2c879;margin:26px 0 9px}',
    '.sl-body h3:first-of-type{margin-top:6px}',
    '.sl-body p{font-size:.855rem;line-height:1.72;color:#aeb8cc;margin:0 0 12px;max-width:80ch}',
    '.sl-body ul{margin:0 0 14px;padding-left:19px;max-width:80ch}',
    '.sl-body li{font-size:.855rem;line-height:1.68;color:#aeb8cc;margin-bottom:7px}',
    '.sl-body li::marker{color:rgba(242,200,121,.55)}',
    '.sl-body b{color:#eef2fa;font-weight:500}',
    '.sl-body a{color:#5fe3d8;text-decoration:none;border-bottom:1px solid rgba(95,227,216,.35)}',
    '.sl-body a:hover{color:#8ff0e8}',
    '.sl-meta{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10px!important;',
      'letter-spacing:.15em;text-transform:uppercase;color:#6f7c96!important;margin-bottom:22px!important}',
    '.sl-contact{display:flex;flex-direction:column;gap:1px;margin:18px 0 26px;border-radius:12px;',
      'overflow:hidden;border:1px solid rgba(255,255,255,.09)}',
    '.sl-crow{display:flex;gap:16px;padding:13px 16px;background:rgba(255,255,255,.028);flex-wrap:wrap}',
    '.sl-crow span{flex:0 0 130px;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:9.5px;',
      'letter-spacing:.16em;text-transform:uppercase;color:#6f7c96;padding-top:3px}',
    '.sl-crow b{color:#eef2fa;font-weight:500;font-size:.88rem;min-width:0;word-break:break-word}',

    '@media(max-width:820px){',
      '.sl-ov{padding:0}',
      '.sl-panel{width:100%;height:100%;border-radius:0;border:none;flex-direction:column}',
      '.sl-side{flex:0 0 auto;flex-direction:row;overflow-x:auto;gap:7px;padding:12px;',
        'border-right:none;border-bottom:1px solid rgba(255,255,255,.09)}',
      '.sl-side>b{display:none}',
      '.sl-side button{white-space:nowrap;flex:0 0 auto;font-size:.79rem;padding:9px 13px;',
        'border-radius:100px;border-color:rgba(255,255,255,.1)}',
      '.sl-bar{padding:16px 18px}.sl-bar h2{font-size:1.02rem}',
      '.sl-body{padding:20px 18px 40px}',
      '.sl-crow span{flex:0 0 100%}',
      '.sl-footnav{gap:8px 16px}.sl-footnav a{font-size:.79rem}',
    '}',
    '@media(prefers-reduced-motion:reduce){.sl-ov,.sl-panel,.sl-x{transition:none}}'
  ].join('');

  /* ==========================================================================
     4. BUILD
     ========================================================================== */
  function boot() {
    var footer = document.querySelector('footer .wrap');
    if (!footer) return;

    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    // ---- footer link row -------------------------------------------------
    var nav = document.createElement('div');
    nav.className = 'sl-footnav';
    nav.innerHTML = '<b>Legal</b>' + DOCS.map(function (d) {
      return '<a href="#' + d.id + '" data-sl="' + d.id + '">' + d.nav + '</a>';
    }).join('');
    var fbot = footer.querySelector('.fbot');
    if (fbot) footer.insertBefore(nav, fbot); else footer.appendChild(nav);

    // ---- overlay ---------------------------------------------------------
    var ov = document.createElement('div');
    ov.className = 'sl-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Policies');
    ov.innerHTML =
      '<div class="sl-panel">' +
        '<div class="sl-side"><b>' + C.brand + '</b>' +
          DOCS.map(function (d) {
            return '<button type="button" data-sl="' + d.id + '">' + d.nav + '</button>';
          }).join('') +
        '</div>' +
        '<div class="sl-main">' +
          '<div class="sl-bar"><h2 id="slTitle"></h2>' +
            '<button class="sl-x" type="button" aria-label="Close">&times;</button></div>' +
          '<div class="sl-body" id="slBody"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);

    var titleEl = ov.querySelector('#slTitle'),
        bodyEl  = ov.querySelector('#slBody'),
        prevY   = 0,
        open    = false;

    function render(id) {
      var doc = null, i;
      for (i = 0; i < DOCS.length; i++) if (DOCS[i].id === id) doc = DOCS[i];
      if (!doc) return false;
      titleEl.textContent = doc.title;
      bodyEl.innerHTML = doc.body;
      bodyEl.scrollTop = 0;
      ov.querySelectorAll('.sl-side button').forEach(function (b) {
        b.classList.toggle('on', b.dataset.sl === id);
      });
      return true;
    }

    function show(id, push) {
      if (!render(id)) return;
      if (!open) {
        prevY = window.scrollY;
        document.body.style.overflow = 'hidden';
        open = true;
      }
      ov.classList.add('on');
      if (push !== false && location.hash !== '#' + id) {
        history.pushState(null, '', '#' + id);
      }
    }

    function hide() {
      if (!open) return;
      ov.classList.remove('on');
      document.body.style.overflow = '';
      open = false;
      if (isPolicyHash(location.hash)) {
        history.pushState(null, '', location.pathname + location.search);
        window.scrollTo(0, prevY);
      }
    }

    function isPolicyHash(h) {
      var id = (h || '').replace('#', ''), i;
      for (i = 0; i < DOCS.length; i++) if (DOCS[i].id === id) return true;
      return false;
    }

    // clicks: footer links + sidebar buttons
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-sl]');
      if (!t) return;
      e.preventDefault();
      e.stopPropagation();
      show(t.dataset.sl);
    }, true);

    ov.querySelector('.sl-x').addEventListener('click', hide);
    ov.addEventListener('click', function (e) { if (e.target === ov) hide(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) hide();
    });
    window.addEventListener('popstate', function () {
      if (isPolicyHash(location.hash)) show(location.hash.slice(1), false);
      else hide();
    });

    // deep link on first load: starlitinsights.com/#terms
    if (isPolicyHash(location.hash)) show(location.hash.slice(1), false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
