import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { FeaturedTopics } from "@/components/home/FeaturedTopics";
import { Welcome } from "@/components/home/Welcome";

const Home = () => {
  return (
    <section className="mt-28 mx-5 md:mx-14 text-zinc-200">
      <Welcome />
      <FeaturedTopics />
      <FeaturedArticles />
    </section>
  );
};

export default Home;
