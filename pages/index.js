import React, { useState } from 'react';

const Index = () => {
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Fetch data from the API endpoint
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gender: event.target.gender.value,
        age: event.target.age.value,
        hypertension: event.target.hypertension.value,
        heart_disease: event.target.heart_disease.value,
        ever_married: event.target.ever_married.value,
        avg_glucose_level: event.target.avg_glucose_level.value,
        bmi: event.target.bmi.value,
        smoking_status: event.target.smoking_status.value,
        Residence_type: event.target.Residence_type.value,
        work_type: event.target.work_type.value,
        // Include other form fields
      }),
      
    });
  
    const data = await response.json();
    console.log('Result from R script:', data.result);
    if (data.result) {
      window.alert(result.toString()); // You can customize the alert message
    } else {
      window.alert(result.toString());
    }
    // Set the result in the component state
    setResult(data.result);

    // Show an alert based on the prediction result
    // if (data.result === '1') {
    //   alert('High risk of stroke!');
    // } else {
    //   alert('Low risk of stroke.');
    // }
  };

  return (
    <div className="container mx-auto mt-8 p-4 w-96">
      <p className='text-3xl'><b>Stroke Prediction</b></p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
            Gender
          </label>
          <select className="mt-1 p-2 border rounded-md w-full" id="gender" name="gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-600">
            Age
          </label>
          <input type="number" className="mt-1 p-2 border rounded-md w-full" id="age" name="age" required />
        </div>

        <div className="mb-4">
          <label htmlFor="hypertension" className="block text-sm font-medium text-gray-600">
            Hypertension
          </label>
          <input type="number" className="mt-1 p-2 border rounded-md w-full" id="hypertension" name="hypertension" required />
        </div>

        {/* Add other form fields here with similar structure */}

        <div className="mb-4">
          <label htmlFor="bmi" className="block text-sm font-medium text-gray-600">
            BMI
          </label>
          <input type="number" className="mt-1 p-2 border rounded-md w-full" id="bmi" name="bmi" required />
        </div>

        <div className="mb-4">
          <label htmlFor="smoking_status" className="block text-sm font-medium text-gray-600">
            Smoking Status
          </label>
          <select className="mt-1 p-2 border rounded-md w-full" id="smoking_status" name="smoking_status" required>
            <option value="formerly_smoked">Formerly Smoked</option>
            <option value="smokes">Smokes</option>
            <option value="never_smoked">Never Smoked</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="Residence_type" className="block text-sm font-medium text-gray-600">
            Residence Type
          </label>
          <select className="mt-1 p-2 border rounded-md w-full" id="Residence_type" name="Residence_type" required>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="work_type" className="block text-sm font-medium text-gray-600">
            Work Type
          </label>
          <select className="mt-1 p-2 border rounded-md w-full" id="work_type" name="work_type" required>
            <option value="Private">Private</option>
            <option value="children">children</option>
            <option value="Govt_job">Govt Job</option>
            <option value="Self_employed">Self Employed</option>
          </select>
        </div>
        <div class="mb-4"> 
                <label for="heart_disease" class="form-label">Heart Disease</label> 

                <select className='border mt-1 p-2 rounded-md' class="form-select" id="heart_disease" name="heart_disease" required> 
                    <option value="yes">yes</option> 
                    <option value="no">no</option> 
                </select> 
        </div> 
        <div class="mb-4"> 
                <label for="ever_married" class="form-label">Ever Married</label> 
                <select className='border mt-1 p-2 rounded-md' class="form-select" id="ever_married" name="ever_married" required> 
                    <option value="yes">yes</option> 
                    <option value="no">no</option> 
                </select> 
            </div>
        <div className="mb-4">
          <label htmlFor="avg_glucose_level" className="block text-sm font-medium text-gray-600">
            Average Glucose Level
          </label>
          <input type="number" className="mt-1 p-2 border rounded-md w-full" id="avg_glucose_level" name="avg_glucose_level" required />
        </div>

        <div>{result && <p className="font-bold">Result: {result}</p>}</div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Index;