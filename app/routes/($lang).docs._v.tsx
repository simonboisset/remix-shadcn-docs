import {LoaderFunctionArgs} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import {ContentLayout} from '~/components/content/layout';
import {getDocSummaries, requireDoc} from '~/contents/doc/doc.server';

export const loader = async ({params}: LoaderFunctionArgs) => {
  const {docs, lang, version} = requireDoc(params);
  const {tree} = getDocSummaries({docs, lang, version});

  return tree;
};

export default function Index() {
  const linksTree = useLoaderData<typeof loader>();
  return (
    <ContentLayout linksTree={linksTree}>
      <Outlet />
    </ContentLayout>
  );
}
