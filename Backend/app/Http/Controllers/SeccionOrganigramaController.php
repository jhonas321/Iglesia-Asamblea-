<?php

namespace App\Http\Controllers;

use App\Models\SeccionOrganigrama;
use Illuminate\Http\Request;

class SeccionOrganigramaController extends Controller
{
    public function index()
    {
        $secciones = SeccionOrganigrama::with(['ministerio', 'miembros'])
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($secciones);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ministerio_id' => 'nullable|exists:ministerios,id',
            'titulo' => 'required|string|max:150',
            'descripcion' => 'required|string',
            'tipo' => 'required|string|max:20',
            'activo' => 'nullable|boolean',
        ]);

        $seccion = SeccionOrganigrama::create([
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'tipo' => $request->tipo,
            'activo' => $request->activo ?? true,
        ]);

        $seccion->load(['ministerio', 'miembros']);

        return response()->json([
            'message' => 'Sección del organigrama creada correctamente.',
            'seccion' => $seccion,
        ], 201);
    }

    public function show($id)
    {
        $seccion = SeccionOrganigrama::with(['ministerio', 'miembros'])
            ->find($id);

        if (!$seccion) {
            return response()->json([
                'message' => 'Sección del organigrama no encontrada.'
            ], 404);
        }

        return response()->json($seccion);
    }

    public function update(Request $request, $id)
    {
        $seccion = SeccionOrganigrama::find($id);

        if (!$seccion) {
            return response()->json([
                'message' => 'Sección del organigrama no encontrada.'
            ], 404);
        }

        $request->validate([
            'ministerio_id' => 'nullable|exists:ministerios,id',
            'titulo' => 'required|string|max:150',
            'descripcion' => 'required|string',
            'tipo' => 'required|string|max:20',
            'activo' => 'nullable|boolean',
        ]);

        $seccion->update([
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'tipo' => $request->tipo,
            'activo' => $request->activo ?? $seccion->activo,
        ]);

        $seccion->load(['ministerio', 'miembros']);

        return response()->json([
            'message' => 'Sección del organigrama actualizada correctamente.',
            'seccion' => $seccion,
        ]);
    }

    public function destroy($id)
    {
        $seccion = SeccionOrganigrama::find($id);

        if (!$seccion) {
            return response()->json([
                'message' => 'Sección del organigrama no encontrada.'
            ], 404);
        }

        $seccion->delete();

        return response()->json([
            'message' => 'Sección del organigrama eliminada correctamente.'
        ]);
    }
}