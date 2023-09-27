import "nes.css/css/nes.min.css";
import Header from './components/Header';
import Claim from './components/Claim';
import Countdown from "./components/Countdown";
import CountdownTimer from "./components/CountdownTimer";
import Chart from "./components/Chart";


export default function Home() {

  return (
    <main className="bg-gradient-to-br from-green-500 to-blue-500 min-h-screen">
      <Header/>
      
      <Claim/>

      {/* <Chart/> */}
      
    </main>
  )
}
