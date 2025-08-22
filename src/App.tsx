import './App.css'
import Career from './components/career'

import Intro from './components/intro'
import Skills from './components/skills'
import GridSnakeBackground from "./components/GridSnakeBackground"

export default function App() {
    return (
        <div className='relative'>
            <GridSnakeBackground />
            <main>
                <section className='pt-[10dvh]'>
                    <Intro />
                </section>
                <hr />
                <section>
                    <Skills />
                </section>
                <hr />
                <section>
                    <Career />
                </section>
                <hr />
                <section>
                    {/* <Projects /> */}
                </section>
                {/*
                <section>
                    <Contact />
                </section>
                */}
            </main>
        </div>
    )
}
