var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/markdown");
editor.setOptions({
    fontSize: 14,
    vScrollBarAlwaysVisible: true,
    wrap: true
});
function loadPopovers() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    // console.log(popoverTriggerList);
    var popoverList = popoverTriggerList.map(function (element) {
        return new bootstrap.Popover(element, {
            trigger: 'hover focus',
            html: true
        });
    });
}
function getPopover(text, message, color) {
    return `<span style="background: ${color};" tabindex="0" data-bs-toggle="popover"
            data-bs-trigger="focus" data-bs-placement="top" data-bs-content="${message}">
                ${text}
            </span>`;
}
var md = window.markdownit().use(window.markdownitFootnote);
const beforeUnloadListener = (event) => {
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit?";
};
function getReplacementString(i) {
    return "[#r" + i + "]";
}
function countWords(str) {
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;
}
function countSentences(str) {
    s = str.match(/[\w|\)][.?!](\s|$)/g);
    if (s == null) {
        return 0;
    }
    return s.length;
}
function updateView() {
    htmlOutput = md.render(editor.getValue());
    var replacements = [];
    const rules = {
        "hardToRead": {
            "regex": /((\w+,\s+)|(\w+\s+)){20,}(\w+[\.|?|!])/g,
            "message": "This sentence is hard to read.",
            "color": "#f0f0a0",
            "summary": " sentences are hard to read.",
            "summarySingle": " sentence is hard to read."
        },
        "adverbs": {
            "regex": /((\w+)ly)|sometimes|perhaps|maybe/g,
            "message": "<em>Adverb:</em> Use a forceful verb.",
            "color": "#a0e0ff",
            "summary": " adverbs.",
            "summarySingle": " adverb."
        },
        "passiveVoice": {
            "regex": /\b((be(en)?)|(w(as|ere))|(is)|(a(er|m)))(\.|\,)?\s(\w+\s)?(\w+(en|ed))(\s|\.|\,)/g,
            "message": "<em>Passive voice:</em> Use active voice.",
            "color": "#a0f0a0",
            "summary": " uses of passive voice.",
            "summarySingle": " use of passive voice."
        },
        "thereIsThereAre": {
            "regex": /\bThere (is|are)\b/g,
            "message": "<em>Generic:</em> Be precise.",
            "color": "#f0a0f0",
            "summary": " uses of <em>There is</em>/<em>There are</em>.",
            "summarySingle": " use of <em>There is</em>/<em>There are</em>."
        },
        "genericVerb": {
            "regex": /\b(happen|occur)(s?)/g,
            "message": "<em>Generic verb:</em> Use precise verbs.",
            "color": "#f0a0f0",
            "summary": " uses of generic verbs.",
            "summarySingle": " use of generic verbs."
        }
    }
    var ruleReplacements = {}
    for (var label in rules) {
        rule = rules[label];
        ruleReplacements[label] = 0;
        htmlOutput = htmlOutput.replaceAll(rule["regex"], function (match) {
            replacements.push(getPopover(match, rule["message"], rule["color"]));
            ruleReplacements[label]++;
            return getReplacementString(replacements.length - 1);
        });
    }
    console.log(ruleReplacements);
    rulesSummary = "";
    for (var label in rules) {
        var s = rules[label]["summary"];
        if (ruleReplacements[label] == 1) {
            s = rules[label]["summarySingle"];
        }
        rulesSummary += `<div class="rounded m-1 p-1 d-inline-block" style="background: ${rules[label]["color"]};">
                            <span class="badge bg-secondary"> ${ruleReplacements[label]}</span>" 
                            ${s}  
                        </div>`;
    }
    document.getElementById('mdviewSummary').innerHTML = rulesSummary;
    for (let i = 0; i < replacements.length; i++) {
        htmlOutput = htmlOutput.replace(getReplacementString(i), replacements[i]);
    }
    htmlOutput = htmlOutput.replaceAll("<blockquote>", `<blockquote class="blockquote">`);
    htmlOutput = htmlOutput.replaceAll("<table>", `<table class="table table-bordered table-striped">`);
    document.getElementById('mdview').innerHTML = htmlOutput;
    outputWithoutHtml = htmlOutput.replace(/(<([^>]+)>)/ig, "");
    sentences = countSentences(outputWithoutHtml);
    words = countWords(outputWithoutHtml);
    characters = outputWithoutHtml.length - 1;
    if (characters < 0) {
        characters = 0;
    }
    warnings = replacements.length;
    document.getElementById('sentences').innerHTML = sentences;
    document.getElementById('words').innerHTML = words;
    document.getElementById('characters').innerHTML = characters;
    document.getElementById('warnings').innerHTML = warnings;
    warningsClass = "text-success";
    if (warnings / words > 0.03) {
        warningsClass = "text-warning";
    }
    if (warnings / words > 0.05) {
        warningsClass = "text-danger";
    }
    document.getElementById('warnings').className = warningsClass;
    loadPopovers();
    hljs.highlightAll();
    addEventListener("beforeunload", beforeUnloadListener, { capture: true });
}
updateView();
editor.session.on('change', function (delta) { updateView(); });
