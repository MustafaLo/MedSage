import {useEffect, useState, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
import Medication from './Medication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX} from '@fortawesome/free-solid-svg-icons';
import '../styles/Builder.css'

const Builder = () => {

    function Med(){
        this.name = ''
        this.days = []
        this.times = []
        this.note = ''
    }

    const MED_REF = useRef()



    const [medicationList, setMedicationList] = useState([new Med()])
    const [delMedHoverState, setDelMedHoverState] = useState([false])
    const [buzzOrFloatMed, setBuzzOrFloatMed] = useState('')


    const handleAddMedication = () => {
        setMedicationList([...medicationList, new Med()])
        setDelMedHoverState([...delMedHoverState, true])
    }

    const handleDeleteMedication = (medindex) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.filter((med, index) => index !== medindex)
        )
    
        if(medicationList.length < 2){
            const setMedDayClickStates = MED_REF.current.getSetDayClickStates()
            const setMedTempTimeStates = MED_REF.current.getSetTempMedicationTimeStates()

            setMedDayClickStates({
                'M': 'day',
                'Tu': 'day',
                'W': 'day',
                'Th': 'day',
                'F': 'day',
                'Sa': 'day',
                'Su': 'day'
            })
            setMedTempTimeStates([''])
            setMedicationList([new Med()])
        }



    }

    useEffect(() => {
        console.log(medicationList)
    }, [medicationList])


    


    return(
        <section className="builder">
            <h1 className='builder-header'>Build your medication schedule.</h1>

            <div className='medicine-list'>
                {medicationList.map((medication, index) => (
                    <div className={"medication " + buzzOrFloatMed} 
                        onMouseOver={() => setDelMedHoverState(delMedHoverState.map((state, stateIndex) => stateIndex == index ? true : false))} 
                        onMouseOut={() => setDelMedHoverState(delMedHoverState.map((state, stateIndex) => stateIndex == index ? false : false))}>

                            <Medication ref={MED_REF} medindex={index} medication={medication} medicationList={medicationList} setMedicationList={setMedicationList} />
                            {delMedHoverState[index] && <FontAwesomeIcon onClick={() => handleDeleteMedication(index)} className='del-med-btn' icon={faX} style={{color: "#f10410",}} onMouseOver={() => setBuzzOrFloatMed('hvr-buzz')} onMouseOut={() => setBuzzOrFloatMed('hvr-float')} />}
                    </div>
                ))}
                <FontAwesomeIcon onClick={handleAddMedication} className='add-med-btn hvr-pulse-grow' icon={faPlus} style={{color: "#000000",}}/>
            </div>

        


        </section>
    )
}

export default Builder