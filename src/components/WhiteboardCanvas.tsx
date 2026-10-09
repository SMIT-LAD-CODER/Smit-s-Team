import React, { useRef, useState, useEffect } from 'react';

interface WhiteboardCanvasProps {
  initialText?: string;
}

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({ initialText = 'CANVAS' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTool, setCurrentTool] = useState<'pen' | 'box' | 'arrow' | 'select'>('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [strokeColor, setStrokeColor] = useState<string>('#10ffa0');

  const storageKey = `dsa_whiteboard_${initialText.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const savedImage = localStorage.getItem(storageKey);
    if (savedImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = savedImage;
    } else {
      // Background fill (Dark Mode Laboratory)
      ctx.fillStyle = '#0c0d0e';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Engineering grid dots
      ctx.fillStyle = '#22262d';
      for (let x = 16; x < rect.width; x += 24) {
        for (let y = 16; y < rect.height; y += 24) {
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Initial algorithmic schematic
      ctx.font = 'bold 12px "JetBrains Mono"';
      ctx.fillStyle = '#10ffa0';
      ctx.fillText(`// MENTAL SKETCH: ${initialText.toUpperCase()}`, 20, 30);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 44, 75, 40);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('nums[i]', 30, 68);

      ctx.beginPath();
      ctx.moveTo(95, 64);
      ctx.lineTo(155, 64);
      ctx.stroke();

      ctx.strokeRect(155, 44, 110, 40);
      ctx.fillText('target - x', 170, 68);
    }
  }, [initialText]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      localStorage.setItem(storageKey, dataUrl);
    } catch (e) {
      console.warn('Could not cache whiteboard canvas:', e);
    }
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'pen') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'pen') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) {
      setIsDrawing(false);
      return;
    }
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'box') {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(
        Math.min(startPos.x, coords.x),
        Math.min(startPos.y, coords.y),
        Math.abs(coords.x - startPos.x),
        Math.abs(coords.y - startPos.y)
      );
    } else if (currentTool === 'arrow') {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();

      const angle = Math.atan2(coords.y - startPos.y, coords.x - startPos.x);
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(coords.x - 10 * Math.cos(angle - Math.PI / 6), coords.y - 10 * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(coords.x - 10 * Math.cos(angle + Math.PI / 6), coords.y - 10 * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
    }

    setIsDrawing(false);
    setStartPos(null);
    saveCanvasState();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#0c0d0e';
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = '#22262d';
    for (let x = 16; x < rect.width; x += 24) {
      for (let y = 16; y < rect.height; y += 24) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
    localStorage.removeItem(storageKey);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Whiteboard Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-[var(--bg-surface-container)] border border-black dark:border-white text-[11px] font-['JetBrains_Mono']">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentTool('select')}
            className={`px-2 py-1 flex items-center gap-1 transition-all ${
              currentTool === 'select'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'bg-white dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">arrow_selector_tool</span>
            SELECT
          </button>
          <button
            onClick={() => setCurrentTool('pen')}
            className={`px-2 py-1 flex items-center gap-1 transition-all ${
              currentTool === 'pen'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'bg-white dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">draw</span>
            PENCIL
          </button>
          <button
            onClick={() => setCurrentTool('box')}
            className={`px-2 py-1 flex items-center gap-1 transition-all ${
              currentTool === 'box'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'bg-white dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">check_box_outline_blank</span>
            BOX
          </button>
          <button
            onClick={() => setCurrentTool('arrow')}
            className={`px-2 py-1 flex items-center gap-1 transition-all ${
              currentTool === 'arrow'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'bg-white dark:bg-neutral-900 text-black dark:text-white border border-black dark:border-white'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">trending_flat</span>
            LINK
          </button>
        </div>

        {/* Color picker pills */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setStrokeColor('#ffffff')}
            className={`w-5 h-5 rounded-none border-2 border-white bg-white ${
              strokeColor === '#ffffff' ? 'ring-2 ring-[#10ffa0]' : ''
            }`}
            title="White Chalk"
          />
          <button
            onClick={() => setStrokeColor('#10ffa0')}
            className={`w-5 h-5 rounded-none border-2 border-black bg-[#10ffa0] ${
              strokeColor === '#10ffa0' ? 'ring-2 ring-black dark:ring-white' : ''
            }`}
            title="Neon Hyper-Green"
          />
          <button
            onClick={() => setStrokeColor('#1d4ed8')}
            className={`w-5 h-5 rounded-none border-2 border-black bg-[#1d4ed8] ${
              strokeColor === '#1d4ed8' ? 'ring-2 ring-black dark:ring-white' : ''
            }`}
            title="Cobalt Blue"
          />
          <button
            onClick={() => setStrokeColor('#ba1a1a')}
            className={`w-5 h-5 rounded-none border-2 border-black bg-[#ba1a1a] ${
              strokeColor === '#ba1a1a' ? 'ring-2 ring-black dark:ring-white' : ''
            }`}
            title="Crimson"
          />
          <button
            onClick={clearCanvas}
            className="ml-2 px-2 py-1 bg-[#ffdad6] text-[#93000a] border border-black dark:border-white hover:bg-[#ba1a1a] hover:text-white uppercase font-bold text-[10px]"
          >
            CLEAR CANVAS
          </button>
        </div>
      </div>

      {/* Canvas viewport */}
      <div className="relative w-full h-44 sm:h-52 border-2 border-black dark:border-white bg-[var(--bg-surface)] overflow-hidden cursor-crosshair shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            if (isDrawing) {
              setIsDrawing(false);
              saveCanvasState();
            }
          }}
          className="w-full h-full block"
        />
        <div className="absolute bottom-1 right-2 pointer-events-none font-['JetBrains_Mono'] text-[9px] text-[var(--text-on-surface-variant)] uppercase tracking-wider">
          TACTILE FREEHAND // PERSISTED PER PROBLEM
        </div>
      </div>
    </div>
  );
};
