// We import and use the useRouter function from next/router
// which will return the Next.js router object.
import { useRouter } from "next/router";
import Layout from "../components/MyLayout";

const Content = () => {
  const router = useRouter();

  return (
    <>
      <h1>{router.query.title}</h1>
      <p>This is the blog post content.</p>
    </>
  );
};

const Page = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Page;
