import "./icons.css"

const Icons = {
    GitHub: () => <Icon title="GitHub" src="https://cdn.simpleicons.org/github/_/white" alt="GitHub" />,
    LinkedIn: () => <Icon title="LinkedIn" src="src/assets/linkedin.svg" alt="LinkedIn" />,
    LeetCode: () => <Icon title="LeetCode" src="https://cdn.simpleicons.org/leetcode/leetcode" alt="LeetCode" />,
    Email: () => <Icon title="Email" src="src/assets/email.svg" alt="Email" />,
    Curriculum: () => <Icon title="Curriculum" src="src/assets/curriculum.svg" alt="Curriculum" />,
    Go: () => <Icon title="Go" src="https://cdn.simpleicons.org/go" alt="Go" />,
    Python: () => <Icon title="Python" src="https://cdn.simpleicons.org/python" alt="Python" />,
    Typescript: () => <Icon title="Typescript" src="https://cdn.simpleicons.org/typescript" alt="Typescript" />,
    Javascript: () => <Icon title="Javascript" src="https://cdn.simpleicons.org/javascript" alt="Javascript" />,
    React: () => <Icon title="React" src="https://cdn.simpleicons.org/react" alt="React" />,
    Html5: () => <Icon title="HTML" src="https://cdn.simpleicons.org/html5" alt="Html5" />,
    Css: () => <Icon title="CSS" src="https://cdn.simpleicons.org/css" alt="Css" />,
    Postgresql: () => <Icon title="PostgreSQL" src="https://cdn.simpleicons.org/postgresql" alt="Postgresql" />,
    Docker: () => <Icon title="Docker" src="https://cdn.simpleicons.org/docker" alt="Docker" />,
    Git: () => <Icon title="Git" src="https://cdn.simpleicons.org/git" alt="Git" />,
    Htmx: () => <Icon title="HTMX" src="https://cdn.simpleicons.org/htmx" alt="Htmx" />,
    Tailwindcss: () => <Icon title="Tailwind" src="https://cdn.simpleicons.org/tailwindcss" alt="Tailwindcss" />,
    Linux: () => <Icon title="Linux" src="https://cdn.simpleicons.org/linux" alt="Linux" />,
    Redis: () => <Icon title="Redis" src="https://cdn.simpleicons.org/redis" alt="Redis" />,
    Django: () => <Icon title="Django" src="https://cdn.simpleicons.org/django/green" alt="Django" />,
    Ngrok: () => <Icon title="Ngrok" src="https://cdn.simpleicons.org/ngrok/_/white" alt="Ngrok" />,
    Vite: () => <Icon title="Vite" src="https://cdn.simpleicons.org/vite" alt="Vite" />,
};

function Icon({ title, src, alt }: { title?: string; src?: string; alt?: string }) {
    return (
        <div className="relative">
            <img className="peer hover:scale-110 transition-transform h-full" src={src} alt={alt} />
            <div className="hidden peer-hover:block absolute bottom-14 mb-1 left-1/2 transform -translate-x-1/2 bg-gopher px-2 py-1 rounded-lg shadow-lg text-white whitespace-nowrap">
                {title}
                <span className="absolute left-1/2 bottom-[-8px] -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gopher"></span>
            </div>
        </div>
    )
}

export default Icons;
