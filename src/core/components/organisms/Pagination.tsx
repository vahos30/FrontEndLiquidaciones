import { Button, Col, Form, Row } from "react-bootstrap";
import { PaginationProps } from "@/core/domain/InterfacesProps";

export const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
    return (
        <Row className="mt-3">
          <Col className="d-flex justify-content-end align-items-center">
            <div style={{ fontSize: "12px", marginRight: "5px" }}>
              Total items: {props.totalItems}
            </div>
            <nav>
              <ul className="custom-pagination">
                <li className="custom-page-item">
                  <Button
                    className="custom-page-link"
                    onClick={() => props.onPageChange(props.currentPage - 1)}
                    disabled={props.currentPage === 1}
                  >
                    {"<"}
                  </Button>
                </li>
                {[...Array(props.totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <li key={page} className="custom-page-item">
                      <Button
                        className={`custom-page-link ${props.currentPage === page ? "active" : ""}`}
                        onClick={() => props.onPageChange(page)}
                      >
                        {page}
                      </Button>
                    </li>
                  );
                })}
                <li className="custom-page-item">
                  <Button
                    className="custom-page-link"
                    onClick={() => props.onPageChange(props.currentPage + 1)}
                    disabled={props.currentPage === props.totalPages}
                  >
                    {">"}
                  </Button>
                </li>
              </ul>
            </nav>
    
            <Form.Select
              className="custom-select2"
              value={props.pageSize}
              onChange={(e) => props.onPageSizeChange(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </Form.Select>
            <Form.Label className="custom-label2">Ir a:</Form.Label>
            <Form.Control
              type="number"
              className="custom-input2"
              onChange={(e) => props.onGoToPage(Number(e.target.value))}
              min={1}
              max={props.totalPages}
            />
          </Col>
        </Row>
      );
};