import '../styles/Medication.css'
import {useState, useEffect} from 'react'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ThemeProvider, createTheme } from "@mui/material/styles";
const Medication = ({medindex, medication, medicationList, setMedicationList}) => {
    
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

   const [tempMedicationTimes, setTempMedicationTimes] = useState([])

    useEffect(() => {
        //Setting the status (clicked or unclicked) for the days of medication
        medication.days.map((day) => dayClick[day] = 'day-clicked')
        setTempMedicationTimes([...tempMedicationTimes, ''])
    }, [])

    useEffect(() => {
        console.log(tempMedicationTimes)
    }, [medicationList])


    const handleMedicationName = (e) => {
        e.preventDefault()
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med, index) => {
                if(index === medindex){
                    return {...med, name: e.target.value}
                }

                return med
            })
        )
    }

    const handleMedicationDays = (id) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med, index) => {
                if(index === medindex){
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

    }

    const handleMedicationTimes = (newTime, timeIndex) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med, index) => {
                if(index == medindex){
                    console.log(`listlength ${med.times.length}`)
                    console.log(`timeindex: ${timeIndex}`)
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
            setTempMedicationTimes([...tempMedicationTimes, ''])
        }
    }

    const handleMedicationNote = (newNote) => {
        setMedicationList((prevMedicationList) => 
            prevMedicationList.map((med, index) => {
                if(index == medindex){
                    return {...med, note: newNote}
                }

                return med
            })
        )
    } 

    const handleDayStatus = (id) => {
        console.log(dayClick[id])
        if(dayClick[id] === 'day'){
            setDayClick({...dayClick, [id]: 'day-clicked'})
            return 'ADD'
        }
        else{
            setDayClick({...dayClick, [id]: 'day'})
            return 'REMOVE'
        }
    }

    return(
        <div className="medication">
            <div className="medication-header">
                <h1>💊</h1>
                <input 
                    type="text" 
                    placeholder='Enter Your Medication Name' 
                    className="medication-name" 
                    value={medication.name} 
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
                                <MobileTimePicker 
                                    className='time'
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
                                    onAccept={(newTime) => handleMedicationTimes(newTime, index)}
                                    />
                            </ThemeProvider>
                        )}
                    </div>

            </div>
            <div className="notes">
                <p className='notes-header'>NOTES</p>
                <textarea className="note" rows="7"placeholder='Start Typing' value={medication.note} onChange={(e) => handleMedicationNote(e.target.value)}></textarea>
            </div>
            </div>
        </div>
        
    )
}

export default Medication