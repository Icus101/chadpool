import "nes.css/css/nes.min.css";
import Header from './components/Header';
import Claim from './components/Claim';
import Countdown from "./components/Countdown";
import CountdownTimer from "./components/CountdownTimer";


export default function Home() {
  const targetDate = new Date(1990396360480);
const endTargetDate = new Date(1990596360480);
  return (
    <main className="bg-gradient-to-br from-green-500 to-blue-500 min-h-screen">
      <Header/>
      
      <Claim/>

      {/* <CountdownTimer  initialSeconds ={50}  /> */}
      
    </main>
  )
}
