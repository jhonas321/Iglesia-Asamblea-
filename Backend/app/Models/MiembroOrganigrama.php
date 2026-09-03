<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MiembroOrganigrama extends Model
{
    use HasFactory;

    protected $table = 'miembros_organigrama';

    protected $fillable = [
        'seccion_organigrama_id',
        'nombre',
        'cargo',
        'genero',
        'orden',
        'activo',
    ];

    protected $casts = [
        'orden' => 'integer',
        'activo' => 'boolean',
    ];

    public function seccion()
    {
        return $this->belongsTo(
            SeccionOrganigrama::class,
            'seccion_organigrama_id'
        );
    }
}