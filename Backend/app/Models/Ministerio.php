<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ministerio extends Model
{
    use HasFactory;

    protected $table = 'ministerios';

    protected $fillable = [
        'nombre',
        'descripcion',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function eventos()
    {
        return $this->hasMany(Evento::class, 'ministerio_id');
    }

    public function publicaciones()
    {
        return $this->hasMany(Publicacion::class, 'ministerio_id');
    }

    public function seccionesOrganigrama()
    {
        return $this->hasMany(
            SeccionOrganigrama::class,
            'ministerio_id'
        );
    }
}