import Map from '../components/Map'
import './mainPage.css'

export default function Home() {
  return (
    <main className="h-screen">
      <div className="grid grid-cols-3 h-screen">
        <div className="side-panel">side-panel</div>
        <div className="map col-span-2"><Map /></div>
      </div>
    </main>
  )
}
