const UPDATE_MARK_DOWN = 'UPDATE_MARK_DOWN'

const init = `
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



this is a link to [google][]

[google]: http://www.google.com



`;


const initState = {
    submitVuln: init,
    createBounty: init,
};

export function markdownReducer( state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_MARK_DOWN:
        return {
            ...state,
            [payload.name]: payload.value,
        };

    default:
    return state;
    }
}
