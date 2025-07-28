export default function Links() {
    return (
        <div id="links" className="justify-center flex gap-4" >
            <a title="GitHub" rel="noopener noreferrer" target="_blank"
                href="https://github.com/rodrigoaraujo46">
                <img src="src/assets/github.svg" alt="" />
            </a>
            <a title="LinkedIn" rel="noopener noreferrer" target="_blank"
                href="https://linkedin.com/in/rodrigoaraujo46">
                <img src="src/assets/linkedin.svg" alt="" />
            </a>
            <a title="LeetCode" target="_blank" rel="noopener noreferrer"
                href="https://leetcode.com/rodrigoaraujo46">
                <img className="h-full" src="src/assets/leetcode.svg" alt="" />
            </a>
            <a title="Email me" target="_blank" rel="noopener noreferrer" aria-label="Email link"
                href="mailto:rodrigo46.dev@gmail.com">
                <img src="src/assets/email.svg" alt="" />
            </a>
            <a title="Curriculum" target="_blank" rel="noopener noreferrer"
                aria-label="My Curriculum" href="CurriculumVitaeEN.pdf">
                <img className="h-full" src="src/assets/curriculum.svg" alt="" />
            </a>
        </div>
    )
}
