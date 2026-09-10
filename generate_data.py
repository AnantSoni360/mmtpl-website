import pandas as pd
import numpy as np
import random
import math

NUM_ROWS = 250
START_YEAR = 2015

np.random.seed(42)
random.seed(42)

clients_data = {
    'JSW Steel': {'Industry': 'Steel', 'Locations': ['Bellary, Karnataka', 'Dolvi, Maharashtra']},
    'Tata Steel': {'Industry': 'Steel', 'Locations': ['Jamshedpur, Jharkhand', 'Kalinganagar, Odisha']},
    'SAIL': {'Industry': 'Steel', 'Locations': ['Bhilai, Chhattisgarh', 'Rourkela, Odisha', 'Bokaro, Jharkhand']},
    'AMNS India': {'Industry': 'Steel', 'Locations': ['Hazira, Gujarat']},
    'Jindal Steel': {'Industry': 'Steel', 'Locations': ['Angul, Odisha', 'Raigarh, Chhattisgarh']},
    'Lloyds Metals': {'Industry': 'Metals & Alloys', 'Locations': ['Chandrapur, Maharashtra']},
    'Vedanta': {'Industry': 'Mining', 'Locations': ['Jharsuguda, Odisha']},
    'Hindalco': {'Industry': 'Metals & Alloys', 'Locations': ['Renukoot, UP']},
    'NTPC': {'Industry': 'Power', 'Locations': ['Korba, Chhattisgarh', 'Vindhyachal, MP']},
    'UltraTech Cement': {'Industry': 'Cement', 'Locations': ['Hirmi, Chhattisgarh']}
}

unit_types_by_ind = {
    'Steel': ['Blast Furnace', 'Sinter Plant', 'Coke Oven', 'Rolling Mill', 'Other (SMS)'],
    'Mining': ['Beneficiation Plant', 'Material Handling'],
    'Cement': ['Material Handling', 'Other (Kiln)'],
    'Power': ['Power-Boiler House', 'Material Handling'],
    'Metals & Alloys': ['Rolling Mill', 'Other (Smelter)']
}

contract_types = ['Mechanical Erection', 'Fabrication & Erection', 'Piping', 'Structural Steel', 'Shutdown Maintenance', 'AMC', 'Revamp']

