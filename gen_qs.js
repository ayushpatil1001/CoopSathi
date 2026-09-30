const fs = require('fs');

const statDb = require('./backend/src/data/statutoryDatabase.json');
const schemeDb = require('./backend/src/data/schemesDatabase.json');

const questions = [];
let i = 1;

for (const doc of statDb) {
    if (i > 25) break;
    const englishKws = doc.keywords.filter(k => /^[a-zA-Z0-9\s]+$/.test(k));
    if (englishKws.length > 0) {
        questions.push({
            id: `q${i}`,
            question: `What is the policy regarding ${englishKws[0]}?`,
            expected_topic: 'law',
            expected_keywords: [doc.id.toLowerCase(), (doc.sectionOrClause || "").toLowerCase()]
        });
        i++;
    }
}

for (const doc of schemeDb) {
    if (i > 50) break;
    const titleWord = (doc.shortName || doc.title).split('(')[0].trim();
    questions.push({
        id: `q${i}`,
        question: `Tell me about the ${titleWord} scheme.`,
        expected_topic: 'scheme',
        expected_keywords: [doc.id.toLowerCase(), (doc.shortName || "").toLowerCase()]
    });
    i++;
}

const ood = [
    "How to cook spaghetti?", "Who won the fifa world cup?", "What is the price of Bitcoin?",
    "Tell me a joke about animals.", "Write a python script for sorting.",
    "When is the next hollywood movie releasing?", "What is the capital of France?",
    "Sing a song for me.", "How to play cricket?", "What is the weather in New York?"
];

for (const o of ood) {
    questions.push({
        id: `q${i}`,
        question: o,
        expected_topic: 'out_of_scope',
        expected_keywords: []
    });
    i++;
}

fs.writeFileSync('benchmarks/questions.json', JSON.stringify(questions, null, 4));
console.log(`Generated ${questions.length} questions.`);
