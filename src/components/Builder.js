import {useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
import Medication from './Medication'
import '../styles/Builder.css'

const Builder = () => {

    function Med(){
        this.name = ''
        this.days = []
        this.times = []
        this.note = ''
    }


    const [medicationList, setMedicationList] = useState([new Med(), new Med()])

    useEffect(() => {
        console.log(medicationList)
    }, [medicationList])


    return(
        <section className="builder">
            <h1 className='builder-header'>Build your medication schedule.</h1>

            <div className='medicine-list'>
                {medicationList.map((medication, index) => (
                    <Medication medindex={index} medication={medication} medicationList={medicationList} setMedicationList={setMedicationList} />
                ))}
            </div>



        </section>
    )
}

export default Builder