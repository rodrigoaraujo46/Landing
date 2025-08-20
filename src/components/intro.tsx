import Links from "./links"
import SkillCloud from "./cloud"

export default function Intro() {
    return (
        <div className="flex flex-wrap justify-center-safe items-center gap-24">
            <img className="rounded-xl max-w-full" id="photo" src="https://placehold.co/384x480" alt="My Photo" />
            <Bio />
        </div>
    )
}

function Bio() {
    return (
        <div className="font-roboto flex flex-col gap-2">
            <h2 className="text-2xl"> 👋🏻 I'm Rodrigo Araújo </h2>
            <h1 className="text-7xl font-bold"> <span className="text-gopher"> Full-Stack </span> Developer </h1>
            <div className="w-full flex-wrap flex flex-row mt-10 gap-16 items-start justify-center-safe">
                <div className="flex flex-col gap-8 mt-5">
                    <p className="text-2xl whitespace-nowrap">
                        Building <span className="text-gopher"> Fast </span> and <span className="text-gopher"> Reliable </span> apps
                    </p>
                    <Links />
                </div>
                <div>
                    <SkillCloud />
                </div>
            </div>
        </div>
    )
}
