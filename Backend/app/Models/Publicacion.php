<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    use HasFactory;

    protected $table = 'publicaciones';

    protected $fillable = [
        'ministerio_id',
        'titulo',
        'fecha_inicio',
        'fecha_final',
        'hora',
        'lugar',
        'descripcion',
        'imagen',
        'video_trailer_url',
        'video_trailer_portada',
        'video_completo_url',
        'activo',
    ];

    protected $casts = [
        'fecha_inicio' => 'date:Y-m-d',
        'fecha_final' => 'date:Y-m-d',
        'activo' => 'boolean',
    ];

    public function ministerio()
    {
        return $this->belongsTo(
            Ministerio::class,
            'ministerio_id'
        );
    }

    public function fotos()
    {
        return $this->hasMany(
            PublicacionFoto::class,
            'publicacion_id'
        )->orderBy('orden');
    }
}