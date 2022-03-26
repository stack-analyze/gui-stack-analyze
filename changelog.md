# changelog

stack-analyze desktop all version and notable changes, fixed, remove and new additions in code.

## version 7.0.0
### Added
- new tools
 - twitch info
- replace nonolive recomends to instagram recomends
### fixed
- change script defer to script async
### changed
- delete header bar
- renove sidebar

## version 6.0.0
### Added
- new tools
    - bitly info
    - movie info
    *note: similar to cli*
- add ideas lineup
### fixed
- change script blocking to script defer
### changed
- rewrite some nonolive recomends
- redesign webcomponents

## version 5.0.0
### Added
- new modules
    - coingecko-api
    - normalize.css
- add new tools
    - crypto market
- new design languaje: glassmorphism
- new background colors
- add only webcomponents navbar and custom toast alert
### Fixed
- rewrite all tools
- some render elements using el.append
- reduce the navbar and header element for using webcomponents
### Changed
- remove the module materialize-css to css-plain, normalize.css as reset and js plain
- redesign all tools except crypto market
- add and remove recommends
- change name in some recommends
- modify menu minor changes

## version 4.0.0
### Added
- add new module:
    - systeminformation
- add new tools
    - hardware information
- add new recomendations from version 1.1.0 - 1.1.1
### Fixed
- redesign all tools except pagespeed and new tool hardware information
- remove enter in all tools except hardware information
### Changed
- all tools in one window
- add dropdown navigate
- all tools using same delete analyze except hardware information

## version 3.0.0
### Added
- add new tools
    - anime search
    - github info
- add recomendation section from version 1.0.8 (1.0.85) - 1.0.9
### Fixed
- redesign html validator with hybrid mode (css native and materialize)
### Changed
- pagespeed is separate the tech-stack tool now pagespeed is a tool standalone
- change the doughnut chart to bar chart

## version 2.0.0
### Added
- add the new modules:
    - axios
    - html-validator
    - chart.js
- exclusive tool: html validator
### Fixed
- validate status page
### Changed
- rewitre and organize the tools structure
- remove metalangue

## version 1.0.0
- fisrt official version in npm with the modules:
- main modules:
    - materialize-css
    - material-design-icons
    - wappalyzer
- dev modules:
    - electron
    - electron-builder
    - eslint
