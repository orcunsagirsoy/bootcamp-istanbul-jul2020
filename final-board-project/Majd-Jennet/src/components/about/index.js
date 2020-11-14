import React from "react";
import "antd/dist/antd.css";
import { PageHeader, Typography, Col } from "antd";



const About = () => {

  const { Title } = Typography;
  const { Paragraph } = Typography;
  const pageTitle = <Title className="about-title">About</Title>;

  const jennet = <a className="link" href="https://github.com/jennethydyrova">Jennet Hydyrova</a>;
  const majd = <a className="link" href="https://github.com/majdajroudi">Majd Ajroudi</a>;
  const recoded = (
    <a className="link" href="https://www.re-coded.com/istanbul-coding-bootcamp-spring-2020">
      {" "}
      Re:coded Frontend Web Development Bootcamp
    </a>
  );

  return (
    <>
      <Col span={16}>
        <PageHeader title={pageTitle}>
          <Paragraph className="about" style={{ fontSize: "18px" }}>
            This website was designed by {jennet} and {majd} as a project for
            the
            {recoded}. ReactJS framework was used to add the functionalities
            provided in the website. Firebase was used to create and manage the
            database Ant design was used to style the website.
          </Paragraph>
        </PageHeader>
      </Col>
    </>
  );
};

export default About;
