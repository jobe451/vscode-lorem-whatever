[![Known Vulnerabilities](https://snyk.io/test/github/jobe451/vscode-lorem-whatever/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jobe451/vscode-lorem-whatever?targetFile=package.json)

# lorem-whatever README

Lorem Whatever is a random filler text generator, that has build in the following styles:
* Lorem Gibson (immitates William Gibson texts)
* Lorem Buzzword (immitates text filled with tech and marketing buzzwords)
* Lorem Constituation (immitates american constitution text)
* Lorem Genesis (immitates Gensis passages)
* Lorem Basel 3 (immitates german financial regulation text)
* Lorem Faust (immitates german writings of Goethes Faust)

Furthermore, you can provide your own farvorite text as arrays of single sentences to add up to 5 more custom base-text. There is an example included which contains the first two chapters of Alice in Wonderland.

Your favorit Lorem can also be triggered by Ctrl+L.

![Lorem Whatever animation](https://raw.githubusercontent.com/jobe451/vscode-lorem-whatever/master/assets/lorem-whatever.gif)

## Extension Settings

You can customize in Settings:
* minimum Number of words, a lorem text should consist of.
* Your favorit Lorem (for beeing accessible via Ctrl+L)
* Edit the 1-5 Custom arrays for your own base-text extracts to generate Lorems from.


## Contribute

Please feel free to suggest additional text that could be added as custom examples. Especially the Buzzword base-text could use some more creative real-life examples.


## Credits

* Lorem Whatever uses the ["markov-strings"](https://www.npmjs.com/package/markov-strings) module by Simon Cambier to generate random nonesense-filler-text based on some text examples. 
* And of course Andrei Andrejewitsch Markow to have come up with the [algorithm](https://en.wikipedia.org/wiki/Markov_chain)
