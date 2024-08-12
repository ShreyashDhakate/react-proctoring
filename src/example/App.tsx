import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useProctoring } from '../hooks/useProctoring'
import ExamIntro from './components/Exam/ExamIntro'
import ExamPaused from './components/Exam/ExamPaused'
import Exam from './components/Exam'
import Alerts from './components/Alerts'

function App() {
  const [examHasStarted , setExamHasStarted] = useState(false);
  
  const { fullScreen, tabFocus } = useProctoring({
    forceFullScreen: true,
    preventTabSwitch: true,
    preventContextMenu: true,
    preventUserSelection: true,
    preventCopy: true,
  })

  if (!examHasStarted) {
    return (
      <ExamIntro
        onClick={() => {
          fullScreen.trigger()
          setTimeout(() => {
            setExamHasStarted(true)
          }, 100)
        }}
      />
    )
  }


  const getContent = () => {
    if (fullScreen.status === 'off') return <ExamPaused />
    else if (tabFocus.status === false) return <ExamPaused />
    return <Exam />
  }

  return (
    <>
      <div className="test-container">{getContent()}</div>
      <Alerts fullScreen={fullScreen} tabFocus={tabFocus} />
    </>
  )
}

export default App
