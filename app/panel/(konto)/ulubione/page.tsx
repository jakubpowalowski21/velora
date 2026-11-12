import { FavoritesList } from "@/components/panel/favorites-list";
import tours from "@/data/wycieczki.json";

export const metadata = { title: "Ulubione wycieczki | VELORA" };

export default function FavoritesPage() {
  return <FavoritesList tours={tours} />;
}
