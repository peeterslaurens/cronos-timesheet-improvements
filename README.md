# cronos-timesheet-improvements

## Installation

### Chrome-Extension

install the official plugin on the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/cronos-timesheet-dopamine/denpkojepcnceollafnenchlcngcbgjo)

### Bookmarklet

To use the bookmarklet version, add a bookmark with the following code:

```
javascript: (function () {var linkNode = document.createElement('link'); linkNode.rel = 'stylesheet'; linkNode.href = 'https://raw.githubusercontent.com/studiohyperdrive/cronos-timesheet-improvements/master/src/inject/inject.css'; document.getElementsByTagName('head')[0].appendChild(linkNode); })();
```

**remark**  
The bookmarklet currently is rather incomplete, see todo section below for feedback...

## Features

* condensed layout
* guard complete button
* left and right arrow keys work now (as expected)

## TODO

* bookmarklet: should not use raw github css
* bookmarklet: should also include and fire the js file
* general: hook into XHR, show success feedback
* ???: your topic here? ==> Make a PR!

## Changelog

[visit the changelog here](changelog.md)