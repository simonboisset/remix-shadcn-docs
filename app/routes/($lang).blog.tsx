import {LoaderFunctionArgs} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import {ContentLayout} from '~/components/content/layout';
import {requireBlogPost} from '~/contents/blog/blog.server';

export const loader = async ({params}: LoaderFunctionArgs) => {
  const {posts} = requireBlogPost(params);

  return posts;
};

export default function Index() {
  const linksTree = useLoaderData<typeof loader>();
  return (
    <ContentLayout linksTree={linksTree}>
      <Outlet />
    </ContentLayout>
  );
}
