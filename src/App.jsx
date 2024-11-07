import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import ErrorPage from "./components/ErrorPage";
import Topics from "./components/Topics";
import TopicSlug from "./components/TopicSlug";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:slug" element={<TopicSlug />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
