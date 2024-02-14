import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "../App.css";
import shoes from "../data/shoes.js";
import Detail from "./detail.js";
import Cart from "./Cart.js";
import { useState } from "react";
import { Route, Routes, Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  let [데이터, 데이터수정] = useState(shoes);
  let [더보기, 더보기수정] = useState(0);
  let [로딩중, 로딩중수정] = useState(false);
  let navigate = useNavigate();
  let localStorageVisit = JSON.parse(localStorage.getItem("visit"));
  let result = useQuery({
    queryKey: ["aaa"],
    queryFn: () => {
      return axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((a) => {
          return a.data;
        });
    },
  });
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand onClick={() => navigate("/")} className='cursor'>
            Navbar
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/detail")}>Detail</Nav.Link>
            <Nav.Link onClick={() => navigate("/event")}>Event</Nav.Link>
            <Nav.Link onClick={() => navigate("/cart")}>cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path='/'
          element={
            <>
              {localStorageVisit == null ? null : (
                <div className='cartRecord'>
                  <p>cart</p>
                  {localStorageVisit.map((a, i) => {
                    return <p key={i}>{a}</p>;
                  })}
                </div>
              )}

              <div className='main-bg'></div>
              <Container>
                <Row md={3}>
                  {데이터.map((a, i) => {
                    return (
                      <Card
                        navigate={navigate}
                        key={i}
                        a={a}
                        i={i}
                        데이터={데이터}
                      ></Card>
                    );
                  })}
                </Row>
                {로딩중 == true ? (
                  <div className='loading'>로딩중..</div>
                ) : null}

                <button
                  onClick={(e) => {
                    로딩중수정(true);
                    if (더보기 == 0) {
                      axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((결과) => {
                          let copy = [...데이터, ...결과.data];
                          데이터수정(copy);
                          로딩중수정(false);
                        })
                        .catch(() => {
                          console.log("실패함");
                        });
                      더보기수정(더보기 + 1);
                    } else if (더보기 == 1) {
                      axios
                        .get("https://codingapple1.github.io/shop/data3.json")
                        .then((결과) => {
                          let copy = [...데이터, ...결과.data];
                          데이터수정(copy);
                          로딩중수정(false);
                        })
                        .catch(() => {
                          console.log("실패함");
                        });
                      더보기수정(더보기 + 1);
                      e.target.style.visibility = "hidden";
                    }
                  }}
                >
                  더보기
                </button>

                <div>
                  {result.isLoading && "로딩중"}
                  {result.error && "에러"}
                  {result.data && result.data.name}
                </div>
              </Container>
            </>
          }
        />
        <Route path='/detail/:id' element={<Detail 데이터={데이터} />} />
        <Route path='*' element={<div>없는 페이지입니다</div>} />
        <Route
          path='/event'
          element={
            <div className='ta-center'>
              <h3>오늘의 이벤트</h3> <Outlet></Outlet>
            </div>
          }
        >
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path='two' element={<p>생일 기념 쿠폰 받기</p>} />
        </Route>
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <Col
      className='cursor'
      onClick={() => {
        props.navigate(`/Detail/${props.i}`);
      }}
    >
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width='80%'
        alt='1'
      />
      <h4>{props.a.title}</h4>
      <p>{props.a.content}</p>
    </Col>
  );
}

function VisitTab() {
  return <></>;
}

export default App;
