<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use App\Models\PublicacionFoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            'video_trailer' => 'nullable|file|mimes:mp4,webm,ogg|max:51200',

            'video_trailer_portada' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            'video_completo_url' => 'nullable|string|max:1500',

            'activo' => 'nullable|boolean',

            'fotos' => 'nullable|array',
            'fotos.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $rutaImagen = null;
        $rutaVideoTrailer = null;
        $rutaPortadaTrailer = null;

        if ($request->hasFile('imagen')) {
            $rutaImagen = $request->file('imagen')->store(
                'publicaciones',
                'public'
            );
        }

        if ($request->hasFile('video_trailer')) {
            $rutaVideoTrailer = $request->file('video_trailer')->store(
                'publicaciones/videos',
                'public'
            );
        }

        if ($request->hasFile('video_trailer_portada')) {
            $rutaPortadaTrailer = $request
                ->file('video_trailer_portada')
                ->store(
                    'publicaciones/portadas',
                    'public'
                );
        }

        $publicacion = Publicacion::create([
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_final' => $request->fecha_final,
            'hora' => $request->hora,
            'lugar' => $request->lugar,
            'descripcion' => $request->descripcion,
            'imagen' => $rutaImagen,
            'video_trailer_url' => $rutaVideoTrailer,
            'video_trailer_portada' => $rutaPortadaTrailer,
            'video_completo_url' => $request->video_completo_url,
            'activo' => $request->activo ?? true,
        ]);

        if ($request->hasFile('fotos')) {
            foreach ($request->file('fotos') as $index => $foto) {
                $rutaFoto = $foto->store(
                    'publicaciones/galeria',
                    'public'
                );

                PublicacionFoto::create([
                    'publicacion_id' => $publicacion->id,
                    'imagen' => $rutaFoto,
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
        $publicacion = Publicacion::with('fotos')->find($id);

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

            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            'video_trailer' => 'nullable|file|mimes:mp4,webm,ogg|max:51200',

            'video_trailer_portada' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            'video_completo_url' => 'nullable|string|max:1500',

            'activo' => 'nullable|boolean',

            'fotos' => 'nullable|array',
            'fotos.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $datos = [
            'ministerio_id' => $request->ministerio_id,
            'titulo' => $request->titulo,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_final' => $request->fecha_final,
            'hora' => $request->hora,
            'lugar' => $request->lugar,
            'descripcion' => $request->descripcion,
            'video_completo_url' => $request->video_completo_url,
            'activo' => $request->activo ?? $publicacion->activo,
        ];

        if ($request->hasFile('imagen')) {
            if ($publicacion->imagen) {
                Storage::disk('public')->delete($publicacion->imagen);
            }

            $datos['imagen'] = $request->file('imagen')->store(
                'publicaciones',
                'public'
            );
        }

        if ($request->hasFile('video_trailer')) {
            if ($publicacion->video_trailer_url) {
                Storage::disk('public')->delete(
                    $publicacion->video_trailer_url
                );
            }

            $datos['video_trailer_url'] = $request
                ->file('video_trailer')
                ->store(
                    'publicaciones/videos',
                    'public'
                );
        }

        if ($request->hasFile('video_trailer_portada')) {
            if ($publicacion->video_trailer_portada) {
                Storage::disk('public')->delete(
                    $publicacion->video_trailer_portada
                );
            }

            $datos['video_trailer_portada'] = $request
                ->file('video_trailer_portada')
                ->store(
                    'publicaciones/portadas',
                    'public'
                );
        }

        $publicacion->update($datos);

        if ($request->hasFile('fotos')) {
            foreach ($publicacion->fotos as $fotoAnterior) {
                if ($fotoAnterior->imagen) {
                    Storage::disk('public')->delete(
                        $fotoAnterior->imagen
                    );
                }
            }

            $publicacion->fotos()->delete();

            foreach ($request->file('fotos') as $index => $foto) {
                $rutaFoto = $foto->store(
                    'publicaciones/galeria',
                    'public'
                );

                PublicacionFoto::create([
                    'publicacion_id' => $publicacion->id,
                    'imagen' => $rutaFoto,
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
        $publicacion = Publicacion::with('fotos')->find($id);

        if (!$publicacion) {
            return response()->json([
                'message' => 'Publicación no encontrada.'
            ], 404);
        }

        if ($publicacion->imagen) {
            Storage::disk('public')->delete(
                $publicacion->imagen
            );
        }

        if ($publicacion->video_trailer_url) {
            Storage::disk('public')->delete(
                $publicacion->video_trailer_url
            );
        }

        if ($publicacion->video_trailer_portada) {
            Storage::disk('public')->delete(
                $publicacion->video_trailer_portada
            );
        }

        foreach ($publicacion->fotos as $foto) {
            if ($foto->imagen) {
                Storage::disk('public')->delete(
                    $foto->imagen
                );
            }
        }

        $publicacion->delete();

        return response()->json([
            'message' => 'Publicación eliminada correctamente.'
        ]);
    }
}