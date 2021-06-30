/*

  Displays the StartHere button and then the menu once the button is clicked

*/
import { useEffect, useState } from 'react';
import SimBar from './SimBar.js';
import StartHere from './StartHere';
import { Fade } from 'reactstrap';
import SimulationContainer from './SimulationContainer.js';

export default function SimulationMenu() {
  const [mode, setMode] = useState("Home");
  const [start, setStart] = useState(true);
  const [logo, setLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogo(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    start ? (
      <div>
        <div className="intro-animation"/>
        {!logo && <StartHere start={start} showApp={() => setStart(false)}/>}
      </div>
    ) : (
      <div>
        {(mode === "Home") ? (
          <Fade in={(mode === "Home")}>
            <SimBar setSection={setMode}/>
          </Fade>
        ) : (
          <SimulationContainer mode={mode} setMode={setMode}/>
        )}
      </div>
    )
  );
}
