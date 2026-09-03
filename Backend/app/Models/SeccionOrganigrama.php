<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeccionOrganigrama extends Model
{
    use HasFactory;

    protected $table = 'secciones_organigrama';

    protected $fillable = [
        'ministerio_id',
        'titulo',
        'descripcion',
        'tipo',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function ministerio()
    {
        return $this->belongsTo(
            Ministerio::class,
            'ministerio_id'
        );
    }

    public function miembros()
    {
        return $this->hasMany(
            MiembroOrganigrama::class,
            'seccion_organigrama_id'
        )->orderBy('orden');
    }
}