<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicacionFoto extends Model
{
    use HasFactory;

    protected $table = 'publicacion_fotos';

    protected $fillable = [
        'publicacion_id',
        'imagen',
        'orden',
    ];

    protected $casts = [
        'orden' => 'integer',
    ];

    public function publicacion()
    {
        return $this->belongsTo(
            Publicacion::class,
            'publicacion_id'
        );
    }
}