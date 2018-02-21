# cronos-timesheet-chrome-extension

## Installation

### Chrome

install the official plugin on the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/cronos-timesheet-dopamine/denpkojepcnceollafnenchlcngcbgjo)

### Other (decent) browser

use the bookmarklet version, add a bookmark with the following code:

```
javascript: (function () {var linkNode = document.createElement('link'); linkNode.rel = 'stylesheet'; linkNode.href = 'https://www.thms.be/cronos-timesheets/timesheets.css'; document.getElementsByTagName('head')[0].appendChild(linkNode); })();
```

Or drag the following link to your bookmarks:
<a href="javascript: (function () {var linkNode = document.createElement('link'); linkNode.rel = 'stylesheet'; linkNode.href = 'https://www.thms.be/cronos-timesheets/timesheets.css'; document.getElementsByTagName('head')[0].appendChild(linkNode); })();" target="blank">Drag me to your bookmark bar</a>

## Features

* condensed layout
* guard complete button
* left and right arrow keys work now (as expected)

## Changelog

### v1.0.1

* added css fixes

### v1.0.0

* added complete button guard
* added keyb navigation left and right