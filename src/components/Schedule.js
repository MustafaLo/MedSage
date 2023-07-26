import {useState, useEffect} from 'react'
import '../styles/Schedule.css'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Tooltip } from '@mui/material';
import {useDb} from '../contexts/DbContext'
import { useAuth } from '../contexts/AuthContext';
import { async } from '@firebase/util';




const Schedule = () => {

    const [events, setEvents] = useState([])
    const [eventHTML, setEventHTML] = useState([])

    const daysToDayID = {
        'Su': '0',
        'M': '1',
        'T': '2',
        'W': '3',
        'Th': '4',
        'Fr': '5',
        'Sa': '6'
    }

    const {currentUser} = useAuth()
    const userUID = currentUser.uid

    const {getUserMedications} = useDb()

    useEffect(() => {
      const initializeMedicationData = async () => {
        const snapshot = await getUserMedications(userUID)
      }
      initializeMedicationData()
    }, [])



    
    
    const createTooltip = (info) => {
        return(
            <Tooltip title={info.event.extendedProps.description} arrow>
              {renderInnerContent(info)}
            </Tooltip>
        )
    }

    const renderInnerContent = (arg) => {
      return(
          <div style={{display:'flex', alignItems:'center'}}>
            <div class="fc-daygrid-event-dot" style={{borderColor: arg.borderColor}}></div>
            <div class="fc-event-time">{arg.timeText + 'm'}</div>
            <div class="fc-event-title">{arg.event.title}</div>
          </div>
      )

    }


    return (
        <section className="schedule">
          <h1 className='schedule-header'>View Your Medication Schedule.</h1>
            <div className="calendar">
                <FullCalendar 
                    height={'auto'}
                    headerToolbar={{start:'',center:'title', end:'prev,next'}}
                    plugins={[dayGridPlugin]} 
                    initialView='dayGrid'
                    dayCount={9}
                    

                    events={[
                        {groupId: 'blueEvents', daysOfWeek: ['4'], startTime: '10:45:00', title: 'event1', description: 'test1'},
                        {title: '', daysOfWeek: ['3', '4'], startTime: '11:00:00', color: 'red', description: 'test2'},
                        {title: '', daysOfWeek: ['3', '4'], startTime: '11:00:00', color: 'red', description: 'test2'},
                        {title: '', daysOfWeek: ['3', '4'], startTime: '11:00:00', color: 'red', description: 'test2'}
                        
                    ]}

                    eventContent={createTooltip}
                />   
            </div>
        </section>
        
    )

}


export default Schedule