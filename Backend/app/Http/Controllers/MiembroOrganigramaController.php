<?php

namespace App\Http\Controllers;

use App\Models\MiembroOrganigrama;
use Illuminate\Http\Request;

class MiembroOrganigramaController extends Controller
{
    public function index()
    {
        $miembros = MiembroOrganigrama::with('seccion')
            ->orderBy('orden', 'asc')
            ->get();

        return response()->json($miembros);
    }

    public function store(Request $request)
    {
        $request->validate([
            'seccion_organigrama_id' => 'required|exists:secciones_organigrama,id',
            'nombre' => 'required|string|max:150',
            'cargo' => 'required|string|max:150',
            'genero' => 'required|string|max:20',
            'orden' => 'nullable|integer|min:1',
            'activo' => 'nullable|boolean',
        ]);

        $miembro = MiembroOrganigrama::create([
            'seccion_organigrama_id' => $request->seccion_organigrama_id,
            'nombre' => $request->nombre,
            'cargo' => $request->cargo,
            'genero' => $request->genero,
            'orden' => $request->orden ?? 1,
            'activo' => $request->activo ?? true,
        ]);

        return response()->json([
            'message' => 'Miembro creado correctamente.',
            'miembro' => $miembro,
        ], 201);
    }

    public function show($id)
    {
        $miembro = MiembroOrganigrama::with('seccion')->find($id);

        if (!$miembro) {
            return response()->json([
                'message' => 'Miembro no encontrado.'
            ], 404);
        }

        return response()->json($miembro);
    }

    public function update(Request $request, $id)
    {
        $miembro = MiembroOrganigrama::find($id);

        if (!$miembro) {
            return response()->json([
                'message' => 'Miembro no encontrado.'
            ], 404);
        }

        $request->validate([
            'seccion_organigrama_id' => 'required|exists:secciones_organigrama,id',
            'nombre' => 'required|string|max:150',
            'cargo' => 'required|string|max:150',
            'genero' => 'required|string|max:20',
            'orden' => 'nullable|integer|min:1',
            'activo' => 'nullable|boolean',
        ]);

        $miembro->update([
            'seccion_organigrama_id' => $request->seccion_organigrama_id,
            'nombre' => $request->nombre,
            'cargo' => $request->cargo,
            'genero' => $request->genero,
            'orden' => $request->orden ?? $miembro->orden,
            'activo' => $request->activo ?? $miembro->activo,
        ]);

        return response()->json([
            'message' => 'Miembro actualizado correctamente.',
            'miembro' => $miembro,
        ]);
    }

    public function destroy($id)
    {
        $miembro = MiembroOrganigrama::find($id);

        if (!$miembro) {
            return response()->json([
                'message' => 'Miembro no encontrado.'
            ], 404);
        }

        $miembro->delete();

        return response()->json([
            'message' => 'Miembro eliminado correctamente.'
        ]);
    }
}