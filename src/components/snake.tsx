import { useEffect, useRef } from "react";

export default function GridSnakeBackground({
    cellSize = 40,
    speedCps = 22,
    length = 30,
    lineWidth = 12,
    color = "rgba(0, 200, 255, 0.9)",
    tailColor = "rgba(0, 200, 255, 0.25)",
    showGrid = true,
}: {
    cellSize?: number;
    speedCps?: number;
    length?: number;
    lineWidth?: number;
    color?: string;
    tailColor?: string;
    showGrid?: boolean;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const hasMouse = window.matchMedia("(pointer:fine)").matches;

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let W = 0, H = 0, dpr = 1;

        const resize = () => {
            dpr = Math.min(2, window.devicePixelRatio || 1);

            const parent = canvas.parentElement!;
            const rect = parent.getBoundingClientRect();
            W = Math.round(rect.width);
            H = Math.round(rect.height);

            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;

            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        const toCell = (x: number, y: number) => ({
            cx: Math.floor(x / cellSize),
            cy: Math.floor(y / cellSize),
        });

        let target = toCell(W / 2, H / 2);
        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            target = toCell(x, y);
        };
        window.addEventListener("mousemove", onMove);

        const start = toCell(W / 2, H / 2);
        const body: Array<{ cx: number; cy: number }> = Array.from({ length }, (_, i) => ({
            cx: start.cx - i,
            cy: start.cy,
        }));

        const stepInterval = 1 / speedCps;
        let acc = 0;
        let lastTs = performance.now();

        const drawGrid = () => {
            ctx.save();
            ctx.strokeStyle = "rgba(255,255,255,0.06)";
            ctx.lineWidth = 1;
            for (let x = 0; x <= W; x += cellSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 0; y <= H; y += cellSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
            ctx.restore();
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            if (showGrid) drawGrid();
            if (!hasMouse) return;

            const drawn: Set<string> = new Set();

            for (let i = 0; i < body.length; i++) {
                const seg = body[i];
                const key = `${seg.cx},${seg.cy}`;
                if (drawn.has(key)) continue; // skip if already drawn

                const isHead = i === 0;
                const c = isHead ? color : tailColor;
                const x = seg.cx * cellSize + cellSize / 2;
                const y = seg.cy * cellSize + cellSize / 2;

                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
                ctx.fillStyle = c;
                ctx.shadowColor = c;
                ctx.shadowBlur = isHead ? 18 : 6;
                ctx.fill();
                ctx.restore();

                drawn.add(key);
            }
        };

        type Cell = { x: number; y: number; path: [number, number][] };

        let prioritizeX = true;
        let lastSwitch = performance.now();
        const switchInterval = 700;

        const advanceOneCell = () => {
            const now = performance.now();
            if (now - lastSwitch > switchInterval) {
                prioritizeX = !prioritizeX;
                lastSwitch = now;
            }

            const head = body[0];
            const maxCx = Math.floor((W - 1) / cellSize);
            const maxCy = Math.floor((H - 1) / cellSize);

            const willCollide = (x: number, y: number) =>
                body.some(seg => seg.cx === x && seg.cy === y);

            const dirs: [number, number][] = prioritizeX
                ? [[1, 0], [-1, 0], [0, 1], [0, -1]]
                : [[0, 1], [0, -1], [1, 0], [-1, 0]];

            const queue: Cell[] = [{ x: head.cx, y: head.cy, path: [] }];
            const visited = new Set<string>();
            visited.add(`${head.cx},${head.cy}`);

            let nextMove: [number, number] | null = null;

            while (queue.length && !nextMove) {
                const { x, y, path } = queue.shift()!;
                for (const [dx, dy] of dirs) {
                    const nx = x + dx;
                    const ny = y + dy;
                    const key = `${nx},${ny}`;

                    if (
                        nx >= 0 && nx <= maxCx &&
                        ny >= 0 && ny <= maxCy &&
                        !willCollide(nx, ny) &&
                        !visited.has(key)
                    ) {
                        visited.add(key);
                        const newPath: [number, number][] = [...path, [nx, ny] as [number, number]];

                        if (nx === target.cx && ny === target.cy) {
                            nextMove = newPath[0];
                            break;
                        }

                        queue.push({ x: nx, y: ny, path: newPath });
                    }
                }
            }

            const nx = nextMove ? nextMove[0] : head.cx;
            const ny = nextMove ? nextMove[1] : head.cy;

            body.unshift({ cx: nx, cy: ny });
            while (body.length > length) body.pop();
        };

        let rafId = 0;

        const loop = (ts: number) => {
            const dt = (ts - lastTs) / 1000;
            lastTs = ts;
            acc += dt;

            while (acc >= stepInterval) {
                advanceOneCell();
                acc -= stepInterval;
            }

            draw();
            rafId = requestAnimationFrame(loop);
        };

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduced) rafId = requestAnimationFrame(loop);

        const onVisibility = () => {
            if (document.hidden) cancelAnimationFrame(rafId);
            else {
                lastTs = performance.now();
                rafId = requestAnimationFrame(loop);
            }
        };
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [hasMouse, cellSize, speedCps, length, lineWidth, color, tailColor, showGrid]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0, pointer-events-none, -z-1"
        />
    );
}
