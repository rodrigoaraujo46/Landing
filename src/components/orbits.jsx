import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

export default function Orbits() {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden pointer-events-none">
            <OrbitingCircles iconSize={50} radius={120} speed={0.8}>
                <img src="src/assets/tailwind.svg" alt="" />
                <img src="src/assets/react.svg" alt="" />
                <img src="src/assets/typescript.svg" alt="" />
            </OrbitingCircles>
            <OrbitingCircles iconSize={50} radius={60} reverse speed={0.5}>
                <img src="src/assets/gopher.svg" alt="" />
                <img src="src/assets/postgres.svg" alt="" />
                <img src="src/assets/python.svg" alt="" />
            </OrbitingCircles>
        </div>
    );
}

