<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function index()
    {
        $contacto = Contacto::first();

        return response()->json($contacto);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre_iglesia' => 'required|string|max:250',
            'direccion' => 'required|string|max:300',
            'telefono' => 'nullable|string|max:30',
            'whatsapp_numero' => 'nullable|string|max:30',

            'footer_ubicacion' => 'nullable|string|max:300',
            'footer_telefono' => 'nullable|string|max:30',
            'footer_correo' => 'nullable|email|max:150',

            'facebook_url' => 'nullable|string|max:1000',
            'youtube_url' => 'nullable|string|max:1000',
            'instagram_url' => 'nullable|string|max:1000',
            'tiktok_url' => 'nullable|string|max:1000',
            'twitter_url' => 'nullable|string|max:1000',
            'telegram_url' => 'nullable|string|max:1000',
        ]);

        if (Contacto::exists()) {
            return response()->json([
                'message' => 'Ya existe una configuración de contacto.'
            ], 422);
        }

        $contacto = Contacto::create($request->only([
            'nombre_iglesia',
            'direccion',
            'telefono',
            'whatsapp_numero',
            'footer_ubicacion',
            'footer_telefono',
            'footer_correo',
            'facebook_url',
            'youtube_url',
            'instagram_url',
            'tiktok_url',
            'twitter_url',
            'telegram_url',
        ]));

        return response()->json([
            'message' => 'Contacto creado correctamente.',
            'contacto' => $contacto,
        ], 201);
    }

    public function show($id)
    {
        $contacto = Contacto::find($id);

        if (!$contacto) {
            return response()->json([
                'message' => 'Contacto no encontrado.'
            ], 404);
        }

        return response()->json($contacto);
    }

    public function update(Request $request, $id)
    {
        $contacto = Contacto::find($id);

        if (!$contacto) {
            return response()->json([
                'message' => 'Contacto no encontrado.'
            ], 404);
        }

        $request->validate([
            'nombre_iglesia' => 'required|string|max:250',
            'direccion' => 'required|string|max:300',
            'telefono' => 'nullable|string|max:30',
            'whatsapp_numero' => 'nullable|string|max:30',

            'footer_ubicacion' => 'nullable|string|max:300',
            'footer_telefono' => 'nullable|string|max:30',
            'footer_correo' => 'nullable|email|max:150',

            'facebook_url' => 'nullable|string|max:1000',
            'youtube_url' => 'nullable|string|max:1000',
            'instagram_url' => 'nullable|string|max:1000',
            'tiktok_url' => 'nullable|string|max:1000',
            'twitter_url' => 'nullable|string|max:1000',
            'telegram_url' => 'nullable|string|max:1000',
        ]);

        $contacto->update($request->only([
            'nombre_iglesia',
            'direccion',
            'telefono',
            'whatsapp_numero',
            'footer_ubicacion',
            'footer_telefono',
            'footer_correo',
            'facebook_url',
            'youtube_url',
            'instagram_url',
            'tiktok_url',
            'twitter_url',
            'telegram_url',
        ]));

        return response()->json([
            'message' => 'Contacto actualizado correctamente.',
            'contacto' => $contacto,
        ]);
    }

    public function destroy($id)
    {
        $contacto = Contacto::find($id);

        if (!$contacto) {
            return response()->json([
                'message' => 'Contacto no encontrado.'
            ], 404);
        }

        $contacto->delete();

        return response()->json([
            'message' => 'Contacto eliminado correctamente.'
        ]);
    }
}