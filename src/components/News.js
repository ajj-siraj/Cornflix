import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import "../css/News.css";

class News extends React.Component {
  constructor() {
    super();
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    const newsAPI =
      "https://newsapi.org/v2/everything?q=boxoffice&apiKey=0a95e66f29f94a6b8e72cb581d05d184&language=en";
    fetch(newsAPI)
      .then((res) => res.json())
      .then((res) => res.articles.slice(0, 5))
      .then((res) => {
        this.setState((prevState) => ({ ...prevState, news: res }));
      })
      .catch((err) => console.error(err));
  }
  render() {
    // console.log("NEWS articles: ", this.state.news);
    let articles = this.state.news.map((article, index) => {
      return (
        <Card key={`${article.source.id}/${index}`}className="bg-dark text-white">
          <Card.Body>
            <Row>
              <Col lg="4">
                <Card.Img className="news-img img-fluid m-0" variant="left" src={article.urlToImage} />
              </Col>
              <Col className="m-0 p-0">
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{article.source.name}</Card.Subtitle>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={article.url} target="_blank">Read More</Card.Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });

    return (
      <>
        <h5 className="mt-4 mb-4">Latest news</h5>
        {articles}
      </>
    );
  }
}

export default News;