rows = []
for i in range(1, NUM_ROWS + 1):
    year = START_YEAR + int(i / (NUM_ROWS / 9))
    contract_id = f"MMTPL-{year}-{str(i%1000).zfill(3)}"
    
    client = random.choice(list(clients_data.keys()))
    industry = clients_data[client]['Industry']
    location = random.choice(clients_data[client]['Locations'])
    unit_type = random.choice(unit_types_by_ind[industry])
    
    contract_type = random.choice(contract_types)
    if contract_type == 'AMC':
        nature = 'Maintenance'
    elif contract_type == 'Shutdown Maintenance':
        nature = random.choice(['Shutdown', 'Breakdown-Emergency'])
    elif contract_type == 'Revamp':
        nature = 'Revamp'
    else:
        nature = random.choice(['New Installation', 'Maintenance', 'Revamp'])
        
    scope = f"{contract_type} of {unit_type} equipment"
    
    # Deterministic generation logic
    if nature == 'New Installation':
        weight = random.randint(1000, 10000)
        planned_dur = random.randint(150, 600)
        shifts = random.choice([1, 2])
    elif nature == 'Shutdown' or nature == 'Breakdown-Emergency':
        weight = random.randint(100, 1500)
        planned_dur = random.randint(15, 60)
        shifts = random.choice([2, 3])
    elif nature == 'Maintenance':
        if contract_type == 'AMC':
            weight = random.randint(50, 300)
            planned_dur = 365
            shifts = 1
        else:
            weight = random.randint(200, 3000)
            planned_dur = random.randint(60, 200)
            shifts = random.choice([1, 2])
    else: # Revamp
        weight = random.randint(500, 5000)
        planned_dur = random.randint(90, 300)
        shifts = random.choice([1, 2])
        
    est_value = int(weight * 0.55 + planned_dur * 0.2)
    dist = random.randint(20, 1500)
    
    if unit_type in ['Blast Furnace', 'Power-Boiler House', 'Other (SMS)']:
        risk = 'High'
    elif unit_type in ['Sinter Plant', 'Coke Oven', 'Rolling Mill']:
        risk = 'Medium'
    else:
        risk = 'Low'
        
    repeat = 'Yes' if random.random() < 0.75 else 'No'
    season = random.choice(['Summer', 'Monsoon', 'Winter'])
    
    # Highly predictable logic for outcomes
    # Terminated if: very high distance AND high risk AND nature is New Installation
    is_terminated = (dist > 1200) and (risk == 'High') and (nature == 'New Installation')
    # Delayed if: Monsoon OR (High risk and low shifts) OR heavy weight
    is_delayed = (season == 'Monsoon') or (risk == 'High' and shifts == 1) or (weight > 7000)
    
    if is_terminated:
        actual_dur = int(planned_dur * 0.4)
        delay = actual_dur - planned_dur
        outcome = 'Terminated Early'
        cost_mult = 0.5
    elif contract_type == 'AMC':
        actual_dur = planned_dur
        delay = 0
        outcome = 'Completed On-Time'
        cost_mult = 1.0
    else:
        if is_delayed:
            delay_factor = 1.2 if season == 'Monsoon' else 1.15
            actual_dur = int(planned_dur * delay_factor)
            delay = actual_dur - planned_dur
            outcome = 'Completed Delayed'
            cost_mult = 1.1
        else:
            actual_dur = planned_dur
            delay = 0
            outcome = 'Completed On-Time'
            cost_mult = 0.98
            
    # Add minimal random noise (1-2%) to make it look real but highly predictable
    actual_dur = int(actual_dur * random.uniform(0.99, 1.01))
    if outcome == 'Completed On-Time' and actual_dur > planned_dur:
        actual_dur = planned_dur
    delay = actual_dur - planned_dur
    
    # Deterministic peak MP
    peak_mp = int((weight * 20) / planned_dur * shifts)
    peak_mp = max(20, min(peak_mp, 1500))
    peak_mp = int(peak_mp * random.uniform(0.98, 1.02))
    
    avg_mp = int(peak_mp * 0.7)
    
    # Deterministic skilled manpower percent based on contract type & risk
    base_skill = 50
    if risk == 'High': base_skill += 15
    if risk == 'Low': base_skill -= 10
    if contract_type in ['Piping', 'Fabrication & Erection']: base_skill += 10
    skilled_pct = max(30, min(85, base_skill + random.randint(-2, 2)))
    
    actual_cost = int(est_value * cost_mult * random.uniform(0.99, 1.01))
    
    row = {
        'Contract_ID': contract_id,
        'Client_Name': client,
        'Client_Industry': industry,
        'Plant_Location': location,
        'Plant_Unit_Type': unit_type,
        'Contract_Type': contract_type,
        'Contract_Nature': nature,
        'Scope_Summary': scope,
        'Est_Equipment_Weight_Tons': weight,
        'Est_Contract_Value_INR_Lakhs': est_value,
        'Planned_Duration_Days': planned_dur,
        'Site_Distance_From_Base_KM': dist,
        'Shifts_Planned': shifts,
        'Safety_Risk_Level': risk,
        'Repeat_Client': repeat,
        'Season_of_Start': season,
        'Actual_Peak_Manpower': peak_mp,
        'Actual_Avg_Monthly_Manpower': avg_mp,
        'Skilled_Manpower_Percent': skilled_pct,
        'Actual_Duration_Days': actual_dur,
        'Actual_Cost_INR_Lakhs': actual_cost,
        'Delay_Days': delay,
        'Contract_Outcome': outcome
    }
    rows.append(row)

df_generated = pd.DataFrame(rows)

# Write to a new deterministic dataset file
df_generated.to_excel('MMTPL_Contract_Dataset_Deterministic.xlsx', sheet_name='Contract_Data', index=False)

print("Highly predictable deterministic data generated (250 rows).")
