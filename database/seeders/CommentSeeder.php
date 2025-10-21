<?php

namespace Database\Seeders;

use App\Enums\CommentStatus;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::query()->get();
        $posts = Post::query()->get();

        // Add comments to different posts
        foreach ($posts->take(10) as $post) {
            $this->seedCommentsForPost($post, $users);
        }
    }

    /**
     * Seed comments for a specific post.
     */
    private function seedCommentsForPost(Post $post, $users): void
    {
        $commentTexts = [
            'Great article! This really helped me understand the concept better.',
            "Thanks for sharing this. I've been struggling with this exact issue.",
            'Very well explained. Do you have any recommendations for further reading?',
            'This is exactly what I was looking for. Saved me hours of debugging!',
            "Interesting perspective. I've been using a different approach but this seems cleaner.",
            'Could you elaborate more on the performance implications?',
            "Nice tutorial! One thing I'd add is to always consider edge cases.",
            "I've implemented something similar in my project and it works perfectly.",
            'This is a solid foundation. Looking forward to more posts like this!',
            'Excellent breakdown of the topic. Very practical examples.',
        ];

        $replyTexts = [
            "Thanks! I'm glad you found it helpful.",
            'You might want to check out the official documentation for more details.',
            "That's a great question. Let me explain...",
            "I agree, that's definitely something worth considering.",
            'Good point! I should have mentioned that in the article.',
            'The performance difference is negligible for most use cases.',
            'Absolutely! Edge cases are crucial in production environments.',
            "That's awesome to hear! Let me know if you run into any issues.",
            'Thank you! More posts coming soon.',
            'I appreciate the feedback!',
        ];

        // Create 3-5 top-level comments for each post
        $numComments = rand(3, 5);

        for ($i = 0; $i < $numComments; $i++) {
            $commenter = $users->random();

            $comment = Comment::query()->create([
                'user_id' => $commenter->id,
                'post_id' => $post->id,
                'comment_id' => null,
                'content' => $commentTexts[array_rand($commentTexts)],
                'status' => CommentStatus::APPROVED,
            ]);

            // Add some likes to comments
            $likerIds = $users->random(rand(0, 4))->pluck('id');
            $comment->likes()->attach($likerIds);

            // 60% chance of getting a reply
            if (rand(1, 100) <= 60) {
                $replier = $users->where('id', '!=', $commenter->id)->random();

                $reply = Comment::query()->create([
                    'user_id' => $replier->id,
                    'post_id' => $post->id,
                    'comment_id' => $comment->id,
                    'content' => $replyTexts[array_rand($replyTexts)],
                    'status' => CommentStatus::APPROVED,
                ]);

                // Add likes to replies too
                $replyLikerIds = $users->random(rand(0, 3))->pluck('id');
                $reply->likes()->attach($replyLikerIds);

                // 30% chance of getting a nested reply
                if (rand(1, 100) <= 30) {
                    $nestedReplier = $users->whereNotIn('id', [$commenter->id, $replier->id])->random();

                    $nestedReply = Comment::query()->create([
                        'user_id' => $nestedReplier->id,
                        'post_id' => $post->id,
                        'comment_id' => $reply->id,
                        'content' => $replyTexts[array_rand($replyTexts)],
                        'status' => CommentStatus::APPROVED,
                    ]);

                    // Add likes to nested replies
                    $nestedLikerIds = $users->random(rand(0, 2))->pluck('id');
                    $nestedReply->likes()->attach($nestedLikerIds);
                }
            }
        }
    }
}
