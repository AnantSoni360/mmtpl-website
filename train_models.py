import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingRegressor, GradientBoostingClassifier
from sklearn.metrics import mean_absolute_error, r2_score, accuracy_score, classification_report
import warnings
warnings.filterwarnings('ignore')

# 1. Load Data
df = pd.read_excel('MMTPL_Contract_Dataset_Deterministic.xlsx', sheet_name='Contract_Data')

# 2. Define Features (Inputs) and Targets
features = [
    'Client_Industry', 'Plant_Location', 'Plant_Unit_Type', 
    'Contract_Type', 'Contract_Nature', 'Est_Equipment_Weight_Tons', 
    'Est_Contract_Value_INR_Lakhs', 'Planned_Duration_Days', 
    'Site_Distance_From_Base_KM', 'Shifts_Planned', 
    'Safety_Risk_Level', 'Repeat_Client', 'Season_of_Start'
]

targets_reg = [
    'Actual_Peak_Manpower',
    'Actual_Avg_Monthly_Manpower',
    'Skilled_Manpower_Percent',
    'Actual_Duration_Days',
    'Actual_Cost_INR_Lakhs'
]

target_clf = 'Contract_Outcome'

X = df[features]
y_reg = df[targets_reg]
y_clf = df[target_clf]

# 3. Preprocessing Setup
numeric_features = ['Est_Equipment_Weight_Tons', 'Est_Contract_Value_INR_Lakhs', 
                    'Planned_Duration_Days', 'Site_Distance_From_Base_KM', 'Shifts_Planned']
categorical_features = ['Client_Industry', 'Plant_Location', 'Plant_Unit_Type', 
                        'Contract_Type', 'Contract_Nature', 'Safety_Risk_Level', 
                        'Repeat_Client', 'Season_of_Start']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)
    ])

# 4. Train-Test Split (80% Train, 20% Test)
X_train, X_test, y_reg_train, y_reg_test, y_clf_train, y_clf_test = train_test_split(
    X, y_reg, y_clf, test_size=0.2, random_state=42
)

results = {}

# 5. Train Regression Models
print("--- REGRESSION MODELS EVALUATION ---\n")
for col in targets_reg:
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', GradientBoostingRegressor(n_estimators=300, max_depth=5, random_state=42))
    ])
    
    # Train
    model.fit(X_train, y_reg_train[col])
    
    # Predict
    preds = model.predict(X_test)
    
    # Evaluate
    mae = mean_absolute_error(y_reg_test[col], preds)
    r2 = r2_score(y_reg_test[col], preds)
    
    results[col] = {'MAE': mae, 'R2': r2}
    print(f"Model: {col}")
    print(f"  - Mean Absolute Error (MAE): {mae:.2f}")
    print(f"  - R2 Score: {r2:.2f}\n")

# 6. Train Classification Model
print("--- CLASSIFICATION MODEL EVALUATION ---\n")
clf_model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', GradientBoostingClassifier(n_estimators=300, max_depth=5, random_state=42))
])

clf_model.fit(X_train, y_clf_train)
clf_preds = clf_model.predict(X_test)
acc = accuracy_score(y_clf_test, clf_preds)
print(f"Model: {target_clf}")
print(f"  - Accuracy: {acc * 100:.2f}%\n")
print("Classification Report:")
print(classification_report(y_clf_test, clf_preds))

print("Model training pipeline completed successfully!")
