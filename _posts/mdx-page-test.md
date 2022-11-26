---
title: Markdown/MDX with Next.js
author: Roman Sadoyan
publishedAt: 16 Feb 2022
---
# Header 1 / h1
## Header 2 / h2
### Header 3 / h3
#### Header 4 / h4
##### Header 5 / h5
###### Header 6 / h6


It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

I **love** using [Next.js](https://nextjs.org/)

```jsx[class="line-numbers"]
import { render, screen, fireEvent, waitFor } from '@testing-library/vue';

import Vuetify from 'vuetify';

import UserHeaderMenu from '@/components/header/UserHeaderMenu';

let vuetify;
const renderComponent = (propsData) => {
  render(UserHeaderMenu, {
    stubs: ['router-link', 'nuxt-link'],
    vuetify,
    props: {
      canRenderOrganizations: true,
      currentOrganization: { id: 'NCC', name: 'National Cancer Centre' },
      ...propsData,
    },
  });
};

const userName = 'Kim Joe';

const organizationList = [
  { id: 'TO2', name: 'TEST O83' },
  { id: 'NCC', name: 'National Cancer Centre' },
];

describe('UserHeaderMenu', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Renders user name', () => {
    renderComponent({ userAccountName: userName });
    expect(screen.getByText(userName)).toBeInTheDocument();
  });

  it('Opens menu on click', async () => {
    renderComponent({ userAccountName: userName });
    fireEvent.click(screen.getByText(userName));

    await waitFor(() => {
      expect(screen.getByText('Account')).toBeVisible();
    });

    // todo test close on click
  });

  it('Menu not visible on render', async () => {
    renderComponent({ userAccountName: userName });
    expect(screen.getByText('Account')).not.toBeVisible();
  });

  it('Renders organization list', async () => {
    renderComponent({ userAccountName: userName, organizations: organizationList });

    fireEvent.click(screen.getByText(userName));

    await waitFor(() => {
      expect(screen.getByText('TEST O83')).toBeVisible();
    });
  });

  it('Highlight current organization', async () => {
    renderComponent({
      userAccountName: userName,
      organizations: organizationList,
      currentOrganization: { id: 'TO2', name: 'TEST O83' },
    });

    fireEvent.click(screen.getByText(userName));

    await waitFor(() => {
      expect(screen.getByRole('option', { selected: true })).toHaveTextContent('TEST O83');
    });
  });
});
```

Next.js uses `getStaticPaths`/`getStaticProps` to generate [static pages](https://nextjs.org/docs/basic-features/data-fetching). These functions are _not_ bundled client-side, so you can **write server-side code directly**. For example, you can read Markdown files from the filesystem (`fs`) – including parsing front matter with [gray-matter](https://github.com/jonschlinkert/gray-matter). For example, let's assume you have a Markdown file located at `docs/my-post.js`.

We can retrieve that file's contents using `getDocBySlug('my-post')`.

```js
// lib/docs.js

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export function getDocBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const docsDirectory = join(process.cwd(), 'docs');
  const fullPath = join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}
```
