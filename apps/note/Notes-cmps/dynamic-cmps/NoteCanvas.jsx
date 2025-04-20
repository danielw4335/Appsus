import { utilService } from "../../../../services/util.service.js"

const { useRef, useEffect } = React

export function NoteCanvas({ info, onAddNote }) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPos = useRef(null)

  function onMouseDown(ev) {
    isDrawing.current = true
    lastPos.current = getEvPos(ev)
  }

  function onMouseMove(ev) {
    if (!isDrawing.current) return
    const pos = getEvPos(ev)

    const ctx = canvasRef.current.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPos.current = pos
  }

  function onMouseUp() {
    isDrawing.current = false
  }

  function getEvPos(ev) {
    return {
      x: ev.offsetX,
      y: ev.offsetY,
    }
  }

  function onSaveCanvas() {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL()
    const ctx = canvas.getContext("2d")

    const savedNote = {
      id: utilService.makeId(),
      type: "NoteImg",
      info: {
        url: dataUrl,
        title: "My Canvas",
      },
      style: { backgroundColor: "#fff" },
      isPinned: false,
    }

    onAddNote(savedNote)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = 300
    canvas.height = 300
    ctx.lineWidth = 2
    ctx.strokeStyle = "black"
    ctx.lineCap = "round"

    canvas.addEventListener("mousedown", onMouseDown)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("mouseleave", onMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("mouseleave", onMouseUp)
    }
  }, [])

  return (
    <section className="note-canvas">
      <canvas ref={canvasRef}></canvas>
      <button onClick={onSaveCanvas}>Save Canvas</button>
      {(info.txt || info.title) && <p>{info.txt || info.title}</p>}
    </section>
  )
}
