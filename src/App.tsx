import './App.css'

import Intro from './components/intro'
import Skills from './components/skills'

export default function App() {
    return (
        <main>
            <section>
                <Intro />
            </section>
            <section>
                <Skills />
            </section>
        </main>
    )
}
