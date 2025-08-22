import { useEffect, useRef } from "react";

type GridSnakeProps = {
    cellSize?: number;
    speedCps?: number;
    length?: number;
    lineWidth?: number;
    headColor?: string;
    tailColor?: string;
    gridColor?: string;
}

export default function GridSnakeBackground({
    cellSize = 40,
    speedCps = 18,
    length = 30,
    lineWidth = 12,
    headColor = "rgba(0, 200, 255, 0.9)",
    gridColor = "rgba(255,255,255,0.06)",
    tailColor = "rgba(0, 200, 255, 0.25)",
}: GridSnakeProps) {
    const snakeCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => { // Canvas Resize & Grid Drawing
        const gridCanvas = gridCanvasRef.current;
        const snakeCanvas = snakeCanvasRef.current;
        if (!gridCanvas || !snakeCanvas) return;

        const gridCtx = gridCanvas.getContext("2d");
        if (!gridCtx) return;

        const drawGrid = () => {
            const w = gridCanvas.width
            const h = gridCanvas.height
            gridCtx.clearRect(0, 0, w, h);
            gridCtx.save();
            gridCtx.strokeStyle = gridColor;
            gridCtx.lineWidth = 1;

            for (let x = 0; x <= w; x += cellSize) {
                gridCtx.beginPath();
                gridCtx.moveTo(x, 0);
                gridCtx.lineTo(x, h);
                gridCtx.stroke();
            }

            for (let y = 0; y <= h; y += cellSize) {
                gridCtx.beginPath();
                gridCtx.moveTo(0, y);
                gridCtx.lineTo(w, y);
                gridCtx.stroke();
            }

            gridCtx.restore();
        };

        const resize = () => {
            const parent = gridCanvas.parentElement!;
            const rect = parent.getBoundingClientRect();
            snakeCanvas.width = gridCanvas.width = rect.width;
            snakeCanvas.height = gridCanvas.height = rect.height;

            drawGrid();
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [cellSize, gridColor]);

    const targetRef = useRef({ cx: 0, cy: 0 });
    useEffect(() => { // Mouse Tracking
        const snakeCanvas = snakeCanvasRef.current;
        if (!snakeCanvas) return;

        const toCell = (x: number, y: number) => ({
            cx: Math.floor(x / cellSize),
            cy: Math.floor(y / cellSize),
        });

        targetRef.current = toCell(snakeCanvas.width / 2, snakeCanvas.height / 2);

        const onMove = (e: MouseEvent) => {
            const rect = snakeCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            targetRef.current = toCell(x, y);
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [cellSize]);

    const bodyRef = useRef<Array<{ cx: number; cy: number }>>([]);
    useEffect(() => { // Snake State & Movement
        const snakeCanvas = snakeCanvasRef.current;
        if (!snakeCanvas) return;

        const start = {
            cx: Math.floor(snakeCanvas.width / 2 / cellSize),
            cy: Math.floor(snakeCanvas.height / 2 / cellSize)
        };
        bodyRef.current = Array.from({ length }, (_, i) => ({
            cx: start.cx - i,
            cy: start.cy,
        }));
    }, [cellSize, length]);

    useEffect(() => { // Animation Loop
        const snakeCanvas = snakeCanvasRef.current;
        if (!snakeCanvas) return;

        const snakeCtx = snakeCanvas.getContext("2d");
        if (!snakeCtx) return;

        const stepInterval = 1 / speedCps;
        let acc = 0;
        let lastTs = performance.now();
        let rafId = 0;
        let prioritizeX = true;
        let lastSwitch = performance.now();
        const switchInterval = 700;

        const draw = () => {
            snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
            if (!window.matchMedia("(pointer:fine)").matches) return;

            const drawn = new Set<string>();
            bodyRef.current.forEach((seg, i) => {
                const key = `${seg.cx},${seg.cy}`;
                if (drawn.has(key)) return;

                const isHead = i === 0;
                const c = isHead ? headColor : tailColor;
                const x = seg.cx * cellSize + cellSize / 2;
                const y = seg.cy * cellSize + cellSize / 2;

                snakeCtx.save();
                snakeCtx.beginPath();
                snakeCtx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
                snakeCtx.fillStyle = c;
                snakeCtx.shadowColor = c;
                snakeCtx.shadowBlur = isHead ? 18 : 6;
                snakeCtx.fill();
                snakeCtx.restore();

                drawn.add(key);
            });
        };

        const advanceOneCell = () => {
            const head = bodyRef.current[0];
            const maxCx = Math.floor((snakeCanvas.width - 1) / cellSize);
            const maxCy = Math.floor((snakeCanvas.height - 1) / cellSize);

            if (performance.now() - lastSwitch > switchInterval) {
                prioritizeX = !prioritizeX;
                lastSwitch = performance.now();
            }

            const willCollide = (x: number, y: number) =>
                bodyRef.current.some(seg => seg.cx === x && seg.cy === y);
            const dirs: [number, number][] = prioritizeX
                ? [[1, 0], [-1, 0], [0, 1], [0, -1]]
                : [[0, 1], [0, -1], [1, 0], [-1, 0]];

            const queue: { x: number; y: number; path: [number, number][] }[] = [
                { x: head.cx, y: head.cy, path: [] }
            ];

            const visited = new Set<string>([`${head.cx},${head.cy}`]);
            let nextMove: [number, number] | null = null;

            while (queue.length && !nextMove) {
                const { x, y, path } = queue.shift()!;
                for (const [dx, dy] of dirs) {
                    let nx = x + dx;
                    let ny = y + dy;
                    const key = `${nx},${ny}`;
                    if (!willCollide(nx, ny) && !visited.has(key)) {
                        nx = Math.max(0, Math.min(nx, maxCx));
                        ny = Math.max(0, Math.min(ny, maxCy));
                        visited.add(key);

                        const newPath: [number, number][] = [...path, [nx, ny]];
                        if (nx === targetRef.current.cx && ny === targetRef.current.cy) {
                            nextMove = newPath[0];
                            break;
                        }

                        queue.push({ x: nx, y: ny, path: newPath });
                    }
                }
            }

            const nx = nextMove ? nextMove[0] : head.cx;
            const ny = nextMove ? nextMove[1] : head.cy;

            bodyRef.current.unshift({ cx: nx, cy: ny });
            while (bodyRef.current.length > length) bodyRef.current.pop();
        };

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
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [cellSize, speedCps, length, lineWidth, headColor, tailColor]);

    return (
        <>
            <canvas
                ref={gridCanvasRef}
                aria-hidden
                className="absolute w-full h-full inset-0 pointer-events-none -z-1"
            />
            <canvas
                ref={snakeCanvasRef}
                aria-hidden
                className="absolute w-full h-full inset-0 pointer-events-none -z-1"
            />
        </>
    );
}
