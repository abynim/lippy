const Markov = require('./markov');

var go = function(context) {
    
    if(!NSClassFromString("Lippy") && !Mocha.sharedRuntime().loadFrameworkWithName_inDirectory('Lippy', NSBundle.bundleWithURL(context.plugin.url()).resourceURL().path())) {
        console.log("[Lippy] Could not load the Lippy plugin 💩");
        return;
    }
    
    const lipsumSource = Lippy.fetchSource() + "";
    generateMarkovWithSource(lipsumSource, context);
    Lippy.go(context);
    
}

var updateSource = function(context) {
    try {
        const lipsumSource = Lippy.fetchSource() + "";
        generateMarkovWithSource(lipsumSource, context);
        Lippy.go(context);
    } catch(err) {}
}

const generateMarkovWithSource = function(lipsumSource, context) {
    var words = new Markov(lipsumSource, 500, 1);
    context.words = words.generate();
    
    var sentences = new Markov(lipsumSource, 13, 1);
    var sentencesArray = [];
    for(var i = 0; i < 50; i++) {
        sentencesArray.push(sentences.generate());
    }
    context.sentences = NSArray.arrayWithArray(sentencesArray);
    
    var paragraphs = new Markov(lipsumSource, 39, 1);
    var paragraphsArray = [];
    for(var i = 0; i < 15; i++) {
        paragraphsArray.push(paragraphs.generate());
    }
    context.paragraphs = NSArray.arrayWithArray(paragraphsArray);
}
