// pages/api/predict.js
import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import { log } from 'console';

const execPromise = util.promisify(exec);

export default async function handler(req, res) {
  try {
    
    
    const inputData={};
    if(req.body.gender=='Male'){inputData.gender=1}else inputData.gender=2
    inputData.age=parseInt(req.body.age)
    inputData.hypertension=parseInt(req.body.hypertension)
    if(req.body.heart_disease=='0'){inputData.heart_disease=0}else inputData.heart_disease=1
    inputData.avg_glucose_level=parseInt(req.body.avg_glucose_level)
    inputData.bmi=parseInt(req.body.bmi)
    if(req.body.ever_married=='yes'){inputData.ever_married=1}else inputData.ever_married=0
    if(req.body.smoking_status=='never_smoked'){inputData.smoking_status=1}
    else if(inputData.smoking_status='formerly_smoked') inputData.smoking_status=2;
    else if(inputData.smoking_status='smokes') inputData.smoking_status=3
    else inputData.smoking_status=4 
    if(req.body.Residence_type=='Urban'){inputData.Residence_typeUrban=1;inputData.Residence_typeRural=0}
    else{
      inputData.Residence_typeUrban=0;inputData.Residence_typeRural=1
    }
    if(req.body.work_type=='Govt_job'){inputData.work_typeGovt_job=1;inputData.work_typeNever_worked=0;inputData.work_typePrivate=0;inputData.work_typechildren=0,inputData['work_typeSelf.employed']=0}
    else if(req.body.work_type=='Never_worked'){inputData.work_typeGovt_job=0;inputData.work_typeNever_worked=1;inputData.work_typePrivate=0;inputData.work_typechildren=0,inputData['work_typeSelf.employed']=0}
    else if(req.body.work_type=='Private'){inputData.work_typeGovt_job=0;inputData.work_typeNever_worked=0;inputData.work_typePrivate=1;inputData.work_typechildren=0,inputData['work_typeSelf.employed']=0}
    else if(req.body.work_type=='children'){inputData.work_typeGovt_job=0;inputData.work_typeNever_worked=0;inputData.work_typePrivate=0;inputData.work_typechildren=1,inputData['work_typeSelf.employed']=0}
    else{inputData.work_typeGovt_job=0;inputData.work_typeNever_worked=0;inputData.work_typePrivate=0;inputData.work_typechildren=0,inputData['work_typeSelf.employed']=1}
    
    console.log(req.body);
    console.log(inputData)
    const inputData_json = JSON.stringify(inputData);

    // Use __dirname to get the current directory of the script
    const scriptPath = path.resolve('pages/scripts/predict_script.R');

    // Pass inputData_json as a command-line argument to the R script
    const command = `Rscript "${scriptPath}" "${inputData_json.replace(/"/g, '\\"')}"`;

    // Debug statement
    console.log('Command:', command);

    const { stdout } = await execPromise(command);

    // Debug statement
    console.log('R Script Output:', stdout);

    // Parse the R script output (if needed)
    const result = JSON.parse(stdout.trim());

    res.status(200).json({ result });
  } catch (error) {
    console.error(`Error executing R script: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
