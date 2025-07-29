interface LinkProps {
    title: string;
    href: string;
    src: string;
    children?: React.ReactNode;
}

export default function Links() {
    return (
        <>
            <div className="justify-center flex gap-4">
                <Link title="GitHub" href="https://github.com/rodrigoaraujo46" src="https://cdn.simpleicons.org/github/_/white" />
                <Link title="LinkedIn" href="https://linkedin.com/in/rodrigoaraujo46" src="src/assets/linkedin.svg" />
                <Link title="LeetCode" href="https://leetcode.com/rodrigoaraujo46" src="https://cdn.simpleicons.org/leetcode/_/_" />
                <Link title="Email me" href="mailto:rodrigo46.dev@gmail.com" src="src/assets/email.svg" />
                <Link title="Curriculum" href="CurriculumVitaeEN.pdf" src="src/assets/curriculum.svg" />
            </div>
        </>
    );
}

function Link({ title, href, children, src }: LinkProps) {
    return (
        <a
            className="hover:scale-110 transition-transform w-[40px] h-[40px]"
            title={title}
            rel="noopener noreferrer"
            target="_blank"
            href={href}
        >
            {children}
            <img className="h-full" src={src} alt={title} />
        </a>
    );
}
