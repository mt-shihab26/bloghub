<?php

use App\Enums\Status;
use App\Models\Image;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Image::class);

            $table->string('title');
            $table->string('slug');
            $table->text('content');
            $table->text('excerpt');
            $table->string('status')->default(Status::DRAFT->value);
            $table->timestamp('published_at');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
