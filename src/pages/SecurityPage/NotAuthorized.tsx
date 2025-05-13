import { useEffect } from "react";
import { Container, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
const NotAuthorized = () => {
  const redirectTo = `${import.meta.env.VITE_APP_HOST_FRONTEND}`; // URL de redirección
  const backgroundUrl = `${import.meta.env.VITE_APP_RECURSOS}/bghome.svg`;
 useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectTo; // Redirigir a la URL completa
    }, 5000);

    return () => clearTimeout(timer); // Limpieza del timeout al desmontar
  }, []);

  
  
   const cardStyle : React.CSSProperties = {
    borderRadius: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    backgroundColor: "#fff",
    padding: "2rem",
    maxWidth: "900px",
    textAlign: "center",
  };

  const pageStyle: React.CSSProperties = {
    minWidth: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    marginTop: "80px",
  };

  const layoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    transition: "all 0.3s ease",
    backgroundImage: `url('${backgroundUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minWidth: "320px",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  };
  return (
    <div style={layoutStyle}>
    <div style={pageStyle}>
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <Card style={cardStyle}>
          <Card.Body>  
            {/* Icono de advertencia centrado */}
            <Row className="justify-content-center mb-4">
              <Col xs="auto" className="text-center">
                <ExclamationTriangleFill color="orange" size={96} />
              </Col>
            </Row>

            {/* Mensaje de alerta */}
            <Row className="justify-content-center">
              <Col xs={12} md={6}>
                <Alert variant="danger" className="text-center">
                  <h1
                    className="mb-2"
                    style={{
                      color: "#2a2687",
                      fontSize: "2rem",
                      fontWeight: "bold",
                    }}
                  >
                    401 - Unauthorized (No autorizado)
                  </h1>
                  <p>Serás redirigido en unos segundos...</p>
                  <Spinner animation="border" />
                </Alert>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  </div>
  );
};

export default NotAuthorized;
