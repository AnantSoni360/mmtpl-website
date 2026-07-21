import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simulate delay for ML inference
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const plannedDur = Number(body.duration) || 300;
    const value = Number(body.contractValue) || 1000;
    const weight = Number(body.weight) || 5000;
    
    // ML Logic Mock (Determining Delay and Complexity)
    let delayProb = 0.25;
    if (body.season === 'Monsoon') delayProb += 0.3;
    if (body.risk === 'High') delayProb += 0.2;
    if (Number(body.distance) > 500) delayProb += 0.15;
    const isDelayed = delayProb > 0.5;

    // --- MODEL 1 & 2: Workforce Breakdown ---
    const peakWorkforce = Math.floor(value / 12) + Math.floor(weight / 100);
    const workforce = {
      total: peakWorkforce,
      riggers: Math.floor(peakWorkforce * 0.18),
      fitters: Math.floor(peakWorkforce * 0.25),
      welders_rectifier: Math.floor(peakWorkforce * 0.10),
      welders_saw: Math.floor(peakWorkforce * 0.03),
      welders_mig: Math.floor(peakWorkforce * 0.02),
      gas_cutters: Math.floor(peakWorkforce * 0.05),
      grinders: Math.floor(peakWorkforce * 0.05),
      fabricators: Math.floor(peakWorkforce * 0.09),
      electricians: Math.floor(peakWorkforce * 0.04),
      pipefitters: Math.floor(peakWorkforce * 0.02),
      helpers: Math.floor(peakWorkforce * 0.12),
      foremen: Math.floor(peakWorkforce * 0.04),
      engineers: Math.floor(peakWorkforce * 0.02),
      supervisors: Math.floor(peakWorkforce * 0.03),
      hse_officers: Math.floor(peakWorkforce * 0.015),
      crane_operators: Math.floor(peakWorkforce * 0.01)
    };

    // --- MODEL 3: Equipment ---
    const equipment = {
      crane_300t: weight > 10000 ? 1 : 0,
      crane_150t: weight > 5000 ? 3 : (weight > 2000 ? 1 : 0),
      crane_80t: weight > 1000 ? 2 : 0,
      crane_50t: 4,
      hydras_15t: 6,
      man_lifter_120ft: 2,
      man_lifter_80ft: 3,
      forklifts: 2,
      rectifier_machines: Math.floor(workforce.welders_rectifier * 1.2),
      saw_machines: Math.floor(workforce.welders_saw * 1.2),
      mig_machines: Math.floor(workforce.welders_mig * 1.2),
      scaffold_pipes: Math.floor(weight * 1.5),
      scaffold_clamps: Math.floor(weight * 3.0)
    };
    const totalEquipment = Object.values(equipment).reduce((a, b) => a + b, 0);

    // --- MODEL 4: Cost ---
    const predictedCost = isDelayed ? Math.floor(value * 0.95) : Math.floor(value * 0.88);
    const margin = value - predictedCost;
    const marginPct = (margin / value) * 100;
    
    // --- MODEL 5: Schedule ---
    const predictedDays = isDelayed ? Math.floor(plannedDur * 1.15) : plannedDur;
    const varianceDays = isDelayed ? Math.floor(plannedDur * 0.15) : 0;
    const riskLevel = delayProb > 0.6 ? 'HIGH' : (delayProb > 0.4 ? 'MEDIUM' : 'LOW');

    // --- MODEL 6: Safety ---
    const safetyIncidents = body.risk === 'High' ? '3-5' : '0-1';
    let safetyRisk = 'LOW';
    if (body.risk === 'High' || weight > 8000) safetyRisk = 'HIGH';
    else if (body.risk === 'Medium') safetyRisk = 'MEDIUM';

    // --- MODEL 7: Business Outcome ---
    let csat = 9.2;
    if (isDelayed) csat -= 1.5;
    if (safetyRisk === 'HIGH') csat -= 0.5;
    
    let repeatProb = 85;
    if (isDelayed) repeatProb -= 20;
    if (marginPct < 10) repeatProb -= 10;
    
    const response = {
      project_scale: {
         scale_text: weight > 8000 ? "Massive Industrial Project" : (weight > 3000 ? "Large Industrial Project" : "Medium Industrial Project")
      },
      workforce: workforce,
      equipment: {
         ...equipment,
         total_units: totalEquipment
      },
      cost: {
         estimated_value_cr: (value / 100).toFixed(1),
         predicted_cost_cr: (predictedCost / 100).toFixed(1),
         profit_cr: (margin / 100).toFixed(2),
         margin_pct: marginPct.toFixed(1)
      },
      schedule: {
         planned_days: plannedDur,
         predicted_days: predictedDays,
         variance_days: varianceDays > 0 ? `+${varianceDays}` : '0',
         on_time: !isDelayed
      },
      risk: {
         delay_level: riskLevel,
         delay_prob: Math.round(delayProb * 100)
      },
      safety: {
         incidents: safetyIncidents,
         level: safetyRisk
      },
      business: {
         csat: csat.toFixed(1),
         repeat_prob: repeatProb
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process prediction' }, { status: 500 });
  }
}
