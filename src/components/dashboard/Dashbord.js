import { React, useEffect, useState } from 'react'
import "../../styles/dashboard.css"
function Dashbord() {
    const [seasonGetData, setseasonGetData] = useState([])
    const [driverGetData, setDriverGetData] = useState([])
    const [seasonGetYear, setSeasonGetYear] = useState("2012")
    const [activeButton, setActiveButton] = useState()
    const [toggelDriverAndTeam, setToggelDriverAndTeam] = useState("drivers")
    // get Season year 
    function getSeasonYear(thisYear) {
        setSeasonGetYear(thisYear.target.innerText)
        setActiveButton(thisYear.target.id)
        console.log(thisYear.target.id)
    }
    // get Season year 
    function toggel() {
        setToggelDriverAndTeam((e) => e === "drivers" ? "teams" : "drivers")
        console.log(activeButton)
    }

    // get Season
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "ae50ba8385b8baf970164cd122b870f5");
        myHeaders.append("x-rapidapi-host", "v1.formula-1.api-sports.io");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://v1.formula-1.api-sports.io/seasons", requestOptions)
            .then(response => response.json())
            .then(result => setseasonGetData(result.response))
            .catch(error => console.log('error', error));
    }, [])

    // Fetching For Driver Ranking
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "ae50ba8385b8baf970164cd122b870f5");
        myHeaders.append("x-rapidapi-host", "v1.formula-1.api-sports.io");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://v1.formula-1.api-sports.io/rankings/${toggelDriverAndTeam}?season=${seasonGetYear}`, requestOptions)
            .then(response => response.json())
            .then(result => setDriverGetData(result.response))
            .catch(error => console.log('error', error));
    }, [seasonGetYear, toggelDriverAndTeam])


    return (
        // Season 
        <div className='dashboardWrapper'>
            <div className='seasonWrapper'>
                <div className='seasonText'>
                    <h1>Season</h1>
                </div>
                <div className='seasonButton'>
                    {
                        seasonGetData?.map((e, i) => {
                            return <button className={` ${activeButton == i ?"activeButton":"" }`} id={i} onClick={(thisYear) => getSeasonYear(thisYear)} key={i}>{e}</button>
                        })
                    }
                </div>
            </div>

            <div className='rankingWrapper'>
                <div className='rankingContent'>
                    <h1>Ranking</h1>
                    <div className='teamSwitchButton'>
                        <span>Team</span><div onClick={toggel} className='toggel'>
                            <div className={`togeelButton ${toggelDriverAndTeam === "teams" ? "toggelRight" : "toggelLeft"}`}></div>
                        </div>

                    </div>
                </div>
                {/*  Ranking */}
                <div className='rankingDashboard'>
                    <div className='dashboardDataTitle'>
                        <ul>
                            <li className='posotionLi'>
                                <span>Postion</span> <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.83911 5.45996L0.90625 0.551758H10.772L5.83911 5.45996Z" fill="#131212" />
                                </svg>
                            </li>
                            <li>
                                <span>Name</span><svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83911 5.45996L0.90625 0.551758H10.772L5.83911 5.45996Z" fill="#131212" />
                            </svg></li>
                            <li>Logo</li>
                            <li>Points</li>
                        </ul>
                    </div>
                    <div className='dashboardDataTitle'>
                        {
                            driverGetData?.map((e, i) => {
                                return (
                                    <ul key={i} className='perUserPerData'>
                                        <li>{e.position}</li>
                                        <li>{e.driver ? e.driver.name : e.team.name}</li>
                                        <li> <img width={72} height={40} src={e.driver ? e.driver.image : e.team.logo} alt='here are images' /></li>
                                        <li>{e?.points}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>

        // Ranking 


    )
}

export default Dashbord