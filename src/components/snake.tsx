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
            W = window.innerWidth; H = document.documentElement.scrollHeight;
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
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
            if (!hasMouse) {
                return
            }

            for (let i = body.length - 1; i >= 0; i--) {
                const seg = body[i];
                const c = i === 0 ? color : tailColor;
                const x = seg.cx * cellSize + cellSize / 2;
                const y = seg.cy * cellSize + cellSize / 2;

                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
                ctx.fillStyle = c;
                ctx.shadowColor = c;
                ctx.shadowBlur = i === 0 ? 18 : 6;
                ctx.fill();
                ctx.restore();
            }
        };

        let prioritizeX = true;
        let lastSwitch = performance.now();
        const switchInterval = 800;

        const advanceOneCell = () => {
            const now = performance.now();
            if (now - lastSwitch > switchInterval) {
                prioritizeX = !prioritizeX;
                lastSwitch = now;
            }

            const head = body[0];
            const dx = target.cx - head.cx;
            const dy = target.cy - head.cy;

            const maxCx = Math.floor((W - 1) / cellSize);
            const maxCy = Math.floor((H - 1) / cellSize);

            const willCollide = (x: number, y: number) =>
                body.some(seg => seg.cx === x && seg.cy === y);

            let nx = head.cx;
            let ny = head.cy;

            if (dx !== 0 || dy !== 0) {
                const moves: Array<[number, number]> = [];

                if (prioritizeX) {
                    if (dx !== 0) moves.push([nx + Math.sign(dx), ny]);
                    if (dy !== 0) moves.push([nx, ny + Math.sign(dy)]);
                } else {
                    if (dy !== 0) moves.push([nx, ny + Math.sign(dy)]);
                    if (dx !== 0) moves.push([nx + Math.sign(dx), ny]);
                }

                if (dx !== 0) moves.push([nx - Math.sign(dx), ny]);
                if (dy !== 0) moves.push([nx, ny - Math.sign(dy)]);

                for (const [mx, my] of moves) {
                    const cx = clamp(mx, 0, maxCx);
                    const cy = clamp(my, 0, maxCy);
                    if (!willCollide(cx, cy)) {
                        nx = cx;
                        ny = cy;
                        break;
                    }
                }

                body.unshift({ cx: nx, cy: ny });
                while (body.length > length) body.pop();
            } else {
                if (body.length > 1) body.pop(); // collapse tail if mouse still
            }
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
