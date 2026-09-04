import { PmfbyCalculationRequest, PmfbyCalculationResult } from '../types';

export interface StateDistrictData {
  state: string;
  districts: string[];
  crops: {
    name: string;
    season: 'Kharif' | 'Rabi' | 'Commercial/Horticultural';
    sumInsuredPerAcre: number;
    cutoffKharif?: string;
    cutoffRabi?: string;
  }[];
}

export const PMFBY_STATE_DATA: StateDistrictData[] = [
  {
    state: 'Maharashtra',
    districts: ['Ahmednagar', 'Amravati', 'Chhatrapati Sambhaji Nagar', 'Kolhapur', 'Nagpur', 'Nashik', 'Pune', 'Solapur', 'Yavatmal'],
    crops: [
      { name: 'Soybean (सोयाबीन)', season: 'Kharif', sumInsuredPerAcre: 24000, cutoffKharif: '31 July' },
      { name: 'Cotton (कापूस)', season: 'Kharif', sumInsuredPerAcre: 35000, cutoffKharif: '31 July' },
      { name: 'Paddy / Rice (भात/धान)', season: 'Kharif', sumInsuredPerAcre: 28000, cutoffKharif: '31 July' },
      { name: 'Pigeon Pea / Tur (तूर)', season: 'Kharif', sumInsuredPerAcre: 22000, cutoffKharif: '31 July' },
      { name: 'Wheat (गहू)', season: 'Rabi', sumInsuredPerAcre: 26000, cutoffRabi: '31 December' },
      { name: 'Gram / Chickpea (हरभरा)', season: 'Rabi', sumInsuredPerAcre: 20000, cutoffRabi: '31 December' },
      { name: 'Sugarcane (ऊस)', season: 'Commercial/Horticultural', sumInsuredPerAcre: 60000, cutoffKharif: '15 July' },
      { name: 'Onion (कांदा)', season: 'Commercial/Horticultural', sumInsuredPerAcre: 45000, cutoffKharif: '31 August' },
    ]
  },
  {
    state: 'Uttar Pradesh',
    districts: ['Agra', 'Aligarh', 'Ayodhya', 'Bareilly', 'Gorakhpur', 'Kanpur Nagar', 'Lucknow', 'Prayagraj', 'Varanasi'],
    crops: [
      { name: 'Paddy / Rice (धान)', season: 'Kharif', sumInsuredPerAcre: 30000, cutoffKharif: '31 July' },
      { name: 'Maize (मक्का)', season: 'Kharif', sumInsuredPerAcre: 20000, cutoffKharif: '31 July' },
      { name: 'Wheat (गेहूं)', season: 'Rabi', sumInsuredPerAcre: 32000, cutoffRabi: '31 December' },
      { name: 'Mustard (सरसों)', season: 'Rabi', sumInsuredPerAcre: 24000, cutoffRabi: '15 December' },
      { name: 'Potato (आलू)', season: 'Commercial/Horticultural', sumInsuredPerAcre: 55000, cutoffRabi: '30 November' },
      { name: 'Sugarcane (गन्ना)', season: 'Commercial/Horticultural', sumInsuredPerAcre: 65000, cutoffKharif: '15 July' },
    ]
  },
  {
    state: 'Madhya Pradesh',
    districts: ['Bhopal', 'Chhindwara', 'Gwalior', 'Hoshangabad (Narmadapuram)', 'Indore', 'Jabalpur', 'Rewa', 'Ujjain'],
    crops: [
      { name: 'Soybean (सोयाबीन)', season: 'Kharif', sumInsuredPerAcre: 25000, cutoffKharif: '31 July' },
      { name: 'Paddy (धान)', season: 'Kharif', sumInsuredPerAcre: 28000, cutoffKharif: '31 July' },
      { name: 'Wheat (गेहूं)', season: 'Rabi', sumInsuredPerAcre: 34000, cutoffRabi: '31 December' },
      { name: 'Gram (चना)', season: 'Rabi', sumInsuredPerAcre: 22000, cutoffRabi: '31 December' },
      { name: 'Mustard (सरसों)', season: 'Rabi', sumInsuredPerAcre: 23000, cutoffRabi: '15 December' },
      { name: 'Garlic (लहसुन)', season: 'Commercial/Horticultural', sumInsuredPerAcre: 48000, cutoffRabi: '15 November' },
    ]
  },
  {
    state: 'Gujarat',
    districts: ['Ahmedabad', 'Amreli', 'Banaskantha', 'Bhavnagar', 'Junagadh', 'Rajkot', 'Surat', 'Vadodara'],
    crops: [
      { name: 'Groundnut (મગફળી/मूंगफली)', season: 'Kharif', sumInsuredPerAcre: 32000, cutoffKharif: '15 July' },
      { name: 'Cotton (કપાસ/कपास)', season: 'Kharif', sumInsuredPerAcre: 38000, cutoffKharif: '15 July' },
      { name: 'Sesamum / Til (તલ)', season: 'Kharif', sumInsuredPerAcre: 18000, cutoffKharif: '15 July' },
      { name: 'Wheat (ઘઉં/गेहूं)', season: 'Rabi', sumInsuredPerAcre: 28000, cutoffRabi: '31 December' },
      { name: 'Cumin / Jeera (જીરું)', season: 'Commercial/Horticultural', sumInsuredPerAcre: 50000, cutoffRabi: '15 December' },
    ]
  },
  {
    state: 'Karnataka',
    districts: ['Belagavi', 'Ballari', 'Dharwad', 'Kalaburagi', 'Mandya', 'Mysuru', 'Shivamogga', 'Tumakuru'],
    crops: [
      { name: 'Paddy (ಭತ್ತ)', season: 'Kharif', sumInsuredPerAcre: 29000, cutoffKharif: '31 July' },
      { name: 'Ragi (ರಾಗಿ)', season: 'Kharif', sumInsuredPerAcre: 21000, cutoffKharif: '31 July' },
      { name: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', season: 'Kharif', sumInsuredPerAcre: 23000, cutoffKharif: '31 July' },
      { name: 'Bengal Gram (ಕಡಲೆ)', season: 'Rabi', sumInsuredPerAcre: 22000, cutoffRabi: '31 December' },
      { name: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ)', season: 'Rabi', sumInsuredPerAcre: 19000, cutoffRabi: '31 December' },
    ]
  },
  {
    state: 'Tamil Nadu',
    districts: ['Coimbatore', 'Cuddalore', 'Madurai', 'Nagapattinam', 'Salem', 'Thanjavur', 'Tiruchirappalli', 'Tirunelveli'],
    crops: [
      { name: 'Samba Paddy (நெல்)', season: 'Kharif', sumInsuredPerAcre: 34000, cutoffKharif: '30 November' },
      { name: 'Millets / Maize (சோளம்)', season: 'Kharif', sumInsuredPerAcre: 22000, cutoffKharif: '15 October' },
      { name: 'Black Gram / Urad (உளுந்து)', season: 'Rabi', sumInsuredPerAcre: 18000, cutoffRabi: '15 January' },
      { name: 'Cotton (பருத்தி)', season: 'Commercial/Horticultural', sumInsuredPerAcre: 36000, cutoffKharif: '31 October' },
    ]
  }
];

export function calculatePmfbyPremium(req: PmfbyCalculationRequest): PmfbyCalculationResult {
  const stateData = PMFBY_STATE_DATA.find(s => s.state === req.state) || PMFBY_STATE_DATA[0];
  const cropData = stateData.crops.find(c => c.name === req.crop) || stateData.crops[0];

  const sumInsuredPerAcre = cropData.sumInsuredPerAcre || 25000;
  const landArea = Math.max(0.1, req.landArea || 1);
  const totalSumInsured = Math.round(sumInsuredPerAcre * landArea);

  // Government capped rates:
  // Kharif foodgrains/oilseeds: 2%
  // Rabi foodgrains/oilseeds: 1.5%
  // Commercial/Horticulture: 5%
  let farmerRate = 2.0;
  if (cropData.season === 'Rabi' || req.season === 'Rabi') {
    farmerRate = 1.5;
  } else if (cropData.season === 'Commercial/Horticultural' || req.season === 'Commercial/Horticultural') {
    farmerRate = 5.0;
  }

  // Actuarial market rate is usually ~12-18%
  const totalActuarialRate = 14.5;
  const govtSubsidyRate = totalActuarialRate - farmerRate;

  const farmerPremiumAmount = Math.round((totalSumInsured * farmerRate) / 100);
  const govtSubsidyAmount = Math.round((totalSumInsured * govtSubsidyRate) / 100);
  const totalActuarialPremium = farmerPremiumAmount + govtSubsidyAmount;

  const cutoff = cropData.cutoffKharif || cropData.cutoffRabi || '31 July 2026';

  return {
    sumInsuredPerAcre,
    totalSumInsured,
    farmerPremiumRate: farmerRate,
    farmerPremiumAmount,
    govtSubsidyRate,
    govtSubsidyAmount,
    totalActuarialPremium,
    cutoffDate: cutoff,
    eligible: true,
    mandatoryDocs: [
      'Aadhaar Card (UIDAI verified)',
      'Land Record (ROR / 7-12 / Khasra / Khatoni) in farmer’s name or registered lease agreement',
      'Bank Account Passbook / Cancelled Cheque (with active Aadhaar-DBT linkage)',
      'Sowing Certificate / Declaration issued by Village Patwari, Gram Sevak or PACS Secretary'
    ],
    nearestClaimCentre: `${req.district} District Cooperative Central Bank & Agriculture Office`,
    claimTollFree: '14447 (National Toll-Free Crop Insurance Helpline)'
  };
}
