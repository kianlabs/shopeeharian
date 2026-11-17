import { CategoryView, categoryMetadata } from "@/components/category-view";

export const metadata = categoryMetadata("organizer");

export default function OrganizerPage() {
  return <CategoryView id="organizer" />;
}
