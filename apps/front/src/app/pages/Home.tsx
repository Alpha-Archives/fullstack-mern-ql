import React, { FormEvent, useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import {
  POSTS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION,
} from '../graphql';

import Post from '../components/Post';
import classes from './app.module.css';

let unsubscribe = null;


const App = ()=> {


  const initialState = {
    formTitle: '',
    formBody: '',
  };

  const [state, setState] = useState(initialState)

  const createPost = (data) => {
    console.log(data);

  }

  const handleFormSubmit = (e:FormEvent) => {
    e.preventDefault();

    const { formTitle, formBody } = state;

    if (!formTitle || !formBody) return;

    createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: 2,
      },
    });

    setState({
      formTitle: '',
      formBody: '',
    });
  };


    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {(createPost) => {
                createPost = createPost;

                return (
                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={(e) =>
                            setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={(e) =>
                          setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                );
              }}
            </Mutation>
          </Col>


          {/* <Col xs="6">
            <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(((</p>;

                const posts = data.posts.map((post, id) => (
                  <Post data={post} key={id} />
                ));
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      const newPost = subscriptionData.data.post.data;

                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts],
                      };
                    },
                  });

                return <div>{posts}</div>;
              }}
            </Query>
          </Col> */}
        </Row>
      </Container>
    );

}

export default Home;
