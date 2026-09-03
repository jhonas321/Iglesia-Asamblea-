<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $table = 'eventos';

    protected $fillable = [
        'ministerio_id',
        'titulo',
        'fecha_inicio',
        'fecha_final',
        'hora',
        'lugar',
        'whatsapp_numero',
        'descripcion',
        'detalles',
        'imagen',
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
}