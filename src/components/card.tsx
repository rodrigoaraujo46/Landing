import { type ReactNode, useEffect, useRef, useState } from "react";
import { ShineBorder } from "./magicui/shine-border";


export default function Card({ children }: { children?: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            setShow(e.isIntersecting);
        });
        if (ref.current) {
            obs.observe(ref.current);
        }
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className={`flex flex-col h-full shadow-2xs shadow-black border backdrop-blur-xs relative rounded-xl p-5 transition-all duration-1000 ${show ? 'opacity-100' : 'opacity-0 translate-y-20'}`} >
            <ShineBorder shineColor="var(--color-gopher)" duration={20} />
            {children}
        </div>
    );
}

export function CardTitle({ children }: { children?: ReactNode }) {
    return (
        <h2 className="text-start font-bold text-xl">
            {children}
        </h2>
    )
}

export function CardText({ children }: { children?: ReactNode }) {
    return (
        <p className="whitespace-pre-line break-words text-md w-fit mt-5 text-start">
            {children}
        </p>
    )
}
