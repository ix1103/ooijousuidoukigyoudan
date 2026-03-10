"use client";

import React, { useEffect, useRef } from 'react';

// 波紋1つ分のデータ構造
interface Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    alpha: number;
}

export const WaterRippleEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripplesRef = useRef<Ripple[]>([]);
    const animationFrameId = useRef<number | undefined>(undefined);
    const lastMousePos = useRef<{ x: number; y: number } | null>(null);
    const lastTimeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            // 親要素（.absolute.inset-0等）にフィットするようリサイズ
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // マウスの軌跡から波紋を生成
        const handlePointerMove = (e: PointerEvent) => {
            const now = performance.now();

            // 生成頻度をコントロール（上品にするため間隔をあけ、数を減らす）
            if (now - lastTimeRef.current < 90) return;

            const x = e.clientX;
            const y = e.clientY;

            // マウスが動いた距離を計算し、速いほど大きな波紋にする
            let distance = 0;
            if (lastMousePos.current) {
                const dx = x - lastMousePos.current.x;
                const dy = y - lastMousePos.current.y;
                distance = Math.sqrt(dx * dx + dy * dy);
            }

            // サイズを大幅に大きくし、ゆったり広がるようにする
            const configMaxRadius = Math.min(450, 180 + distance * 3.5);

            ripplesRef.current.push({
                x,
                y,
                radius: 0,
                maxRadius: configMaxRadius,
                alpha: 0.25 // 強すぎない上品な透明度に抑える
            });

            lastMousePos.current = { x, y };
            lastTimeRef.current = now;
        };

        window.addEventListener('pointermove', handlePointerMove);

        // アニメーションループ
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const ripples = ripplesRef.current;

            for (let i = ripples.length - 1; i >= 0; i--) {
                const ripple = ripples[i];

                // 広がるスピード（少しゆっくりにして滑らかさを演出）
                ripple.radius += 1.2;

                // 透明度を徐々に下げる
                const progress = ripple.radius / ripple.maxRadius;
                // 後半にかけてゆっくり消えるように easing を少しかける
                const easeOutQuad = 1 - Math.pow(progress, 2);
                ripple.alpha = 0.25 * easeOutQuad;

                // 波紋の描画
                if (ripple.alpha > 0) {
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);

                    // グラデーションを広く取り、柔らかい光の輪を表現
                    const gradient = ctx.createRadialGradient(
                        ripple.x, ripple.y, ripple.radius * 0.4, // 中心寄りからグラデーション開始
                        ripple.x, ripple.y, ripple.radius
                    );
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                    gradient.addColorStop(0.9, `rgba(255, 255, 255, ${ripple.alpha})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    // 線は細く繊細に
                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = gradient;
                    ctx.stroke();
                }

                // 完全に消えたら配列から削除
                if (ripple.radius >= ripple.maxRadius || ripple.alpha <= 0) {
                    ripples.splice(i, 1);
                }
            }

            animationFrameId.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('pointermove', handlePointerMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};
