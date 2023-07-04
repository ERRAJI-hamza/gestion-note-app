import React ,{useEffect,useState} from 'react'
import { LayoutProf } from '../../components/Layout/LayoutProf.js'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export const NoteElement = () => {
  const params = useParams();
  const [element, setElement] = useState('');
  const [etudiants, setEtudiants] = useState(null);


  //Add row
  const handleAddEtudiant = () => {
    setEtudiants([...(etudiants || []), { etudiant: '', noteCC: null, noteTP: null, notePr: null }]);
  };


  const handleEtudiantChange = (index, field, value) => {
    const updatedEtudiants = [...etudiants];
    updatedEtudiants[index][field] = value;
    setEtudiants(updatedEtudiants);
  };

  useEffect(() => {
    if (params?.id) getNotes();
  }, [params?.id]);

  const getNotes = async () => {
    try {
      const { data } = await axios.get(`/api/user/get-notes/${params.id}`);
      data?.notes.forEach((note) => {
        setEtudiants(note?.etudiants);
      });
      setElement(params.id);
    } catch (error) {
      console.log(error);
    }
  };
  
  //save change
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/api/user/add-notes/", {
            element,
            etudiants
        });
        if (res && res?.data?.success) {
          toast.success(res.data && res.data.message);  
          getNotes(); 
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
  };

  //remove row
  const handleRemoveRow = (index) => {
    const updatedEtudiants = [...etudiants];
    updatedEtudiants.splice(index, 1);
    setEtudiants(updatedEtudiants);
  };

// pdf pour table du notes
const handlePrint = () => {
  const table = document.querySelector('.tableNote');

  html2canvas(table).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate the aspect ratio to maintain proportions
    const aspectRatio = imgWidth / imgHeight;

    // Calculate the scaled dimensions to fit the PDF page
    let scaledWidth = pdfWidth;
    let scaledHeight = pdfWidth / aspectRatio;

    // Check if the height exceeds the page, then scale again
    if (scaledHeight > pdfHeight) {
      scaledHeight = pdfHeight;
      scaledWidth = pdfHeight * aspectRatio;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

    // Remove the last column from the PDF
    const lastColumnWidth = scaledWidth / 10;
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0 + scaledWidth - lastColumnWidth, 0, lastColumnWidth, scaledHeight, 'F');

    pdf.save('note_table.pdf');
  });
};


  return (
    <LayoutProf>

    <div className='containerNote'>
      <table className='tableNote'>
        <thead>
          <tr className='trNote'>
            <th className='thNote'>Name</th>
            <th className='thNote'>CC</th>
            <th className='thNote'>TP</th>
            <th className='thNote'>projet</th>
            <th className='thNote'>Moyenne</th>
            <th className='thNote'>Action</th>
          </tr>
        </thead>
        <tbody>
          {etudiants!==null &&
             etudiants?.map((etudiant, index) => (
            <tr key={index}>
              <td className='tdNote'>
                <input
                  className='inputNote'
                  type="text"
                  value={etudiant.etudiant}
                  onChange={(e) => handleEtudiantChange(index, 'etudiant', e.target.value)}
                />
              </td>
              <td className='tdNote'>
                <input
                  className='inputNote'
                  type="number"
                  value={etudiant.noteCC}
                  onChange={(e) => handleEtudiantChange(index, 'noteCC', e.target.value)}
                />
              </td>
              <td className='tdNote'>
                <input
                  className='inputNote'
                  type="number"
                  value={etudiant.noteTP}
                  onChange={(e) => handleEtudiantChange(index, 'noteTP', e.target.value)}
                />
              </td>
              <td className='tdNote'>
                <input
                  className='inputNote'
                  type="number"
                  value={etudiant.notePr}
                  onChange={(e) => handleEtudiantChange(index, 'notePr', e.target.value)}
                />
              </td>
              <td className='tdNote'>{((etudiant.noteCC * 0.5)+(etudiant.noteTP*0.2)+(etudiant.notePr*0.3)).toFixed(2)}</td>
              <td className='tdNote'>
                <button className='buttonNote remove' onClick={() =>handleRemoveRow(index)}>Remove</button>
              </td>
            </tr>))}
        </tbody>
      </table>
      <div className='btnControlNote'>
         <button className='buttonNote add' onClick={handleAddEtudiant}>Add Row</button>
         <button className='buttonNote save' onClick={handleSubmit}>Save change</button>
         <button className='buttonNote imprimer' onClick={handlePrint}>imprimer</button>
      </div>
    </div>

    </LayoutProf>
  )
}
