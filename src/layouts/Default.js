import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import Loader from "../components/loader";

const DefaultLayout = ({ children: Children, noNavbar, noFooter }) => {
  const [showLoader, setShowLoader] = useState(false);
  const toggleShowLoader = (bool) => {
    setShowLoader(bool);
  };

  return (
    <>
      {showLoader && <Loader />}
      <Container fluid>
        <Row>
          <MainSidebar />
          <Col
            className='main-content p-0'
            lg={{ size: 10, offset: 2 }}
            md={{ size: 9, offset: 3 }}
            sm='12'
            tag='main'>
            {!noNavbar && <MainNavbar />}
            {React.cloneElement(Children, { toggleLoader: toggleShowLoader })}
            {!noFooter && <MainFooter />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default DefaultLayout;
