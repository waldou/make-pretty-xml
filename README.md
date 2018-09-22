make-pretty-xml
=================

Easy to use tool to present XML in a readable format. The project is structured using RequireJS, Backbone.js and jQuery, and uses Jasmine for unit tests.

### Build commands:
```
npm install
npm run build
```

### Running tests:
Open `test/SpecRunner.html` in Chrome with `--allow-file-access-from-files` argument. This is needed because the spec runner loads the `index.html` body for testing Backbone.js views.

Hint: Close all Chrome instances before running the spec runner.

**Using Windows**:

```
chrome.exe --allow-file-access-from-files
```

**Using Mac**:

Double click `RunSpecRunner.command` or run this command in the terminal from `test` folder:

```
open /Applications/Google\ Chrome.app SpecRunner.html --args --allow-file-access-from-files 
```