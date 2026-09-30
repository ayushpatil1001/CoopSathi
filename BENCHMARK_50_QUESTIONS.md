# CoopSathi AI - 50-Question Evaluation Benchmark

This document provides a 50-question benchmark designed to evaluate the accuracy, retrieval quality, and translation capabilities of the CoopSathi AI RAG engine. The questions cover statutory acts (MSCS Act 2023), government schemes (PMFBY, KCC), and cooperative service queries across multiple Indian languages.

## Part 1: Statutory & Legal Accuracy (MSCS Act 2023)
1. Which section of the MSCS Act 2023 governs the disqualification of voting rights for inactive members?
2. What are the requirements for an "active member" to retain voting rights in the Annual General Meeting (AGM)?
3. Does the Co-operative Election Authority (Section 45) have the power to penalize arbitrary postponement of elections?
4. Can a member file a grievance directly with the Co-operative Ombudsman if the society refuses to return fixed deposits?
5. Which forms are prescribed under Section 85 for filing a complaint and an appeal with the Co-operative Ombudsman?
6. Is a multi-state cooperative society legally required to provide its audited balance sheets to members upon request?
7. What happens to a board director who is found guilty of nepotism during recruitment under the new MSCS Act rules?
8. What is the maximum statutory resolution window for complaints handled by the Co-operative Ombudsman?
9. Under the Model By-Laws 2026, can a PACS (Primary Agricultural Credit Society) function as a Common Service Centre (CSC)?
10. Are multi-state cooperative societies allowed to accept deposits from non-members?

## Part 2: Government Schemes (PMFBY, KCC, AIF)
11. What is the toll-free national helpline number for the Pradhan Mantri Fasal Bima Yojana (PMFBY)?
12. Within how many hours must a farmer report localized crop loss (like hailstorm damage) to the insurance company under PMFBY?
13. What is the premium percentage a farmer has to pay for Kharif crops under PMFBY?
14. How much is the effective interest rate for prompt repayment under the Kisan Credit Card (KCC) scheme?
15. What is the maximum loan limit covered under the 4% KCC interest subvention scheme?
16. How can a PACS apply for funding under the Agriculture Infrastructure Fund (AIF)?
17. What is the interest subvention percentage provided to PACS for building godowns under AIF?
18. Does the PM KISAN scheme provide direct benefit transfers to members of cooperative societies?
19. What is the maximum claim amount a farmer can receive under the PMFBY if the crop is entirely destroyed before harvest?
20. Are dairy cooperatives eligible for the Dairy Processing and Infrastructure Development Fund (DIDF)?

## Part 3: Operational & General Queries (English)
21. How do I register a new multi-state cooperative society?
22. What are the minimum documents required to apply for a Kisan Credit Card?
23. Can an individual be a member of two different PACS in the same district simultaneously?
24. How do I check the status of a grievance filed on the CPGRAMS portal?
25. What is the "Sahakar Se Samriddhi" initiative?
26. How do I verify if a cooperative society is registered with the Central Registrar (CRCS)?
27. Where can I download the Model By-Laws for PACS?
28. What is the role of the National Council for Cooperative Training (NCCT)?
29. How can our society apply for the Computerization of PACS scheme?
30. What is the process for a state cooperative to convert into a multi-state cooperative society?

## Part 4: Multilingual Translation & Intent (Hindi)
31. पीएमएफबीवाई (PMFBY) के तहत खरीफ फसलों के लिए किसान को कितना प्रीमियम देना होता है?
32. सहकारी लोकपाल (Ombudsman) के पास शिकायत दर्ज करने की प्रक्रिया क्या है?
33. किसान क्रेडिट कार्ड (KCC) पर ब्याज दर में कितनी छूट मिलती है?
34. क्या मैं अपनी पैक्स (PACS) समिति का ऑडिट रिपोर्ट देख सकता हूँ?
35. नई बहु-राज्य सहकारी समिति (Multi-State Cooperative) बनाने के लिए कम से कम कितने सदस्यों की आवश्यकता है?

## Part 5: Multilingual Translation & Intent (Marathi)
36. पंतप्रधान पीक विमा योजनेअंतर्गत (PMFBY) पीक नुकसान झाल्यास किती तासांत तक्रार करावी लागते?
37. किसान क्रेडिट कार्ड (KCC) वेळेवर परतफेड केल्यास व्याजदर किती लागतो?
38. सहकारी लोकपालाकडे (Ombudsman) तक्रार कशी करायची?
39. पॅक्स (PACS) चे सभासद होण्यासाठी कोणती कागदपत्रे लागतात?
40. मल्टी-स्टेट को-ऑपरेटिव्ह सोसायटीची निवडणूक प्रक्रिया कशी असते?

## Part 6: Edge Cases, Fallbacks, and Domain Filtering
41. How do I open a savings account in HDFC Bank? *(Expected: Polite out-of-domain rejection)*
42. What is the current price of Bitcoin? *(Expected: Polite out-of-domain rejection)*
43. Who won the cricket match yesterday? *(Expected: Polite out-of-domain rejection)*
44. "My crop is destroyed" *(Expected: Intent detection triggers PMFBY 72-hour guideline and 14447 helpline)*
45. "I didn't get my deposit back from the society" *(Expected: Intent detection triggers Ombudsman Section 85 Form VI process)*
46. "What is section 29?" *(Expected: Accurately retrieves MSCS Act 2023 Section 29 regarding voting rights)*
47. "PACS computerization" *(Expected: Returns the Centrally Sponsored Project for Computerization of PACS)*
48. "How to apply for scheme?" *(Expected: Triggers the mandatory 5-step application guide rule)*
49. "KCC loan interest" *(Expected: Explains the 7% base rate and 3% subvention for prompt repayment = 4% effective)*
50. (Empty Query) / Gibberish like "asdfghjkl" *(Expected: Standardized fallback or error handling)*
