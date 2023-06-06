import '../styles/Navbar.css'
const Navbar = () => {
    return(
        <div className="navbar">
            <div className="logo">
                <h1>MedSage</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="">BUILDER</a></li>
                    <li><a href="">SCHEDULES</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar