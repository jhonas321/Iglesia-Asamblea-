<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::with('rol')
            ->where('email', $request->email)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [
                    'El correo o la contraseña son incorrectos.'
                ],
            ]);
        }

        if (!$user->activo) {
            return response()->json([
                'message' => 'El usuario se encuentra deshabilitado.'
            ], 403);
        }

        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'icono' => $user->icono,
                'activo' => $user->activo,
                'rol' => $user->rol ? [
                    'id' => $user->rol->id,
                    'nombre' => $user->rol->nombre,
                ] : null,
            ],
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load('rol'),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente.'
        ]);
    }
}