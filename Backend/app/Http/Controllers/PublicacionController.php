<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use App\Models\PublicacionFoto;
use Illuminate\Http\Request;

class PublicacionController extends Controller
{
    public function index()
    {
        $publicaciones = Publicacion::with(['ministerio', 'fotos'])
            ->orderBy('fecha_inicio', 'desc')
            ->get();

        return response()->json($publicaciones);
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
            'descripcion' => 'required|string',
            'imagen' => 'nullable|string|max:1000',
            'video_trailer_url' => 'nullable|string|max:1000',
            'video_trailer_portada' => 'nullable|string|max:1000',
            'video_completo_url' => 'nullable|string|max:1500',
            'activo' => 'nullable|boolean',
            'fotos' => 'nullable|array',
            'fotos.*' => 'nullable|string|max:1000',
        ]);

        $publicacion = Publicacion::create([
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_final' => $request->fecha_final,
            'hora' => $request->hora,
            'lugar' => $request->lugar,
            'descripcion' => $request->descripcion,
            'imagen' => $request->imagen,
            'video_trailer_url' => $request->video_trailer_url,
            'video_trailer_portada' => $request->video_trailer_portada,
            'video_completo_url' => $request->video_completo_url,
            'activo' => $request->activo ?? true,
        ]);

        if ($request->has('fotos')) {
            foreach ($request->fotos as $index => $foto) {
                PublicacionFoto::create([
                    'publicacion_id' => $publicacion->id,
                    'imagen' => $foto,
                    'orden' => $index + 1,
                ]);
            }
        }

        $publicacion->load(['ministerio', 'fotos']);

        return response()->json([
            'message' => 'Publicación creada correctamente.',
            'publicacion' => $publicacion,
        ], 201);
    }

    public function show($id)
    {
        $publicacion = Publicacion::with(['ministerio', 'fotos'])
            ->find($id);

        if (!$publicacion) {
            return response()->json([
                'message' => 'Publicación no encontrada.'
            ], 404);
        }

        return response()->json($publicacion);
    }

    public function update(Request $request, $id)
    {
        $publicacion = Publicacion::find($id);

        if (!$publicacion) {
            return response()->json([
                'message' => 'Publicación no encontrada.'
            ], 404);
        }

        $request->validate([
            'ministerio_id' => 'required|exists:ministerios,id',
            'titulo' => 'required|string|max:200',
            'fecha_inicio' => 'required|date',
            'fecha_final' => 'required|date|after_or_equal:fecha_inicio',
            'hora' => 'required',
            'lugar' => 'required|string|max:200',
            'descripcion' => 'required|string',
            'imagen' => 'nullable|string|max:1000',
            'video_trailer_url' => 'nullable|string|max:1000',
            'video_trailer_portada' => 'nullable|string|max:1000',
            'video_completo_url' => 'nullable|string|max:1500',
            'activo' => 'nullable|boolean',
            'fotos' => 'nullable|array',
            'fotos.*' => 'nullable|string|max:1000',
        ]);

        $publicacion->update([
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_final' => $request->fecha_final,
            'hora' => $request->hora,
            'lugar' => $request->lugar,
            'descripcion' => $request->descripcion,
            'imagen' => $request->imagen,
            'video_trailer_url' => $request->video_trailer_url,
            'video_trailer_portada' => $request->video_trailer_portada,
            'video_completo_url' => $request->video_completo_url,
            'activo' => $request->activo ?? $publicacion->activo,
        ]);

        if ($request->has('fotos')) {
            $publicacion->fotos()->delete();

            foreach ($request->fotos as $index => $foto) {
                PublicacionFoto::create([
                    'publicacion_id' => $publicacion->id,
                    'imagen' => $foto,
                    'orden' => $index + 1,
                ]);
            }
        }

        $publicacion->load(['ministerio', 'fotos']);

        return response()->json([
            'message' => 'Publicación actualizada correctamente.',
            'publicacion' => $publicacion,
        ]);
    }

    public function destroy($id)
    {
        $publicacion = Publicacion::find($id);

        if (!$publicacion) {
            return response()->json([
                'message' => 'Publicación no encontrada.'
            ], 404);
        }

        $publicacion->delete();

        return response()->json([
            'message' => 'Publicación eliminada correctamente.'
        ]);
    }
}