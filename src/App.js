import './App.css';
import Hero from './components/herosection/Hero';
import Dashbord from './components/dashboard/Dashbord';

function App() {
  return (
    <>
      <div className='appWrapper'>
      <Hero />
      <Dashbord/>
      </div>
      <div className='noticed'><h1>Now Only For Desktop & laptop above 1200px width</h1></div>
    </>
  )
}

export default App;
