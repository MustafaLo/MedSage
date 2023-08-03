import {useState, useEffect} from 'react'
import '../styles/Schedule.css'
import FullCalendar from '@fullcalendar/react' 
import listPlugin from '@fullcalendar/list';
import { Tooltip } from '@mui/material';
import {Checkbox} from '@mui/material'
import {useDb} from '../contexts/DbContext'
import { useAuth } from '../contexts/AuthContext';


const Schedule = () => {

    const [events, setEvents] = useState([])
    const [completions, setCompletions] = useState({})

    const daysToDayID = {
        'Su': '0',
        'M': '1',
        'Tu': '2',
        'W': '3',
        'Th': '4',
        'F': '5',
        'Sa': '6'
    }

    const {currentUser} = useAuth()
    const userUID = currentUser.uid

    const {getUserMedications, updateMedicationCompletion} = useDb()

    useEffect(() => {
      const initializeMedicationData = async () => {
        const snapshot = await getUserMedications(userUID)
        const completionsObject = {}

        snapshot.docs.forEach((doc) => {
          const data = doc.data()
          completionsObject[data.name] = data.completions.map((time) => time)
        })
    
        const eventObjects = snapshot.docs.flatMap((doc) => {
          const data = doc.data()

          if(data.times.length == 0){
            return{
              title: data.name,
              note: data.note,
              startTime: 'None',
              daysOfWeek: data.days.map((day) => daysToDayID[day]),
              medID: data.id,
              color: '#56bf77',
            }
          }
          else{
            return data.times.map((time) => {
              return {
                title: data.name,
                note: data.note,
                startTime: time.toDate().toTimeString(),
                daysOfWeek: data.days.map((day) => daysToDayID[day]),
                medID: data.id,
                color: '#56bf77',
              }
            })
          }


          
        })
        setEvents(eventObjects)
        setCompletions(completionsObject)
      }

      initializeMedicationData()
    }, [])


    const validRange = (nowDate) => {
      return {
        start: nowDate
      }
    }

    const recordCompletion = (arg, checked) => {
      const newCompletions = checked
      ? [...completions[arg.title], arg.start.toISOString()]
      : completions[arg.title].filter((time) => time !== arg.start.toISOString())


      setCompletions((prevCompletions) => ({
        ...prevCompletions,
        [arg.title]: newCompletions,
      }))

      updateMedicationCompletion(userUID, arg.extendedProps.medID, newCompletions)
    }

 
    
    const createTooltip = (info) => {
        return(
            <Tooltip 
              title={info.event.extendedProps.note} 
              followCursor
              placement='bottom'
              componentsProps={{
                tooltip:{
                  sx:{fontFamily:'Poppins', backgroundColor:'#5FEE92', color:'black', fontSize:12}
                }
              }}
             
              >
              {renderInnerContent(info)}
            </Tooltip>
        )
    }


    const renderInnerContent = (arg) => {
      return(
          <div>
            <div className="event-info">
              <div className="fc-list-event-title">
                <a>{arg.event.title}</a>
              </div>
              <div className="checkbox">
                <Checkbox
                  color='success'
                  onChange={(e) => recordCompletion(arg.event, e.target.checked)}
                  checked={completions[arg.event.title].includes(arg.event.start.toISOString())}
                >

                </Checkbox>
              </div>
            </div>
          </div>
      )

    }

    return (
        <section className="schedule">
          <h1 className='schedule-header'>View your medication schedule.</h1>
            <div className="calendar hvr-float">
                <FullCalendar 
                    height={'auto'}
                    headerToolbar={{start:'',center:'title', end:'prev,next'}}
                    plugins={[listPlugin]} 
                    initialView='listWeek'
                    events={events}
                    eventContent={createTooltip}
                    validRange={validRange}
                    allDayText={'Any'}
                />   
            </div>
        </section>
        
    )

}


export default Schedule