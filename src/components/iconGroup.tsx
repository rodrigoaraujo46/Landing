import type { ReactNode } from "react";

export default function IconGroup({ children }: { children?: ReactNode[] }) {
    return (
        <div className="flex h-full flex-row gap-2">
            {children}
        </div>
    )
}
