import { Router, Request, Response } from 'express';

export const pmfbyRouter = Router();

// POST /api/pmfby/calculate
pmfbyRouter.post('/calculate', (req: Request, res: Response) => {
  const { state, district, crop, landArea = 1, season = 'Kharif' } = req.body;

  const acreage = Math.max(0.1, Number(landArea) || 1);
  const sumInsuredPerAcre = 28000;
  const totalSumInsured = Math.round(sumInsuredPerAcre * acreage);

  let farmerRate = 2.0;
  if (season === 'Rabi') farmerRate = 1.5;
  else if (season === 'Commercial/Horticultural') farmerRate = 5.0;

  const totalActuarialRate = 14.5;
  const govtSubsidyRate = totalActuarialRate - farmerRate;

  const farmerPremiumAmount = Math.round((totalSumInsured * farmerRate) / 100);
  const govtSubsidyAmount = Math.round((totalSumInsured * govtSubsidyRate) / 100);

  res.json({
    state: state || 'Maharashtra',
    district: district || 'Kolhapur',
    crop: crop || 'Soybean',
    landArea: acreage,
    season,
    sumInsuredPerAcre,
    totalSumInsured,
    farmerPremiumRate: farmerRate,
    farmerPremiumAmount,
    govtSubsidyRate,
    govtSubsidyAmount,
    cutoffDate: season === 'Rabi' ? '31 December 2026' : '31 July 2026',
    eligible: true,
    claimTollFree: '14447'
  });
});

// GET /api/pmfby/states
pmfbyRouter.get('/states', (_req: Request, res: Response) => {
  res.json([
    { state: 'Maharashtra', districts: ['Ahmednagar', 'Kolhapur', 'Nagpur', 'Nashik', 'Pune'] },
    { state: 'Uttar Pradesh', districts: ['Agra', 'Ayodhya', 'Gorakhpur', 'Lucknow', 'Varanasi'] },
    { state: 'Madhya Pradesh', districts: ['Bhopal', 'Gwalior', 'Indore', 'Jabalpur', 'Ujjain'] },
    { state: 'Gujarat', districts: ['Ahmedabad', 'Bhavnagar', 'Junagadh', 'Rajkot', 'Surat'] },
    { state: 'Karnataka', districts: ['Belagavi', 'Dharwad', 'Mandya', 'Mysuru', 'Tumakuru'] }
  ]);
});
