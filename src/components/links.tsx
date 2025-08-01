import Icons from "./icons";

export default function Links() {
    return (
        <>
            <div className="justify-center flex gap-4">
                <Link title="GitHub" href="https://github.com/rodrigoaraujo46">
                    <Icons.GitHub />
                </Link>
                <Link title="LinkedIn" href="https://linkedin.com/in/rodrigoaraujo46">
                    <Icons.LinkedIn />
                </Link>
                <Link title="LeetCode" href="https://leetcode.com/rodrigoaraujo46">
                    <Icons.LeetCode />
                </Link>
                <Link title="Email me" href="mailto:rodrigo46.dev@gmail.com">
                    <Icons.Email />
                </Link>
                <Link title="Curriculum" href="CurriculumVitaeEN.pdf">
                    <Icons.Curriculum />
                </Link>
            </div>
        </>
    );
}

interface LinkProps {
    title?: string;
    href?: string;
    children?: React.ReactNode;
}

function Link({ title, href, children }: LinkProps) {
    return (
        <a className="w-[40px] h-[40px]"
            title={title}
            rel="noopener noreferrer"
            target="_blank"
            href={href}
        >
            {children}
        </a>
    );
}
