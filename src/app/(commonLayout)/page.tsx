import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data } = await blogService.getBlogPosts();
  console.log(data);

  return (
    <div>
      <Button variant="outline">Click here</Button>
    </div>
  );
}
