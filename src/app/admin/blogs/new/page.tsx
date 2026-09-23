import { BlogForm } from "../../forms";

export default function NewBlog() {
  return (
    <div className="admin-page">
      <h1>New blog post</h1>
      <BlogForm />
    </div>
  );
}
