var fs = require('fs'),
    path = require('path'),
    dot = require('dot');
var cvPath = path.join(process.cwd(), 'cv');

var tmplFilepath = path.join(cvPath, 'cv-template-expe.html');
var dataFilePath = path.join(cvPath, 'data-expe.json');
var sourceHTMLPath = path.join(cvPath, 'cv-tpl.html');
var outputHtmlPath = path.join(cvPath, 'cv.html');

var data = require(dataFilePath);

fs.readFile(sourceHTMLPath, 'utf8', function (err, html) {
    if (err) { console.log(err); return false; }

    var outputTmpl = html.replace(/(<main[^>]*>)([\s\S]+?)(<\/main>)/ig, function(match, p1, content, p2){

        var tmpl = dot.template(content);
        var outputTmpl = tmpl(data);
        return p1 + outputTmpl + p2;
    });


    fs.writeFile(outputHtmlPath, outputTmpl, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved! to " + outputHtmlPath);
    }); 

});