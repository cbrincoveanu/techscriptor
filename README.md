# techscriptor [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Techscriptor%20makes%20your%20writing%20precise%20and%20clear&url=https://www.techscriptor.com&hashtags=developers,technical,writing,markdown,editor,documentation)

![Netlify](https://img.shields.io/netlify/9be3ff72-d866-4631-ba2e-36705e1aad58)
![License](https://img.shields.io/github/license/cbrincoveanu/techscriptor)
![Stars](https://img.shields.io/github/stars/cbrincoveanu/techscriptor)
![Forks](https://img.shields.io/github/forks/cbrincoveanu/techscriptor)

Markdown editor for technical writing.

[![Preview](/preview.jpg)](https://www.techscriptor.com)

> ***Techscriptor*** is a Markdown editor that makes your writing precise and
> clear.

Techscriptor helps you avoid the following:

* **Long sentences:** Make your sentences short and clear.
* **Passive voice:** Use the active voice most of the time.
* **Generic expressions:** Reduce imprecise, weak, or generic words.
* **Adverbs:** Avoid adverbs if they add no significant meaning.

A live demo is available here: https://www.techscriptor.com

## Getting Started

You only need a web browser for viewing `index.html` after cloning the
repository to your local machine.

Techscriptor loads its dependencies from CDNs (see below). Other than that, it
loads `ts.min.js` which is the minified[^1] version of `js/techscriptor.js`.

[^1]: minification using https://www.toptal.com/developers/javascript-minifier

## Dependencies

Techscriptor depends on the following (loaded from
[jsdelivr.com](https://www.jsdelivr.com/) and
[cdnjs.cloudflare.com](https://cdnjs.cloudflare.com/)):

* [Ace](https://ace.c9.io/) v1.10.1
* [markdown-it](https://github.com/markdown-it/markdown-it) v13.0.1
* [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) v3.0.3
* [highlight.js](https://highlightjs.org/) v11.6.0
* [Bootstrap](https://getbootstrap.com/) v5.2.1

## Contribute

Your contributions are always welcome! Please have a look at the [contribution
guidelines](/CONTRIBUTING.md) first. 🎉

## License

This software is licensed under the MIT license.
