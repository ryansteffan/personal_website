import ManagementHeader from "~/components/client/management_header/management_header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreatePostFrom from "~/components/client/blog_forms/create_post";
import EditPostForm from "~/components/client/blog_forms/edit_post";
import DeletePostForm from "~/components/client/blog_forms/delete_post";

export default function BlogPage(): React.ReactNode {
  return (
    <>
      <ManagementHeader pageName="My Blog" />
      <div className="flex h-fit flex-col">
        <Tabs
          defaultValue="createPost"
          className="flex h-full w-full flex-col p-4"
        >
          <div className="mb-4 flex w-full justify-center">
            <TabsList className="bg-slate-700">
              <TabsTrigger value="createPost">Create Post</TabsTrigger>
              <TabsTrigger value="editPost">Edit Post</TabsTrigger>
              <TabsTrigger value="deletePost">Delete Post</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="createPost" className="flex-1 overflow-auto">
            <div className="h-full w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <h1 className="mb-4 text-xl font-bold">
                Create a new blog post...
              </h1>
              <CreatePostFrom />
            </div>
          </TabsContent>

          <TabsContent value="editPost" className="flex-1 overflow-auto">
            <div className="h-full w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <h1 className="mb-4 text-xl font-bold">Edit a post...</h1>
              <EditPostForm />
            </div>
          </TabsContent>

          <TabsContent value="deletePost" className="flex-1 overflow-auto">
            <div className="h-full w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <h1 className="mb-4 text-xl font-bold">Delete a post...</h1>
              <DeletePostForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
