<?php

namespace App\Http\Controllers;

use App\Models\HeroFoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'imagen' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'orden' => 'nullable|integer|min:1',
            'activo' => 'nullable|boolean',
        ]);

        if (HeroFoto::count() >= 8) {
            return response()->json([
                'message' => 'Solo se permiten máximo 8 fotos en el inicio.'
            ], 422);
        }

        $ultimoOrden = HeroFoto::max('orden') ?? 0;

        $rutaImagen = $request->file('imagen')->store(
            'hero',
            'public'
        );

        $foto = HeroFoto::create([
            'titulo' => $request->titulo,
            'imagen' => $rutaImagen,
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
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'orden' => 'nullable|integer|min:1',
            'activo' => 'nullable|boolean',
        ]);

        $datos = [
            'titulo' => $request->titulo,
            'orden' => $request->orden ?? $foto->orden,
            'activo' => $request->activo ?? $foto->activo,
        ];

        if ($request->hasFile('imagen')) {
            if ($foto->imagen) {
                Storage::disk('public')->delete($foto->imagen);
            }

            $datos['imagen'] = $request->file('imagen')->store(
                'hero',
                'public'
            );
        }

        $foto->update($datos);

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

        if (HeroFoto::count() <= 1) {
            return response()->json([
                'message' => 'Debe quedar al menos una foto en el inicio.'
            ], 422);
        }

        if ($foto->imagen) {
            Storage::disk('public')->delete($foto->imagen);
        }

        $foto->delete();

        return response()->json([
            'message' => 'Foto eliminada correctamente.'
        ]);
    }
}