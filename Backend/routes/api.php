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


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);


/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
*/

/*
| Ministerios
*/
Route::get('/ministerios', [
    MinisterioController::class,
    'index'
]);

Route::get('/ministerios/{ministerio}', [
    MinisterioController::class,
    'show'
]);


/*
| Eventos
*/
Route::get('/eventos', [
    EventoController::class,
    'index'
]);

Route::get('/eventos/{evento}', [
    EventoController::class,
    'show'
]);


/*
| Publicaciones
*/
Route::get('/publicaciones', [
    PublicacionController::class,
    'index'
]);

Route::get('/publicaciones/{publicacion}', [
    PublicacionController::class,
    'show'
]);


/*
| Horarios
*/
Route::get('/horarios', [
    HorarioController::class,
    'index'
]);

Route::get('/horarios/{horario}', [
    HorarioController::class,
    'show'
]);


/*
| Organigrama
*/
Route::get('/secciones-organigrama', [
    SeccionOrganigramaController::class,
    'index'
]);

Route::get('/secciones-organigrama/{seccion_organigrama}', [
    SeccionOrganigramaController::class,
    'show'
]);

Route::get('/miembros-organigrama', [
    MiembroOrganigramaController::class,
    'index'
]);

Route::get('/miembros-organigrama/{miembro_organigrama}', [
    MiembroOrganigramaController::class,
    'show'
]);


/*
| Fotos del Hero
*/
Route::get('/hero-fotos', [
    HeroFotoController::class,
    'index'
]);

Route::get('/hero-fotos/{hero_foto}', [
    HeroFotoController::class,
    'show'
]);


/*
| Contactos
*/
Route::get('/contactos', [
    ContactoController::class,
    'index'
]);

Route::get('/contactos/{contacto}', [
    ContactoController::class,
    'show'
]);


/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS DEL ADMINISTRADOR
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    | Usuario / autenticación
    */

    Route::get('/user', [
        AuthController::class,
        'user'
    ]);

    Route::post('/logout', [
        AuthController::class,
        'logout'
    ]);

    Route::put('/perfil', [
        AuthController::class,
        'actualizarPerfil'
    ]);

    Route::put('/cambiar-password', [
        AuthController::class,
        'cambiarPassword'
    ]);


    /*
    | Ministerios
    */

    Route::apiResource(
        'ministerios',
        MinisterioController::class
    )->except([
        'index',
        'show'
    ]);


    /*
    | Eventos
    */

    Route::apiResource(
        'eventos',
        EventoController::class
    )->except([
        'index',
        'show'
    ]);


    /*
    | Publicaciones
    */

    Route::apiResource(
        'publicaciones',
        PublicacionController::class
    )->except([
        'index',
        'show'
    ]);


    /*
    | Horarios
    */

    Route::apiResource(
        'horarios',
        HorarioController::class
    )->except([
        'index',
        'show'
    ]);


    /*
    | Organigrama - Secciones
    */

    Route::apiResource(
        'secciones-organigrama',
        SeccionOrganigramaController::class
    )->except([
        'index',
        'show'
    ]);


    /*
    | Organigrama - Miembros
    */

    Route::apiResource(
        'miembros-organigrama',
        MiembroOrganigramaController::class
    )->except([
        'index',
        'show'
    ]);


    /*
    | Fotos del Hero
    */

    Route::apiResource(
        'hero-fotos',
        HeroFotoController::class
    )->except([
        'index',
        'show'
    ]);


    /*
    | Contactos
    */

    Route::apiResource(
        'contactos',
        ContactoController::class
    )->except([
        'index',
        'show'
    ]);
});