<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use Illuminate\Http\Request;

class HorarioController extends Controller
{
    public function index()
    {
        $horarios = Horario::orderBy('id', 'asc')->get();

        return response()->json($horarios);
    }

    public function store(Request $request)
    {
        $request->validate([
            'dia' => 'required|string|max:20',
            'actividad' => 'required|string|max:150',
            'hora' => 'required',
            'icono_tipo' => 'required|string|max:50',
            'descripcion' => 'required|string',
            'activo' => 'nullable|boolean',
        ]);

        $horario = Horario::create([
            'dia' => $request->dia,
            'actividad' => $request->actividad,
            'hora' => $request->hora,
            'icono_tipo' => $request->icono_tipo,
            'descripcion' => $request->descripcion,
            'activo' => $request->activo ?? true,
        ]);

        return response()->json([
            'message' => 'Horario creado correctamente.',
            'horario' => $horario,
        ], 201);
    }

    public function show($id)
    {
        $horario = Horario::find($id);

        if (!$horario) {
            return response()->json([
                'message' => 'Horario no encontrado.'
            ], 404);
        }

        return response()->json($horario);
    }

    public function update(Request $request, $id)
    {
        $horario = Horario::find($id);

        if (!$horario) {
            return response()->json([
                'message' => 'Horario no encontrado.'
            ], 404);
        }

        $request->validate([
            'dia' => 'required|string|max:20',
            'actividad' => 'required|string|max:150',
            'hora' => 'required',
            'icono_tipo' => 'required|string|max:50',
            'descripcion' => 'required|string',
            'activo' => 'nullable|boolean',
        ]);

        $horario->update([
            'dia' => $request->dia,
            'actividad' => $request->actividad,
            'hora' => $request->hora,
            'icono_tipo' => $request->icono_tipo,
            'descripcion' => $request->descripcion,
            'activo' => $request->activo ?? $horario->activo,
        ]);

        return response()->json([
            'message' => 'Horario actualizado correctamente.',
            'horario' => $horario,
        ]);
    }

    public function destroy($id)
    {
        $horario = Horario::find($id);

        if (!$horario) {
            return response()->json([
                'message' => 'Horario no encontrado.'
            ], 404);
        }

        $horario->delete();

        return response()->json([
            'message' => 'Horario eliminado correctamente.'
        ]);
    }
}