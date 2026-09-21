// Automated Integration & Localization Test Suite for Schemes Portal
import http from 'http';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES, getTranslation } from '../data/translations';
import { 
  getLocalizedSector, 
  getLocalizedBeneficiary, 
  getLocalizedScheme,
  getLocalizedState,
  getLocalizedMinistry
} from '../utils/schemeLocalization';
import { SCHEMES_CATALOG } from '../data/schemesCatalog';
import { LanguageCode } from '../types';

function fetchUrl(url: string): Promise<{ statusCode?: number; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('================================================================');
  console.log('🧪 COOPSATHI 93 SCHEMES MULTILINGUAL COMPREHENSIVE AUDIT');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Check Servers & Proxies
  console.log('1. Checking Servers & Proxy Connectivity...');
  try {
    const feHome = await fetchUrl('http://localhost:5173/');
    assert(feHome.statusCode === 200, `Frontend root is accessible (HTTP ${feHome.statusCode})`);

    const feSchemes = await fetchUrl('http://localhost:5173/schemes');
    assert(feSchemes.statusCode === 200, `Frontend /schemes route responds with HTTP 200`);

    const proxySchemes = await fetchUrl('http://localhost:5173/api/schemes');
    const proxyData = JSON.parse(proxySchemes.body);
    assert(proxyData.schemes && proxyData.schemes.length === 93, `Vite proxy on 5173 forwards /api/schemes with all 93 schemes`);

    const beSync = await fetchUrl('http://localhost:5000/api/schemes/meta/sync-status');
    const syncData = JSON.parse(beSync.body);
    assert(syncData.isDailySyncActive === true, 'Daily sync status telemetry is active');
  } catch (err: any) {
    assert(false, `Server connectivity check failed: ${err.message}`);
  }

  // 2. Multilingual Translations Dictionary Coverage
  console.log('\n2. Verifying Translations Dictionary Coverage Across All 7 Languages...');
  assert(SUPPORTED_LANGUAGES.length === 7, `Supported languages array contains exactly 7 languages`);

  const requiredKeys = [
    'navPriorityServices', 'schemesPageTitle', 'schemesPageSubtitle', 'schemesPageDesc',
    'schemesVerifiedPrograms', 'schemesDirectoryBadge', 'schemesSearchPlaceholder',
    'schemesLevelAll', 'schemesLevelCentral', 'schemesLevelState',
    'schemesSortBy', 'schemesSortYearDesc', 'schemesSortYearAsc', 'schemesSortNameAsc', 'schemesSortNameDesc', 'schemesSortSector',
    'schemesSectorHeading', 'schemesResetFilters', 'schemesAllSectors',
    'schemesTargetLabel', 'benAll', 'benFarmers', 'benWomen', 'benStudents', 'benMsme', 'benSeniors', 'benBpl', 'benCoops',
    'schemesShowing', 'schemesOf', 'schemesVerifiedProgramsCount', 'schemesIn', 'schemesLevel', 'schemesClearAll',
    'schemesNoFound', 'schemesNoFoundDesc', 'schemesResetAllBtn',
    'citizenAssistance', 'multilingualHelpdesk', 'schemesAiTitle', 'schemesAiDesc', 'askCoopSathiAi',
    'schemesFaqHeading', 'schemesRelatedPortals',
    'schemeKeyBenefit', 'schemeViewApply', 'schemeCentral', 'schemeCentralProgram', 'schemeStateScheme', 'schemeLaunched',
    'schemeModalBenefitHeading', 'schemeObjectiveHeading', 'schemeBenefitsHeading', 'schemeEligibilityHeading',
    'schemeTargetGroups', 'schemeGuideHeading', 'step1Title', 'step2Title', 'step3Title', 'step4Title', 'step5Title',
    'schemeMandatoryDocs', 'schemeHelpline', 'schemeApplyPortal',
    'schemesLiveBadge', 'syncLiveTelemetry', 'syncSynchronizedWith', 'syncOfficialSources', 'syncLastVerified', 'syncTodayTime', 'syncActiveDatabase', 'schemesCountWord',
    'syncChangelog', 'syncNow', 'syncVerifying', 'syncSuccessMsg', 'syncActiveMsg', 'syncVerifiedLocalMsg', 'syncChangelogTooltip', 'syncNowTooltip', 'syncModalTitle', 'syncModalSubtitle', 'syncProtocolTitle',
    'syncProtocolDesc', 'syncConnectedSources', 'sourceMyScheme', 'sourceBudget', 'sourcePib', 'syncAuditLogs', 'syncDefaultLogDesc', 'syncActiveSchemesCount', 'syncNoRevisions', 'closeBtn',
    'portalPacs', 'portalPmfby', 'portalLaws', 'portalOmbudsman', 'portalNcct',
  ];

  const languages: LanguageCode[] = ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'bn'];
  const regionalLangs: LanguageCode[] = ['hi', 'mr', 'gu', 'ta', 'te', 'bn'];
  let allKeysValid = true;

  for (const lang of languages) {
    const dict = UI_TRANSLATIONS[lang];
    for (const key of requiredKeys) {
      if (!dict[key] || dict[key].trim() === '') {
        console.error(`Missing translation in [${lang}]: ${key}`);
        allKeysValid = false;
      }
    }
  }
  assert(allKeysValid, `All ${requiredKeys.length} scheme keys are fully defined in all 7 languages`);

  // 3. Test Regional Key Assertions
  console.log('\n3. Verifying Regional UI Translations...');
  assert(getTranslation('hi', 'schemesPageTitle') === 'सरकारी योजनाएं एवं कल्याणकारी कार्यक्रम', 'Hindi Schemes Page Title matches');
  assert(getTranslation('mr', 'schemesPageTitle') === 'शासकीय योजना व कल्याणकारी कार्यक्रम', 'Marathi Schemes Page Title matches');
  assert(getTranslation('gu', 'schemesPageTitle') === 'સરકારી યોજનાઓ અને કલ્યાણકારી કાર્યક્રમો', 'Gujarati Schemes Page Title matches');
  assert(getTranslation('ta', 'schemesPageTitle') === 'அரசுத் திட்டங்கள் மற்றும் நலத்திட்டங்கள்', 'Tamil Schemes Page Title matches');
  assert(getTranslation('te', 'schemesPageTitle') === 'ప్రభుత్వ పథకాలు & సంక్షేమ కార్యక్రమాలు', 'Telugu Schemes Page Title matches');
  assert(getTranslation('bn', 'schemesPageTitle') === 'সরকারি প্রকল্প ও কল্যাণমূলক কর্মসূচি', 'Bengali Schemes Page Title matches');
  assert(getTranslation('hi', 'schemesLiveBadge') === '93 लाइव', 'Hindi schemesLiveBadge matches');
  assert(getTranslation('mr', 'schemesLiveBadge') === '93 थेट', 'Marathi schemesLiveBadge matches');
  assert(getTranslation('hi', 'syncTodayTime') === 'आज, सुबह 06:00 IST', 'Hindi syncTodayTime matches');

  // 4. Test Sector, Beneficiary, State, and Ministry Localizations
  console.log('\n4. Verifying All 14 Sectors Across All 6 Regional Languages...');
  const sectors = [
    'Agriculture & Farmer Welfare', 'Health & Nutrition', 'Education & Skill Development',
    'Housing & Urban Development', 'Rural Development & Employment', 'Women & Child Development',
    'Financial Inclusion & Social Security', 'MSME, Entrepreneurship & Startups',
    'Food & Public Distribution', 'Digital India & Governance', 'Environment & Energy',
    'Social Welfare', 'State Flagship Schemes', 'Cooperative Sector Initiatives'
  ];

  let allSectorsValid = true;
  for (const sec of sectors) {
    for (const lang of regionalLangs) {
      const localizedSec = getLocalizedSector(sec, lang);
      if (!localizedSec || localizedSec === sec) {
        console.error(`Sector untranslated for [${lang}]: ${sec}`);
        allSectorsValid = false;
      }
    }
  }
  assert(allSectorsValid, `All 14 sectors are 100% translated in hi, mr, gu, ta, te, bn`);

  console.log('\n5. Verifying All 24 Beneficiary Categories Across All 6 Regional Languages...');
  const beneficiaries = [
    'Farmers', 'Rural', 'MSME', 'Women', 'BPL / Low Income', 'Senior Citizens',
    'Families', 'All Citizens', 'Children', 'Students', 'Youth', 'Artisans',
    'Urban', 'Street Vendors', 'Unorganised Workers', 'SHGs', 'Salaried',
    'Self-Employed', 'Entrepreneurs', 'SC / ST', 'Industry', 'Migrant Workers',
    'PwD / Divyangjan', 'Cooperative Members'
  ];

  let allBeneficiariesValid = true;
  for (const b of beneficiaries) {
    for (const lang of regionalLangs) {
      const localizedB = getLocalizedBeneficiary(b, lang);
      if (!localizedB || localizedB === b) {
        console.error(`Beneficiary untranslated for [${lang}]: ${b}`);
        allBeneficiariesValid = false;
      }
    }
  }
  assert(allBeneficiariesValid, `All 24 beneficiary tags are 100% translated in hi, mr, gu, ta, te, bn`);

  console.log('\n6. Verifying All 48 Administering Ministries Across All 6 Regional Languages...');
  const ministries = [...new Set(SCHEMES_CATALOG.map(s => s.ministry))];
  let allMinistriesValid = true;
  for (const m of ministries) {
    for (const lang of regionalLangs) {
      const localizedM = getLocalizedMinistry(m, lang);
      if (!localizedM || localizedM === m) {
        console.error(`Ministry untranslated for [${lang}]: ${m}`);
        allMinistriesValid = false;
      }
    }
  }
  assert(allMinistriesValid, `All ${ministries.length} administering ministries are 100% translated in hi, mr, gu, ta, te, bn`);

  console.log('\n7. Verifying All Scheme States Across All 6 Regional Languages...');
  const states = [...new Set(SCHEMES_CATALOG.map(s => s.state).filter(Boolean))] as string[];
  let allStatesValid = true;
  for (const st of states) {
    for (const lang of regionalLangs) {
      const localizedSt = getLocalizedState(st, lang);
      if (!localizedSt || localizedSt === st) {
        console.error(`State untranslated for [${lang}]: ${st}`);
        allStatesValid = false;
      }
    }
  }
  assert(allStatesValid, `All ${states.length} scheme states are 100% translated in hi, mr, gu, ta, te, bn`);

  // 8. 100% COVERAGE FOR ALL 93 SCHEMES IN THE CATALOG
  console.log('\n8. Comprehensive Audit: 100% Translation of All 93 Scheme Feature Cards...');
  assert(SCHEMES_CATALOG.length === 93, 'Catalog has exactly 93 schemes');

  let all93SchemesValid = true;
  let translatedCount = 0;

  for (const scheme of SCHEMES_CATALOG) {
    for (const lang of regionalLangs) {
      const localized = getLocalizedScheme(scheme, lang);
      
      const hasTranslatedTitle = localized.title && localized.title.trim() !== '' && localized.title !== scheme.title;
      const hasTranslatedBenefit = localized.benefitSummary && localized.benefitSummary.trim() !== '';
      const hasTranslatedObjective = localized.objective && localized.objective.trim() !== '';

      if (!hasTranslatedTitle || !hasTranslatedBenefit || !hasTranslatedObjective) {
        console.error(`Scheme [${scheme.id}] missing translation for [${lang}]:`, {
          titleOk: hasTranslatedTitle,
          benefitOk: hasTranslatedBenefit,
          objectiveOk: hasTranslatedObjective,
        });
        all93SchemesValid = false;
      } else {
        translatedCount++;
      }
    }
  }

  assert(all93SchemesValid, `All 93 schemes have complete, valid translations in hi, mr, gu, ta, te, bn (${translatedCount}/558 checks passed)`);

  // 9. Sample check for specific flagship schemes
  console.log('\n9. Spot-Checking Flagship Central & State Schemes...');
  const spotCheckIds = ['pm-kisan', 'pmfby', 'mudra', 'pm-surya-ghar', 'mp-ladli-behna', 'mh-ladki-bahin', 'wb-kanyashree', 'pacs-computerization', 'coop-ombudsman'];
  for (const id of spotCheckIds) {
    const s = SCHEMES_CATALOG.find(item => item.id === id)!;
    const hi = getLocalizedScheme(s, 'hi');
    const mr = getLocalizedScheme(s, 'mr');
    const bn = getLocalizedScheme(s, 'bn');
    assert(hi.title.length > 5 && hi.benefitSummary.length > 10, `[${id}] Hindi title and benefit verified`);
    assert(mr.title.length > 5 && mr.benefitSummary.length > 10, `[${id}] Marathi title and benefit verified`);
    assert(bn.title.length > 5 && bn.benefitSummary.length > 10, `[${id}] Bengali title and benefit verified`);
  }

  console.log('\n================================================================');
  console.log(`📊 FINAL RESULT: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test failure:', err);
  process.exit(1);
});
