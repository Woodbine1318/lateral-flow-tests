import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Logo from '../assets/images/Logo.svg';
import Bike from '../assets/images/Bike.svg';
import Scooter from '../assets/images/Scooter.svg';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { graphql, Link } from 'gatsby';
import BlogPostCard from '../components/BlogPostCard';
import Stack from '../components/Stack';
import Pagination from '../components/Pagination.';
import CategoryNav from '../components/CategoryNav';

const IndexPage = ({ location, data: { allContentfulBlogPost } }) => {
  const [featured, ...latest] = allContentfulBlogPost?.edges.map(({ node: post }) => post);

  return (
    <Layout>
      <SEO canonicalPath={location.pathname} />

      <header className="flex justify-center items-center min-w-max px-8 font-display text-lg">
        <Link to="/">
          <h1 className="font-black text-2xl mb-16">Lateral Flow Tests</h1>
        </Link>
      </header>

      <CategoryNav className="mb-24" />

      <div className="container px-7 grid grid-cols-1 items-start mb-24 md:grid-cols-2 md:px-11 md:gap-x-14">
        <Stack className="mb-24 md:sticky md:top-11 md:left-0 md:mb-8">
          <article className="relative bg-white max-w-4xl p-14 border-8 border-black rounded-3xl">
            <Link to={`/news/${featured.slug}`}>
              {!featured.cover?.gatsbyImageData ? null : (
                <GatsbyImage
                  image={featured.cover.gatsbyImageData}
                  alt={featured.cover.title || ''}
                  className="rounded-3xl mb-7 w-full max-h-120"
                />
              )}
              <h2 className="font-extrabold text-lg mb-2">{featured.title}</h2>
            </Link>
            <h2 className={`text-sm mb-16`}>{featured.createdAt}</h2>
            <p className="mb-8">{featured.content.childMarkdownRemark.excerpt}</p>

            <div className="flex flex-row flex-wrap">
              {featured.categories.map((category) => (
                <p
                  className="w-min px-8 text-sm text-center border-4 border-black rounded-xl font-black uppercase py-1 mr-2 last:mr-0"
                  key={category.id}
                >
                  {category.name}
                </p>
              ))}
            </div>
          </article>
        </Stack>

        <section className="w-full">
          <h1 className="font-black text-2xl uppercase border-b-8 border-black mb-16">Latest</h1>

          {latest.map((post, index) => (
            <div className="flex flex-row flex-nowrap items-start lg:items-center mb-14">
              <p className="font-black text-2xl mr-12 mt-16 lg:mt-0">{index + 1}</p>

              <BlogPostCard post={post} isEven={index % 2 === 0} />
            </div>
          ))}
        </section>
      </div>

      <div className="mb-12">
        <Pagination currentPageIndex={1} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query IndexPageQuery {
    allContentfulBlogPost(limit: 5, sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          id
          slug
          title
          categories {
            id
            slug
            name
          }
          cover {
            gatsbyImageData(quality: 100, layout: CONSTRAINED, width: 600, placeholder: DOMINANT_COLOR)
            title
          }
          createdAt(formatString: "MMMM D, yyyy")
          content {
            childMarkdownRemark {
              excerpt(format: PLAIN, pruneLength: 260, truncate: true)
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
