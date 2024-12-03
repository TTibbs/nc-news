import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import Topics from "./components/Topics";
import TopicSlug from "./components/TopicSlug";
import NotFound from "./components/NotFound";
import PostArticle from "./components/PostArticle";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/auth"
          element={
            <Layout>
              <Auth />
            </Layout>
          }
        />
        <Route
          path="/articles"
          element={
            <Layout>
              <ArticleList />
            </Layout>
          }
        />
        <Route
          path="/articles/:article_id"
          element={
            <Layout>
              <SingleArticle />
            </Layout>
          }
        />
        <Route
          path="/topics"
          element={
            <Layout>
              <Topics />
            </Layout>
          }
        />
        <Route
          path="/topics/:slug"
          element={
            <Layout>
              <TopicSlug />
            </Layout>
          }
        />
        <Route
          path="/post-article"
          element={
            <Layout>
              <PostArticle />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound
                error={{
                  status: 404,
                  msg: "The page you are looking for does not exist.",
                }}
              />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
