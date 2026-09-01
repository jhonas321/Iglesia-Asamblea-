<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    public function index()
    {
        $eventos = Evento::with('ministerio')
            ->orderBy('fecha_inicio', 'asc')
            ->get();

        return response()->json($eventos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ministerio_id' => 'required|exists:ministerios,id',
            'titulo' => 'required|string|max:200',
            'fecha_inicio' => 'required|date',
            'fecha_final' => 'required|date|after_or_equal:fecha_inicio',
            'hora' => 'required',
            'lugar' => 'required|string|max:200',
            'whatsapp_numero' => 'nullable|string|max:30',
            'descripcion' => 'required|string',
            'detalles' => 'nullable|string',
            'imagen' => 'nullable|string|max:1000',
            'activo' => 'nullable|boolean',
        ]);

        $evento = Evento::create([
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_final' => $request->fecha_final,
            'hora' => $request->hora,
            'lugar' => $request->lugar,
            'whatsapp_numero' => $request->whatsapp_numero,
            'descripcion' => $request->descripcion,
            'detalles' => $request->detalles,
            'imagen' => $request->imagen,
            'activo' => $request->activo ?? true,
        ]);

        $evento->load('ministerio');

        return response()->json([
            'message' => 'Evento creado correctamente.',
            'evento' => $evento,
        ], 201);
    }

    public function show($id)
    {
        $evento = Evento::with('ministerio')->find($id);

        if (!$evento) {
            return response()->json([
                'message' => 'Evento no encontrado.'
            ], 404);
        }

        return response()->json($evento);
    }

    public function update(Request $request, $id)
    {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json([
                'message' => 'Evento no encontrado.'
            ], 404);
        }

        $request->validate([
            'ministerio_id' => 'required|exists:ministerios,id',
            'titulo' => 'required|string|max:200',
            'fecha_inicio' => 'required|date',
            'fecha_final' => 'required|date|after_or_equal:fecha_inicio',
            'hora' => 'required',
            'lugar' => 'required|string|max:200',
            'whatsapp_numero' => 'nullable|string|max:30',
            'descripcion' => 'required|string',
            'detalles' => 'nullable|string',
            'imagen' => 'nullable|string|max:1000',
            'activo' => 'nullable|boolean',
        ]);

        $evento->update([
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_final' => $request->fecha_final,
            'hora' => $request->hora,
            'lugar' => $request->lugar,
            'whatsapp_numero' => $request->whatsapp_numero,
            'descripcion' => $request->descripcion,
            'detalles' => $request->detalles,
            'imagen' => $request->imagen,
            'activo' => $request->activo ?? $evento->activo,
        ]);

        $evento->load('ministerio');

        return response()->json([
            'message' => 'Evento actualizado correctamente.',
            'evento' => $evento,
        ]);
    }

    public function destroy($id)
    {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json([
                'message' => 'Evento no encontrado.'
            ], 404);
        }

        $evento->delete();

        return response()->json([
            'message' => 'Evento eliminado correctamente.'
        ]);
    }
}