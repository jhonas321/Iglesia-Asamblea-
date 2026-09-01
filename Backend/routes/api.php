<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MinisterioController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\SeccionOrganigramaController;
use App\Http\Controllers\MiembroOrganigramaController;
use App\Http\Controllers\HeroFotoController;
use App\Http\Controllers\ContactoController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('ministerios', MinisterioController::class);

    Route::apiResource('eventos', EventoController::class);

    Route::apiResource('publicaciones', PublicacionController::class);

    Route::apiResource('horarios', HorarioController::class);

    Route::apiResource('secciones-organigrama', SeccionOrganigramaController::class);

    Route::apiResource('miembros-organigrama', MiembroOrganigramaController::class);

    Route::apiResource('hero-fotos', HeroFotoController::class);

    Route::apiResource('contactos', ContactoController::class);

});