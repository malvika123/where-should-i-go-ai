import { useParams } from 'react-router-dom';
import PageNotFound from '../../components/Pages/PageNotFound';


function ArticlesPage() {
  const { articleId } = useParams();
  try {
    const ArticleComponent = require(`./${articleId}`).default; // Load dynamically
    return <ArticleComponent />;
  } catch (error) {
    return <PageNotFound/>;
  }
}

export default ArticlesPage;