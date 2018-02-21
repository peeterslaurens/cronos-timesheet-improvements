# cronos-timesheet-chrome-extension

## Installation

### Chrome

install the official plugin on the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/cronos-timesheet-dopamine/denpkojepcnceollafnenchlcngcbgjo)

### Other (decent) browser

use the bookmarklet version, add a bookmark with the following code:

```
javascript: (function () {var linkNode = document.createElement('link'); linkNode.rel = 'stylesheet'; linkNode.href = 'https://raw.githubusercontent.com/saelfaer/cronos-timesheet-improvements/master/src/inject/inject.css'; document.getElementsByTagName('head')[0].appendChild(linkNode); })();
```

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