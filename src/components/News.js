import React from "react";
import { Row, Col, Card } from "react-bootstrap";

class News extends React.Component {

  render() {
    let articles = this.props.news.map((article, index) => {
      return (
        <Card key={`${article.source.id}/${index}`} className="bg-dark text-white">
          <Card.Body>
            <Row>
              <Col lg="4">
                <Card.Img
                  className="news-img img-fluid m-0"
                  variant="left"
                  src={article.urlToImage}
                />
              </Col>
              <Col className="m-0 p-0">
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{article.source.name}</Card.Subtitle>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={article.url} target="_blank">
                  Read More
                </Card.Link>
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
