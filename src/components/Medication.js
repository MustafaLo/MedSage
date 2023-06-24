import '../styles/Medication.css'
import {useState, useEffect, forwardRef, useImperativeHandle} from 'react'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ThemeProvider, createTheme } from "@mui/material/styles";
const Medication = forwardRef(({medID, medicationList, setMedicationList}, _ref) => {

    
    const MUI_BLACK_THEME = createTheme({ palette: { primary: { main: "#000000" } } });

    const [dayClick, setDayClick] = useState({
        'M': 'day',
        'Tu': 'day',
        'W': 'day',
        'Th': 'day',
        'F': 'day',
        'Sa': 'day',
        'Su': 'day'
    })

   const [tempMedicationTimes, setTempMedicationTimes] = useState([''])
   const [deleteTimeHoverState, setDeleteTimeHoverState] = useState([false, false, false, false])

   const [updated, setUpdated] = useState(false)




  /*This is in order to check which medication the user has updated. If the user updates a medicine,
    I pass the updated state along with "medID" so that in my parent component I can appropiately 
    update the right medicine 
  */
   useImperativeHandle(_ref, () => ({
        getUpdateMedInformation: () => {
            return {updated, setUpdated, medID}
        }
   }), [medID, updated])



    const handleMedicationName = (e) => {
        e.preventDefault()
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med) => {
                if(med.id === medID){
                    return {...med, name: e.target.value}
                }

                return med
            })
        )

        setUpdated(true)

    }

    const handleMedicationDays = (id) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med) => {
                if(med.id === medID){
                    const status = handleDayStatus(id)
                    if(status === 'ADD'){
                        return {...med, days: [...med.days, id]}
                    }
                    else if(status === 'REMOVE'){
                        return {...med, days: [...med.days.filter((day) => day !== id)]}
                    }
                }

                return med
            })
        )

        setUpdated(true)

    }

    const handleMedicationTimes = (newTime, timeIndex) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med) => {
                if(med.id == medID){
                    if(timeIndex < med.times.length){
                        return{...med, times:med.times.map((time, index) => index === timeIndex ? newTime : time)}
                    }

                    return{...med, times:[...med.times, newTime]}
                }

                return med
            })
        )

        //This is to ensure users cannot put more than 4 times
        if(tempMedicationTimes.length < 4 && (timeIndex + 1) >= tempMedicationTimes.length){
            const temp = tempMedicationTimes.map((time, index) => index == timeIndex ? newTime : time)
            setTempMedicationTimes([...temp, ''])
        }

        setUpdated(true)
    }


    const handleDeleteMedicationTime = (tindex) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med) => {
                if(med.id == medID){
                    return {...med, times: med.times.filter((time,key) => key !== tindex)}
                }

                return med
            })
        )

        console.log(tindex)
        console.log(tempMedicationTimes)

        if(tempMedicationTimes.length > 1){
            setTempMedicationTimes(tempMedicationTimes.filter((time, key) => key !== tindex))
        }
        else{
            setTempMedicationTimes([''])
        }

        setUpdated(true)

    }

    const handleMedicationNote = (newNote) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med, index) => {
                if(med.id == medID){
                    return {...med, note: newNote}
                }

                return med
            })
        )

        setUpdated(true)
    } 

    const updateDayClickStatus = () => {
        const medication = medicationList.find(med => med.id == medID)
        Object.keys(dayClick).forEach((day) => {
            const updatedDayClick = medication.days.includes(day) ? 'day-clicked' : 'day';
            setDayClick((prevDayClick) => ({
              ...prevDayClick,
              [day]: updatedDayClick
            }));
          });
    }

    const updateTimeClickStatus = () => {
        const times = medicationList.find(med => med.id == medID).times
        setTempMedicationTimes([...times, ''])
    }

    const handleDayStatus = (id) => {
        console.log(dayClick[id])
        if(dayClick[id] === 'day'){
            //setDayClick({...dayClick, [id]: 'day-clicked'})
            return 'ADD'
        }
        else{
            //setDayClick({...dayClick, [id]: 'day'})
            return 'REMOVE'
        }
    }

    useEffect(() => {
        updateDayClickStatus()
    }, [medicationList.find(med => med.id == medID).days])

    useEffect(() => {
        updateTimeClickStatus()
    }, [medicationList.find(med => med.id == medID).times])



    return(
        <div className="medication">
            <div className="medication-header">
                <h1>💊</h1>
                <input 
                    type="text" 
                    placeholder='Enter Your Medication Name' 
                    className="medication-name" 
                    value={medicationList.find(med => med.id == medID).name} 
                    onChange={(e) => handleMedicationName(e)} />
            </div>
            <div className="medication-item">
            <div className="days">
                <p className='days-header'>DAYS</p>
                <button className={dayClick['M']} onClick={() => handleMedicationDays('M')}>M</button>
                <button className={dayClick['Tu']} onClick={() => handleMedicationDays('Tu')}>T</button>
                <button className={dayClick['W']} onClick={() => handleMedicationDays('W')}>W</button>
                <button className={dayClick['Th']} onClick={() => handleMedicationDays('Th')}>T</button>
                <button className={dayClick['F']} onClick={() => handleMedicationDays('F')}>F</button>
                <button className={dayClick['Sa']} onClick={() => handleMedicationDays('Sa')}>S</button>
                <button className={dayClick['Su']} onClick={() => handleMedicationDays('Su')}>S</button>

            </div>
            <div className="times">
                <p className='times-header'>TIMES</p>

                    <div className="time-container">
                        {tempMedicationTimes.map((time, index) => 
                            <ThemeProvider theme={MUI_BLACK_THEME}>
                                <div className="time"
                                onMouseOut={() => setDeleteTimeHoverState(deleteTimeHoverState.map((state, key) => false))} 
                                onMouseOver={() => setDeleteTimeHoverState(deleteTimeHoverState.map((state, key) => key === index ? true : false))} >
                                    <MobileTimePicker 
                                        slotProps={{ 
                                            textField: {  
                                            InputProps: { 
                                                sx:{fontFamily: 'Poppins', backgroundColor: '#7EFFAF', width: 85},
                                                disableUnderline: true }, 
                                            variant: 'standard' 
                                            },

                                            toolbar:{
                                                sx: {backgroundColor: '#7EFFAF'}
                                            }
                                        }}
                                        value={time}
                                        onAccept={(newTime) => handleMedicationTimes(newTime.$d, index)}
                                        />
                                    <button onClick={() => handleDeleteMedicationTime(index)} className="delete-time-btn" id={'delbtn' + index} style={deleteTimeHoverState[index] ? {display:'block'} : {display:'none'}}>Delete</button>

                                </div>
                            </ThemeProvider>
                        )}
                    </div>

            </div>
            <div className="notes">
                <p className='notes-header'>NOTES</p>
                <textarea className="note" rows="7"placeholder='Start Typing' value={medicationList.find(med => med.id == medID).note} onChange={(e) => handleMedicationNote(e.target.value)}></textarea>
            </div>
            </div>
        </div>
        
    )
})

export default Medication