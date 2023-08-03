import {useEffect, useState, useRef} from 'react'
import Medication from './Medication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX} from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-uuid'
import '../styles/Builder.css'
import {useDb} from '../contexts/DbContext'
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs'

const Builder = () => {

    function Med(){
        this.id = uuid()
        this.name = ''
        this.days = []
        this.times = []
        this.note = ''
    }

    /*Using a Medication Reference in order to pass a child state to this parent component*/
    const MED_REF = useRef()


    const [medicationList, setMedicationList] = useState([])
    const [delMedHoverState, setDelMedHoverState] = useState({})
    const [buzzOrFloatMed, setBuzzOrFloatMed] = useState('hvr-float')

    const {currentUser} = useAuth()
    const userUID = currentUser.uid

    const {addUser, addMedication, deleteMedication, updateMedication, getUserMedications} = useDb()

      /*When only one medication persists and the user deletes it, the 
              clicked states for the days and times don't dissappear. Therefore,
              I grab those states from the child Medication component and set them
              back to their original state once the user deletes their only medication.
              This makes the clicked on states for the days and the times go away
            */

    const handleAddMedication = () => {
        const newMed = new Med()
        addMedication(userUID, newMed.id, newMed)
        setMedicationList([...medicationList, newMed])
        setDelMedHoverState({...delMedHoverState, [newMed.id]: true})
    }

    const handleDeleteMedication = (medID) => {
        deleteMedication(userUID, medID)
        setMedicationList((prevMedicationList) => 
            prevMedicationList.filter((med) => med.id !== medID)
        )

    }



    useEffect(() => {
        if(medicationList.length > 0 && MED_REF.current != null){
            const updateMedicationData = MED_REF.current.getUpdateMedInformation()
            const updated = updateMedicationData.updated
            const setUpdated = updateMedicationData.setUpdated
            const medID = updateMedicationData.medID
            const medication = medicationList.find((med) => med.id == medID)
    
            if(updated){
                updateMedication(userUID, medID, medication)
                setUpdated(false)
        }
        }
    }, [medicationList])


    useEffect(() => {
        const initializeMedicationData = async () => {
          try {
            await addUser(userUID)
            const snapshot = await getUserMedications(userUID);
            const medicationObjects = snapshot.docs.map((doc) => {
              const data = doc.data();
              const medication = new Med();

              // Map the Firestore document fields to the Medication object properties
              medication.id = data.id;
              setDelMedHoverState((prevState) => ({...prevState, [medication.id]:false}))
              medication.name = data.name;
              medication.days = data.days; 
              medication.times = data.times.map((time) => dayjs.unix(time.seconds))
              medication.note = data.note;
              
              return medication;
            });
            setMedicationList(medicationObjects)
          } catch (error) {
            console.error("Error retrieving medication data:", error);
          }
        };
        initializeMedicationData();
      }, []);

    

    return(
        <section className="builder">
            <h1 className='builder-header'>Build your medication schedule.</h1>

            <div className='medicine-list'>
                {medicationList.map((medication, index) => (
                    <div 
                        className={"medication " + buzzOrFloatMed} 
                        onMouseOver={() => Object.keys(delMedHoverState).map((medID) => medID == medication.id ? setDelMedHoverState((prevState) => ({...prevState, [medID]:true})) : setDelMedHoverState((prevState) => ({...prevState, [medID]: false})))}
                        onMouseOut={() => Object.keys(delMedHoverState).map((medID) => setDelMedHoverState((prevState) => ({...prevState, [medID] : false})))}
                        >
                            <Medication medID={medication.id} ref={MED_REF} medicationList={medicationList} setMedicationList={setMedicationList} />
                            {delMedHoverState[medication.id] && <FontAwesomeIcon onClick={() => handleDeleteMedication(medication.id)} className='del-med-btn' icon={faX} style={{color: "#f10410",}} onMouseOver={() => setBuzzOrFloatMed('hvr-buzz')} onMouseOut={() => setBuzzOrFloatMed('hvr-float')} />}
                    </div>
                ))}
                <FontAwesomeIcon onClick={handleAddMedication} className='add-med-btn hvr-pulse-grow' icon={faPlus} style={{color: "#000000",}}/>
            </div>


        </section>
    )
}

export default Builder