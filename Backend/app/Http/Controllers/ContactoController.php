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
        $request->validate(
            [
                'nombre_iglesia' => 'required|string|max:250',
                'direccion' => 'required|string|max:300',
                'telefono' => 'required|string|max:30',
                'whatsapp_numero' => 'required|string|max:30',

                'footer_ubicacion' => 'required|string|max:300',
                'footer_telefono' => 'required|string|max:30',
                'footer_correo' => 'required|email|max:150',

                'facebook_url' => 'nullable|string|max:1000',
                'youtube_url' => 'nullable|string|max:1000',
                'instagram_url' => 'nullable|string|max:1000',
                'tiktok_url' => 'nullable|string|max:1000',
                'twitter_url' => 'nullable|string|max:1000',
                'telegram_url' => 'nullable|string|max:1000',
            ],
            [
                'nombre_iglesia.required' =>
                    'El nombre de la iglesia es obligatorio.',
                'nombre_iglesia.max' =>
                    'El nombre de la iglesia no puede superar los 250 caracteres.',

                'direccion.required' =>
                    'La dirección es obligatoria.',

                'direccion.max' =>
                    'La dirección no puede superar los 300 caracteres.',

                'telefono.required' =>
                    'El teléfono es obligatorio.',

                'telefono.max' =>
                    'El teléfono no puede superar los 30 caracteres.',

                'whatsapp_numero.required' =>
                    'El número de WhatsApp es obligatorio.',

                'whatsapp_numero.max' =>
                    'El número de WhatsApp no puede superar los 30 caracteres.',

                'footer_ubicacion.required' =>
                    'La ubicación del footer es obligatoria.',

                'footer_ubicacion.max' =>
                    'La ubicación del footer no puede superar los 300 caracteres.',

                'footer_telefono.required' =>
                    'El teléfono del footer es obligatorio.',

                'footer_telefono.max' =>
                    'El teléfono del footer no puede superar los 30 caracteres.',

                'footer_correo.required' =>
                    'El correo del footer es obligatorio.',

                'footer_correo.email' =>
                    'El correo del footer no tiene un formato válido.',

                'footer_correo.max' =>
                    'El correo del footer no puede superar los 150 caracteres.',

                'facebook_url.max' =>
                    'La URL de Facebook es demasiado larga.',

                'youtube_url.max' =>
                    'La URL de YouTube es demasiado larga.',

                'instagram_url.max' =>
                    'La URL de Instagram es demasiado larga.',

                'tiktok_url.max' =>
                    'La URL de TikTok es demasiado larga.',

                'twitter_url.max' =>
                    'La URL de Twitter / X es demasiado larga.',

                'telegram_url.max' =>
                    'La URL de Telegram es demasiado larga.',
            ]
        );

        if (Contacto::exists()) {
            return response()->json([
                'message' => 'Ya existe una configuración de contacto.'
            ], 422);
        }

        $contacto = Contacto::create(
            $request->only([
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
            ])
        );

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

        $request->validate(
            [
                'nombre_iglesia' => 'required|string|max:250',
                'direccion' => 'required|string|max:300',
                'telefono' => 'required|string|max:30',
                'whatsapp_numero' => 'required|string|max:30',

                'footer_ubicacion' => 'required|string|max:300',
                'footer_telefono' => 'required|string|max:30',
                'footer_correo' => 'required|email|max:150',

                'facebook_url' => 'nullable|string|max:1000',
                'youtube_url' => 'nullable|string|max:1000',
                'instagram_url' => 'nullable|string|max:1000',
                'tiktok_url' => 'nullable|string|max:1000',
                'twitter_url' => 'nullable|string|max:1000',
                'telegram_url' => 'nullable|string|max:1000',
            ],
            [
                'nombre_iglesia.required' =>
                    'El nombre de la iglesia es obligatorio.',
                'nombre_iglesia.max' =>
                    'El nombre de la iglesia no puede superar los 250 caracteres.',

                'direccion.required' =>
                    'La dirección es obligatoria.',

                'direccion.max' =>
                    'La dirección no puede superar los 300 caracteres.',

                'telefono.required' =>
                    'El teléfono es obligatorio.',

                'telefono.max' =>
                    'El teléfono no puede superar los 30 caracteres.',

                'whatsapp_numero.required' =>
                    'El número de WhatsApp es obligatorio.',

                'whatsapp_numero.max' =>
                    'El número de WhatsApp no puede superar los 30 caracteres.',

                'footer_ubicacion.required' =>
                    'La ubicación del footer es obligatoria.',

                'footer_ubicacion.max' =>
                    'La ubicación del footer no puede superar los 300 caracteres.',

                'footer_telefono.required' =>
                    'El teléfono del footer es obligatorio.',

                'footer_telefono.max' =>
                    'El teléfono del footer no puede superar los 30 caracteres.',

                'footer_correo.required' =>
                    'El correo del footer es obligatorio.',

                'footer_correo.email' =>
                    'El correo del footer no tiene un formato válido.',

                'footer_correo.max' =>
                    'El correo del footer no puede superar los 150 caracteres.',

                'facebook_url.max' =>
                    'La URL de Facebook es demasiado larga.',

                'youtube_url.max' =>
                    'La URL de YouTube es demasiado larga.',

                'instagram_url.max' =>
                    'La URL de Instagram es demasiado larga.',

                'tiktok_url.max' =>
                    'La URL de TikTok es demasiado larga.',

                'twitter_url.max' =>
                    'La URL de Twitter / X es demasiado larga.',

                'telegram_url.max' =>
                    'La URL de Telegram es demasiado larga.',
            ]
        );

        $contacto->update(
            $request->only([
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
            ])
        );

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
