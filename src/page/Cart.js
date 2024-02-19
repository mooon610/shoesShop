import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";
import { plusCount } from "../store";
import { useEffect } from "react";

function Cart() {
  let user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch()

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((a,i) => {
            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{cart[i].name}</td>
                <td>{cart[i].count}</td>
                <td><button onClick={()=>{
                  dispatch(plusCount(cart[i].id))
                }}>버튼</button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <button onClick={()=>{
        dispatch(changeName('aa'))
      }}>버튼</button>
    </>
  );
}

export default Cart;
