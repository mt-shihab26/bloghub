<?php

use App\Models\Comment;
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
        Schema::create('comment_user_likes', function (Blueprint $table) {
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Comment::class)->constrained()->onDelete('cascade');

            $table->timestamps();

            $table->unique(['user_id', 'comment_id']);

            $table->index('user_id');
            $table->index('comment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment_user_likes');
    }
};
