import { hasChild } from '..';

let div: HTMLElement;

const markup = `
<main class="main">
  <nav>
    <a href="#" class="nav-link nav-link--home">Home Link</a>
  </nav>
  <section class="blog-posts">
    <article class="blog-post">
      <h1 class="blog-post-headline">Blog Post Headline</h1>
      <p class="blog-post-paragraph">
        Blog Post Paragraph
        <span class="blog-post-icon">Blog Post Icon</span>
      </p>
    </article>    
    <article class="blog-post">
      <h1 class="blog-post-headline">Blog Post Headline 2</h1>
      <p class="blog-post-paragraph">
        Blog Post Paragraph 2
        <span class="blog-post-icon">Blog Post Icon 2</span>
      </p>
    </article>
  </section>
</main>
`;

beforeAll(() => {
  div = document.createElement('div');
  div.innerHTML = markup;
});

test('should return whether the parent has a child matching the given selector', () => {
  expect(hasChild(div, '.blog-post-paragraph')).toBeTruthy();
  expect(hasChild(div, '.not-existent')).toBeFalsy();
});
