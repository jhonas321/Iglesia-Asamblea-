<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;

    protected $table = 'contactos';

    protected $fillable = [
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
    ];
}