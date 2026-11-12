import posts from "@/data/blog.json";
import tours from "@/data/wycieczki.json";

const toursBySlug = new Map(tours.map((tour) => [tour.slug, tour]));

export const blogPosts = posts.map((post) => ({
  ...post,
  tour: toursBySlug.get(post.wycieczkaSlug),
}));
