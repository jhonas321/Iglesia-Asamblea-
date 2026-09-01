<?php

namespace App\Http\Controllers;

use App\Models\HeroFoto;
use Illuminate\Http\Request;

class HeroFotoController extends Controller
{
    public function index()
    {
        $fotos = HeroFoto::orderBy('orden', 'asc')->get();

        return response()->json($fotos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:150',
            'imagen' => 'required|string|max:1000',
            'orden' => 'nullable|integer|min:1',
            'activo' => 'nullable|boolean',
        ]);

        if (HeroFoto::count() >= 8) {
            return response()->json([
                'message' => 'Solo se permiten máximo 8 fotos en el inicio.'
            ], 422);
        }

        $ultimoOrden = HeroFoto::max('orden') ?? 0;

        $foto = HeroFoto::create([
            'titulo' => $request->titulo,
            'imagen' => $request->imagen,
            'orden' => $request->orden ?? ($ultimoOrden + 1),
            'activo' => $request->activo ?? true,
        ]);

        return response()->json([
            'message' => 'Foto agregada correctamente.',
            'foto' => $foto,
        ], 201);
    }

    public function show($id)
    {
        $foto = HeroFoto::find($id);

        if (!$foto) {
            return response()->json([
                'message' => 'Foto no encontrada.'
            ], 404);
        }

        return response()->json($foto);
    }

    public function update(Request $request, $id)
    {
        $foto = HeroFoto::find($id);

        if (!$foto) {
            return response()->json([
                'message' => 'Foto no encontrada.'
            ], 404);
        }

        $request->validate([
            'titulo' => 'required|string|max:150',
            'imagen' => 'required|string|max:1000',
            'orden' => 'nullable|integer|min:1',
            'activo' => 'nullable|boolean',
        ]);

        $foto->update([
            'titulo' => $request->titulo,
            'imagen' => $request->imagen,
            'orden' => $request->orden ?? $foto->orden,
            'activo' => $request->activo ?? $foto->activo,
        ]);

        return response()->json([
            'message' => 'Foto actualizada correctamente.',
            'foto' => $foto,
        ]);
    }

    public function destroy($id)
    {
        $foto = HeroFoto::find($id);

        if (!$foto) {
            return response()->json([
                'message' => 'Foto no encontrada.'
            ], 404);
        }

        $foto->delete();

        return response()->json([
            'message' => 'Foto eliminada correctamente.'
        ]);
    }
}