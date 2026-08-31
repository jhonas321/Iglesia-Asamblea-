<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMinisteriosTable extends Migration
{
    public function up()
    {
        Schema::create('ministerios', function (Blueprint $table) {
            $table->id();

            $table->string('nombre', 150)
                ->unique();

            $table->text('descripcion');

            $table->boolean('activo')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ministerios');
    }
}