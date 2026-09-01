<?php

namespace App\Http\Controllers;

use App\Models\Ministerio;
use Illuminate\Http\Request;

class MinisterioController extends Controller
{
    public function index()
    {
        $ministerios = Ministerio::orderBy('id', 'asc')->get();

        return response()->json($ministerios);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:150|unique:ministerios,nombre',
            'descripcion' => 'required|string',
            'activo' => 'nullable|boolean',
        ]);

        $ministerio = Ministerio::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'activo' => $request->activo ?? true,
        ]);

        return response()->json([
            'message' => 'Ministerio creado correctamente.',
            'ministerio' => $ministerio,
        ], 201);
    }

    public function show($id)
    {
        $ministerio = Ministerio::find($id);

        if (!$ministerio) {
            return response()->json([
                'message' => 'Ministerio no encontrado.'
            ], 404);
        }

        return response()->json($ministerio);
    }

    public function update(Request $request, $id)
    {
        $ministerio = Ministerio::find($id);

        if (!$ministerio) {
            return response()->json([
                'message' => 'Ministerio no encontrado.'
            ], 404);
        }

        $request->validate([
            'nombre' => 'required|string|max:150|unique:ministerios,nombre,' . $id,
            'descripcion' => 'required|string',
            'activo' => 'nullable|boolean',
        ]);

        $ministerio->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'activo' => $request->activo ?? $ministerio->activo,
        ]);

        return response()->json([
            'message' => 'Ministerio actualizado correctamente.',
            'ministerio' => $ministerio,
        ]);
    }

    public function destroy($id)
    {
        $ministerio = Ministerio::find($id);

        if (!$ministerio) {
            return response()->json([
                'message' => 'Ministerio no encontrado.'
            ], 404);
        }

        $ministerio->delete();

        return response()->json([
            'message' => 'Ministerio eliminado correctamente.'
        ]);
    }
}