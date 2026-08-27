import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import warnings
warnings.filterwarnings('ignore')

print("Loading dataset...")
try:
    df = pd.read_excel('MMTPL_Contract_Dataset_Deterministic.xlsx', sheet_name='Contract_Data')
    
    # 1. Correlation Heatmap
    print("Generating Correlation Heatmap...")
    plt.figure(figsize=(10, 8))
    # Select only numeric columns for correlation
    numeric_df = df.select_dtypes(include=[np.number])
    corr = numeric_df.corr()
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
    plt.title('Correlation Heatmap of Project Metrics', fontsize=16)
    plt.tight_layout()
    plt.savefig('correlation_heatmap.png', dpi=300)
    plt.close()

    # 2. Count Plot: Contract Outcomes by Industry
    print("Generating Industry vs Outcome Bar Chart...")
    plt.figure(figsize=(12, 6))
    sns.countplot(data=df, x='Client_Industry', hue='Contract_Outcome', palette='viridis')
    plt.title('Contract Outcomes by Client Industry', fontsize=16)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('industry_outcomes_barchart.png', dpi=300)
    plt.close()

    # 3. Scatter Plot: Planned vs Actual Duration
    print("Generating Scatter Plot...")
    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=df, x='Planned_Duration_Days', y='Actual_Duration_Days', 
                    hue='Safety_Risk_Level', palette='Set1', s=100, alpha=0.7)
    # Add a perfect prediction line for reference
    max_val = max(df['Planned_Duration_Days'].max(), df['Actual_Duration_Days'].max())
    plt.plot([0, max_val], [0, max_val], 'k--', lw=2, label='On-Time Line')
    
    plt.title('Planned vs Actual Duration (Colored by Risk Level)', fontsize=16)
    plt.legend()
    plt.tight_layout()
    plt.savefig('duration_scatter.png', dpi=300)
    plt.close()

    print("Success! Generated 3 high-quality graphs: correlation_heatmap.png, industry_outcomes_barchart.png, duration_scatter.png")

except Exception as e:
    print(f"Error generating graphs: {e}")
    print("You might need to install seaborn and matplotlib: pip install seaborn matplotlib")
