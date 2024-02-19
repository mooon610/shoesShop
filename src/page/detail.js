import { useParams } from "react-router-dom";
import "../Detail.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../store";

function Detail({데이터}) {
 let { id } = useParams();
 let 찾은상품 = 데이터.find((a) => id == a.id);
 let [알림창, 알림창변경] = useState(true);
 let [num, setNumber] = useState("");
 let [탭, 탭변경] = useState(0);
 let [fade, setFade] = useState('')
 let cart = useSelector((state) => state.cart);
 let dispatch = useDispatch()

 useEffect(()=>{
  if(localStorage.getItem('visit') == null){
    localStorage.setItem('visit',JSON.stringify([id]))
  } else {
    let copy = JSON.parse(localStorage.getItem('visit'))
    copy.unshift(id)
    let setCopy = new Set(copy)
    let newCopy = [...setCopy]
    localStorage.setItem('visit',JSON.stringify(newCopy))
  }
 },[])

 useEffect(()=>{
  setFade('end')
  return()=>{
    setFade('')
  }
 }, [])

 useEffect(() => {
  let timer = setTimeout(() => {
   알림창변경(false);
  }, 3000);
  return () => {
   clearTimeout(timer);
  };
 }, []);

 useEffect(() => {
  if (isNaN(num) == true) {
   alert("숫자만 쓰셈");
  }
 }, [num]);

 return (
  <div className={`container start ${fade}`}>
   {알림창 == true ? (
    <div className='count-box'>
     <span className='count'>3</span>초후에 사라짐
    </div>
   ) : null}

   <div className='row'>
    <div className='col-md-6'>
     <img src={`https://codingapple1.github.io/shop/shoes${Number(찾은상품.id) + 1}.jpg`} width='100%' alt='1' />
    </div>
    <div className='col-md-6'>
     <h4 className='pt-5'>{찾은상품.title}</h4>
     <p>{찾은상품.content}</p>
     <p>{찾은상품.price}</p>
     <button className='btn btn-danger' onClick={()=>{
      dispatch(order(찾은상품))
     }}>주문하기</button>
    </div>
   </div>

  <button className={`tabBtn ${탭 == 0 ? 'tabClick':''}`} onClick={()=>{
    탭변경(0)
  }}>1</button>
  <button className={`tabBtn ${탭 == 1 ? 'tabClick':''}`} onClick={()=>{
    탭변경(1)
  }}>2</button>
  <button className={`tabBtn ${탭 == 2 ? 'tabClick':''}`} onClick={()=>{
    탭변경(2)
  }}>3</button>
   <Tab 탭 ={탭}></Tab>

   <input
    type='text'
    onChange={(e) => {
     setNumber(e.target.value);
    }}
   ></input>
  </div>
 );
}

function Tab({탭}) {
  let [fade, setFade] = useState('')
 
 useEffect(()=>{
  setTimeout(() => {
    setFade('end')
  }, 100);
  return()=>{
    setFade('')
  }
 },[탭])
 
 return(
  <div className={`tab start ${fade}`}>
    {[<div>1번탭</div>, <div>2번탭</div>, <div>3번탭</div>] [탭]}
  </div>
 ) 
}

export default Detail;
