import '../styles/Home.css'
import logo from '../styles/logo.png'


const Home = () => {

    return(
        <section className="landing">
            <div className='content1'>
                <a href='/'>
                <div className="logo">
                    <img src={logo} alt="" />
                    <h1>MedSage</h1>
                </div>
                </a>
                <div className="description">
                    <h1 className='landing-header'>The best way to track your medications</h1>
                    <button className='get-started-btn hvr-grow'><a href='/login'>GET STARTED</a></button>
                </div>
                

            </div>
            <div className='content2'></div>
        </section>
    )
}

export default Home