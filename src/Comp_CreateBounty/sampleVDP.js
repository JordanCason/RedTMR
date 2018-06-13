export const sampleVDP = `Policy Guidelines
This disclosure program is limited to security vulnerabilities in web applications owned by Company.

Eligible Vulnerabilities
We encourage the coordinated disclosure of the following eligible web application vulnerabilities:


Cross-site scripting
Cross-site request forgery in a privileged context
Server-side code execution
Authentication or authorization flaws
Injection Vulnerabilities
Directory Traversal
Information Disclosure
Significant Security Misconfiguration


please provide us a reasonable amount of time to remediate before publicly disclosing.  When submitting a vulnerability, please provide concise steps to reproduce that are easily understood.

Program Exclusions
While we encourage any submission affecting the security of an Adobe web property, unless evidence is provided demonstrating exploitability, the following examples are excluded from this program:


Content spoofing / text injection
Self-XSS [to be valid, cross-site scripting issues must be exploitable in reflected, stored or DOM-based types]
Logout and other instances of low-severity Cross-Site Request Forgery
Cross-site tracing (XST)
Open redirects with low security impact (exceptions are those cases where the impact is higher such as stealing oauth tokens)
Missing http security headers
Missing cookie flags on non-sensitive cookies
Password and account recovery policies, such as reset link expiration or password complexity
Invalid or missing SPF (Sender Policy Framework) records (Incomplete or missing SPF/DKIM)
Vulnerabilities only affecting users of outdated or unpatched browsers and platforms
SSL/TLS best practices
Clickjacking/UI redressing with no practical security impact
Software version disclosure
Username / email enumeration via Login Page or Forgot Password Page error messages
Methods to extend product trial periods.
We are aware that anonymous ftp service is available for ftp.somesite.com.  This server is available for general distribution of various publicly available assets.


Process
Your submission will be reviewed and validated by a member of the Product Security Incident Response Team.  Providing clear and concise steps to reproduce the issue will help to expedite the response.

Terms and Conditions

Please use your own account for testing or research purposes.  Do not attempt to gain access to another user’s account or confidential information.

Please do not test for spam, social engineering or denial of service issues.
Your testing must not violate any law, or disrupt or compromise any data that is not your own.
Please contact company@somesite.com to report security incidents such as customer data leakage or breach of infrastructure.`




const old = `
<h1>Policy</h1><div><div class="markdownable">Guidelines</strong>

This disclosure program is limited to security vulnerabilities in web applications owned by xxxxx.

<p><strong>Eligible Vulnerabilities</strong></p>

<p>We encourage the coordinated disclosure of the following eligible web application vulnerabilities:  </p>

<ul>
<li>Cross-site scripting
<li>Cross-site request forgery in a privileged context</li>
<li>Server-side code execution</li>
<li>Authentication or authorization flaws</li>
<li>Injection Vulnerabilities</li>
<li>Directory Traversal</li>
<li>Information Disclosure</li>
<li>Significant Security Misconfiguration</li>
</ul>

<p>please provide us a reasonable amount of time to remediate before publicly disclosing.  When submitting a vulnerability, please provide concise steps to reproduce that are easily understood.   </p>

<p><strong>Program Exclusions</strong></p>

<p>While we encourage any submission affecting the security of an Adobe web property, unless evidence is provided demonstrating exploitability, the following examples are excluded from this program: </p>

<ul>
<li>Content spoofing / text injection</li>
<li>Self-XSS [to be valid, cross-site scripting issues must be exploitable in reflected, stored or DOM-based types]</li>
<li>Logout and other instances of low-severity Cross-Site Request Forgery </li>
<li>Cross-site tracing (XST)</li>
<li>Open redirects with low security impact (exceptions are those cases where the impact is higher such as stealing oauth tokens)</li>
<li>Missing http security headers </li>
<li>Missing cookie flags on non-sensitive cookies </li>
<li>Password and account recovery policies, such as reset link expiration or password complexity</li>
<li>Invalid or missing SPF (Sender Policy Framework) records (Incomplete or missing SPF/DKIM)</li>
<li>Vulnerabilities only affecting users of outdated or unpatched browsers and platforms</li>
<li>SSL/TLS best practices</li>
<li>Clickjacking/UI redressing with no practical security impact</li>
<li>Software version disclosure</li>
<li>Username / email enumeration via Login Page or Forgot Password Page error messages</li>
<li>Methods to extend product trial periods. </li>
<li>We are aware that anonymous ftp service is available for ftp.somesite.com.  This server is available for general distribution of various publicly available assets.</li>
</ul>

<p><strong>Process</strong></p>

<p>Your submission will be reviewed and validated by a member of the Product Security Incident Response Team.  Providing clear and concise steps to reproduce the issue will help to expedite the response.   </p>

<p><strong>Terms and Conditions</strong></p>

<ul>
<li>Please use your own account for testing or research purposes.  Do not attempt to gain access to another user’s account or confidential information.<br>
</li>
<li>Please do not test for spam, social engineering or denial of service issues. </li>
<li>Your testing must not violate any law, or disrupt or compromise any data that is not your own. </li>
<li>Please contact <a title="PSIRT@somesite.com" href="mailto:company@somesite.com" rel="nofollow noopener noreferrer">company@somesite.com</a> to report security incidents such as customer data leakage or breach of infrastructure.<br>
</li>
</ul>
</div></div><div class="meta-text padding-15--top"><ul class="list list--inline pull-right"><li><a href="/somesite/policy_versions">View changes</a></li><li><a href="">Notify me of changes</a></li></ul><p class="pull-right padding-15--right"><!-- react-text: 191 -->Last updated on<!-- /react-text --><!-- react-text: 192 --> <!-- /react-text --><!-- react-text: 193 -->April 2, 2018<!-- /react-text --><!-- react-text: 194 -->.<!-- /react-text --><!-- react-text: 195 --> <!-- /react-text --></p><div class="clearfix"></div></div>`
