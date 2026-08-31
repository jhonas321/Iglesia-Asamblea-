<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactosTable extends Migration
{
    public function up()
    {
        Schema::create('contactos', function (Blueprint $table) {
            $table->id();

            $table->string('nombre_iglesia', 250);

            $table->string('direccion', 300);

            $table->string('telefono', 30)
                ->nullable();

            $table->string('whatsapp_numero', 30)
                ->nullable();

            $table->string('footer_ubicacion', 300)
                ->nullable();

            $table->string('footer_telefono', 30)
                ->nullable();

            $table->string('footer_correo', 150)
                ->nullable();

            $table->string('facebook_url', 1000)
                ->nullable();

            $table->string('youtube_url', 1000)
                ->nullable();

            $table->string('instagram_url', 1000)
                ->nullable();

            $table->string('tiktok_url', 1000)
                ->nullable();

            $table->string('twitter_url', 1000)
                ->nullable();

            $table->string('telegram_url', 1000)
                ->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contactos');
    }
}