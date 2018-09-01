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


export const markdownInitCreateBounty = `
![Add an img](https://oracletimes.com/wp-content/uploads/2018/03/Ethereum-Cover.png "ETH")

# Disclosure Policy

No technology is perfect, and N/A believes that working with skilled security researchers across the globe is crucial in identifying weaknesses in any technology. If you believe you've found a security issue in our product or service, we encourage you to notify us. We welcome working with you to resolve the issue promptly.

* Let us know as soon as possible upon discovery of a potential security issue, and we'll make every effort to quickly resolve the issue.
* Provide us a reasonable amount of time to resolve the issue before any disclosure to the public or a third-party.
* Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.

# Exclusions
While researching, we'd like to ask you to refrain from:
* Denial of service
* Spamming
* Social engineering (including phishing) of N/A staff or contractors
* Any physical attempts against N/A property or data centers

Thank you for helping keep N/A and our users safe!

## Code block
\`\`\`js
var React = require('react');
var Markdown = require('');

React.render(
  <Markdown source="# " />,
  document.getElementById('content')
);
\`\`\`

## Table

| min/Max | Critical (CVSS 9.0 - 10.0) | High (CVSS 7.0 - 8.9) | Medium (CVSS 4.0 - 6.9) | Low (CVSS 0.0 - 3.9) |
| ------- | -------------------------- | --------------------- | ----------------------- |--------------------- |
| Minimum |10 ETH                      |5 ETH                  |2 ETH                    |0.1 ETH               |
| Maximum |15 ETH                      |8 ETH                  |5 ETH                    |2 ETH                 |

`
