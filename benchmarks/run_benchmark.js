const fs = require('fs');
const path = require('path');

async function runBenchmark() {
  console.log("Starting Real RAG Benchmark...");
  
  const questionsPath = path.join(__dirname, 'questions.json');
  const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8').replace(/^\uFEFF/, ''));

  let passed = 0;
  let failed = 0;
  let oodRefusals = 0;
  let lowConfidenceRefusals = 0;
  let totalTime = 0;

  for (let i = 0; i < questions.length; i++) {
    const item = questions[i];
    const start = Date.now();
    try {
      // Connect to the actual Node backend RAG endpoint
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: item.question, language: item.language || 'en' })
      });
      
      const duration = Date.now() - start;
      await new Promise(r => setTimeout(r, 1000));
      totalTime += duration;

      if (res.ok) {
        const data = await res.json();
        const text = data.text.toLowerCase();
        
        let isPass = false;
        
        if (item.expected_topic === 'out_of_scope') {
          // It should successfully refuse
          if (text.includes('independent ai assistant') || text.includes('not provide information on non-governmental')) {
            isPass = true;
            oodRefusals++;
          }
        } else if (item.expected_topic === 'insufficient_evidence') {
          // Should hit our new maxScore < 20 check
          if (text.includes('couldn\'t find sufficient verified information') || text.includes('पढ़ने के लिए पर्याप्त')) {
            isPass = true;
            lowConfidenceRefusals++;
          }
        } else {
          // Must contain at least one expected keyword
          const hasKeyword = item.expected_keywords.some(kw => text.includes(kw.toLowerCase()));
          if (hasKeyword) {
            isPass = true;
          }
        }

        if (isPass) {
          passed++;
        } else {
          failed++;
          console.log(`[FAIL] Q${i+1}: ${item.question}`);
          console.log(`       Expected: ${item.expected_keywords ? item.expected_keywords.join(', ') : item.expected_topic}`);
          console.log(`       Got: ${data.text.substring(0, 100)}...`);
        }
      } else {
        failed++;
        console.log(`[ERROR] Q${i+1} returned ${res.status}`);
      }
    } catch (e) {
      failed++;
      console.log(`[ERROR] Q${i+1} failed to fetch: ${e.message}`);
    }
  }
  
  const accuracy = ((passed / questions.length) * 100).toFixed(1);
  const avgLatency = (totalTime / questions.length).toFixed(0);

  const report = `
========================================
 SIH 2026 RAG BENCHMARK REPORT
========================================
Total Questions: ${questions.length}
Passed: ${passed}
Failed: ${failed}
Accuracy: ${accuracy}%
Average Latency: ${avgLatency}ms
Out of Domain Refusals: ${oodRefusals}
Low Confidence Escapes: ${lowConfidenceRefusals}
========================================
Timestamp: ${new Date().toISOString()}
`;

  console.log(report);
  
  const resultsDir = path.join(__dirname, 'results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }
  fs.writeFileSync(path.join(resultsDir, `report_${Date.now()}.txt`), report);
}

runBenchmark();
