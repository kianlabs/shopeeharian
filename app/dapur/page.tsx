import { CategoryView, categoryMetadata } from "@/components/category-view";

export const metadata = categoryMetadata("dapur");

export default function DapurPage() {
  return <CategoryView id="dapur" />;
}
