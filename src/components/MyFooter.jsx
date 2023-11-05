import { Col, Container, Row } from "react-bootstrap"
import {
  Discord,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from "react-bootstrap-icons"

const MyFooter = () => {
  return (
    <Container
      fluid
      style={{ borderTop: "1px solid #fd7486" }}
      className="mt-5 "
    >
      <Row>
        <Col className=" my-2 d-flex justify-content-center">
          <Facebook className=" my-2 mx-3 fs-3" style={{ color: "#fd7486" }} />
          <Instagram className=" my-2 mx-3 fs-3" style={{ color: "#fd7486" }} />
          <Github className=" my-2 mx-3 fs-3" style={{ color: "#fd7486" }} />
          <Linkedin className=" my-2 mx-3 fs-3" style={{ color: "#fd7486" }} />
          <Discord className=" my-2 mx-3 fs-3" style={{ color: "#fd7486" }} />
        </Col>
      </Row>
      <Row>
        <div className="text-center text-dark p-3">
          {new Date().getFullYear()} Copyright:
          <a className="text-dark" href="/">
            weather.app.com
          </a>
        </div>
      </Row>
    </Container>
  )
}
export default MyFooter
