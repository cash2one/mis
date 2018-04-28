var fs = require('fs');
var pageConfig = require('../pageconfig.json');

var content = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Index</title>
  </head>
  <body>
  ${
      '<ul>' +
        pageConfig.pages.map((page) => {
            return `<li><a href="./${page.name}.html">${page.name}</a></li>`
        }).join('')
        + '</ul>'
  }
  </body>
</html>
`
fs.writeFileSync('index.html', content, 'utf8');