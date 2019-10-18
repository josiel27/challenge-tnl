import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import "./SearchForm.css";
const SearchForm = props => {
  return (
    <Form
      onSubmit={e => {
        props.handleSearchRepositories(e);
      }}
    >
      <Form.Group>
        <Form.Label>Search for a github user Account:</Form.Label>
        <Form.Row>
          <Col sm={3} className="inputSearchText">
            <Form.Control name="inputSearchText" type="text" placeholder="User Id" required />
          </Col>
          <Col>
            <Button type="submit">SEARCH</Button>
          </Col>
        </Form.Row>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
