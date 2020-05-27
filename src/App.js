import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [studentsData, setStudentsData] = React.useState([])
  const langList=[{lj:"English"}, {lj:"Spanish"},{lj:"Latin"},{lj:"French"}, {lj:"Russian"},{lj:"Tamil"},{lj:"Telugu"},{lj:"Kanada"},{lj:"Malayalam"}, {lj:"Marathi"}];

 useEffect(() => { 
    const reqEnglish = axios.get('./localisation/lang_english/english.json');
   const reqSpanish = axios.get('./localisation/lang_spanish/spanish.json');
   const reqLatin = axios.get('./localisation/lang_latin/latin.json');
   const reqFrench = axios.get('./localisation/lang_french/french.json');
   const reqRussian = axios.get('./localisation/lang_russian/russian.json');
   const reqTamil = axios.get('./localisation/lang_tamil/tamil.json');
   const reqTelugu = axios.get('./localisation/lang_telugu/telugu.json');
   const reqKanada = axios.get('./localisation/lang_kanada/kanada.json');
   const reqMalayalam = axios.get('./localisation/lang_malayalam/malayalam.json');
   const reqMarathi = axios.get('./localisation/lang_marathi/marathi.json');
   
   axios.all([reqEnglish, reqSpanish, reqLatin, reqFrench, reqRussian, reqTamil, reqTelugu, reqKanada, reqMalayalam, reqMarathi]).then(axios.spread((...students) => {
      setStudentsData([...students]);
  })).catch(errors => {
      console.log("Error in  Fetching json files"+errors);
  })
},[]);

 const renderTableData = (idx) => {
        let rowData = [];  
        let tda= studentsData.map((student, index) => {
            let dd =Object.keys(student.data)[idx];
            return <td>{student.data[dd]}</td>;
         });
            rowData.push(tda);
      return rowData;
      }
  
 const renderTableHeader = () => {
    let tableHeader = [];
     tableHeader = langList.map((key, index) => {
       if( index === 0 )
       {
        return <><th>{"KEY".toUpperCase()}</th><th>{key.lj.toUpperCase()}</th></>
       } else {
        return <th>{key.lj.toUpperCase()}</th>
       }
    })
    return tableHeader;
 }
   
  return (
       <div>
          <h1 id='title'>i18n Table</h1>
             <table id='students'>
                <tbody>
                   <tr>{renderTableHeader()}</tr>
                   {studentsData[0] !== null && studentsData[0] !== undefined &&  Object.keys(studentsData[0].data).map( (key, index)=> (
                    <tr>
                     <td className="student_info">{key}</td>
                     {renderTableData(index)}
                   </tr>
                  ))}
             </tbody>
          </table>
       </div>
    )
 }
export default App;
