import React, { useRef } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";

const AddNewSermon = ({ toggleLoader }) => {
  const form = useRef(null);

  return (
    <>
      <Container fluid className='main-content-container px-4 pb-4'>
        {/* Page Header */}
        <Row noGutters className='page-header py-4'>
          <PageTitle
            sm='4'
            title='Add New Sermon'
            subtitle='Sermons'
            className='text-sm-left'
          />
        </Row>

        <Row>
          {/* Editor */}
          <Col lg='9' md='12'>
            <Editor type='sermon' ref={form} toggleLoader={toggleLoader} />
          </Col>

          {/* Sidebar Widgets */}
          <Col lg='3' md='12'>
            <SidebarActions toggleLoader={toggleLoader} form={form} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddNewSermon;
