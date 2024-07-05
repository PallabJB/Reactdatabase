import  { useState} from 'react';

import departments from '../data';
import Checkbox from '@mui/material/Checkbox';
import  FormControlLabel  from '@mui/material/FormControlLabel';
import  IconButton  from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../App.css';




const Dropdown = () => {
const [checked, setChecked] = useState<{[key: string]: boolean}>({});
 const [indeterminate, setIndeterminate] = useState<{[key: string]: boolean}>({});
 const [expanded, setExpanded] = useState<{[Key: string]: boolean}>({});

 const handleParentChange = (department: string)=>{
  const newChecked = {...checked};
  const newIndeterminate = {...indeterminate};

  const allChecked = !checked[department] || indeterminate[department];

  const dept = departments.find((dept) => dept.department === department);
  if(dept) {
    dept.sub_departments.forEach((subDept) =>{
      newChecked[subDept] = allChecked;
    });
  }
  newChecked[department] = allChecked;
  newIndeterminate[department] = false;

  setChecked(newChecked);
  setIndeterminate(newIndeterminate);
 };

 const handleChildChange = (department: string, subDept: string) => {
  const newChecked = {...checked};
  newChecked[subDept] = !checked[subDept];

  const dept = departments.find((dept) => dept.department === department);
  if(dept){
    const allChecked = dept.sub_departments.every((sub) => newChecked[sub]);
    const someChecked = dept.sub_departments.some((sub) => newChecked[sub]);

    newChecked[department] = allChecked;
    setIndeterminate((prevState) => ({
      ...prevState,
      [department]: !allChecked && someChecked,
    }));
  }
  setChecked(newChecked);
 };
 ///////// END  CHECKBOX /////////////////////////
 
 ///// APPLYING EXPANDING CONTROLS /////

 const handleExpandToggle = (department: string) => {
  setExpanded((prevState) => ({
    ...prevState,
    [department]: !prevState[department],
  }));
 };

  return (
    
        <div className='department-section' >
      {departments.map((dept) => (
        <div key={dept.department} >
         <FormControlLabel
            control={
              <Checkbox
                checked={checked[dept.department] || false}
                indeterminate={indeterminate[dept.department] || false}
                onChange={() => handleParentChange(dept.department)}
              />
            }
            label={dept.department}         
         />
          <IconButton onClick={() => handleExpandToggle(dept.department)}>
            {expanded[dept.department] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          {expanded[dept.department] &&(
            <ul className='department-list' >
            {dept.sub_departments.map((subDept) => (
              <li key={subDept}>
                  <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[subDept] || false}
                          onChange={() => handleChildChange(dept.department, subDept)}
                        />
                      }
                      label= {subDept}
                  />
              </li>
            ))}
           </ul>

          )}                  
        </div>
      ))}
    </div>        
    
  )
}

export default Dropdown