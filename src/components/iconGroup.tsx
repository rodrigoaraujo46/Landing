import type { ReactNode } from "react";

export default function IconGroup({ children }: { children?: ReactNode[] }) {
    return (
        <div className="flex flex-row flex-wrap h-full gap-2">
            {children}
        </div>
    )
}
