<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->foreignId('rol_id')
                ->constrained('roles')
                ->onUpdate('cascade')
                ->onDelete('restrict');

            $table->string('name', 150);

            $table->string('email', 150)
                ->unique();

            $table->timestamp('email_verified_at')
                ->nullable();

            $table->string('password');

            $table->string('icono', 50)
                ->default('hombre-1');

            $table->boolean('activo')
                ->default(true);

            $table->rememberToken();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}