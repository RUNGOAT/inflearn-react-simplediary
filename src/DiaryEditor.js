import Button from "react-bootstrap/Button";
import React, { useContext, useRef, useState } from "react";
import {
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { DiaryDispatchContext } from "./App";
import CloseButton from "react-bootstrap/CloseButton";

const DiaryEditor = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { onCreate } = useContext(DiaryDispatchContext);

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const authorInput = useRef();
  const contentInput = useRef();

  const handleSubmit = () => {
    if (state.author.length < 1) {
      // focus
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      // focus
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
    handleClose();
  };

  return (
    <div className="DiaryEditor">
      <Button variant="primary" onClick={handleShow}>
        일기 작성
      </Button>
      <Modal size="xl" show={show} onHide={handleClose}>
        <ModalHeader>
          <ModalTitle>오늘의 일기</ModalTitle>
          <CloseButton onClick={handleClose} className="me-1" />
        </ModalHeader>
        <ModalBody>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="author">작성자 :</Form.Label>
            <Form.Control
              ref={authorInput}
              name="author"
              id="author"
              value={state.author}
              onChange={handleChangeState}
              autoFocus
            />
          </Form.Group>
          {/* <div>
          <input
            ref={authorInput}
            name="author"
            value={state.author}
            onChange={handleChangeState}
          />
        </div> */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="content">내용 :</Form.Label>
            <Form.Control
              as="textarea"
              ref={contentInput}
              name="content"
              id="content"
              value={state.content}
              onChange={handleChangeState}
              style={{ height: "150px" }}
            />
          </Form.Group>
          {/* <div>
          <textarea
            ref={contentInput}
            name="content"
            value={state.content}
            onChange={handleChangeState}
          ></textarea>
        </div> */}
          <div>
            <Form.Label htmlFor="emotion">오늘의 감정점수 : </Form.Label>
            <Form.Select
              name="emotion"
              id="emotion"
              value={state.emotion}
              onChange={handleChangeState}
              className="d-inline my-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default React.memo(DiaryEditor);
