import React,{useEffect,useState} from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";

let fakeCartItems = [
  {
    foodItem: {
      images: [
        {
          public_id: "kaala_channa_chat image",
          url: "https://b.zmtcdn.com/data/dish_photos/94a/c01f4e8fcce05666b8a28eadd627394a.jpg?fit=around|130:130&crop=130:130;*,*",
          _id: "1",
        },
      ],
      name: "Kaala Channa Chat",
      price: 120,
      _id: "123",
    },
    quantity: 1,
    _id: "cart123",
  },
  {
    foodItem: {
      images: [
        {
          public_id: "Pani puri image",
          url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/FOOD_CATALOG/IMAGES/CMS/2024/3/11/b3734c76-eba3-4509-86ed-aa774e6336e4_e7abf189-300f-4cc7-bc9b-fc42a24c8178.png_compressed",
          _id: "2",
        },
      ],
      name: "Pani puri",
      price: 50,
      _id: "456",
    },
    quantity: 1,
    _id: "cart456",
  },
];

const Cart = ({oncartReduce}) => {
  const [data,setData]=useState(null);
  const [countCart,setCountCart]=useState(0);
  const removeCartItem=async (id,restName)=>{
    oncartReduce();
    setCountCart(countCart-1)
    let foodItems=await JSON.parse(localStorage.getItem('foodItems'));
    
    let filterfoodItems=[]
    filterfoodItems=await foodItems[restName].filter(item => item._id.$oid !== id);
    if(filterfoodItems.length==0)
    {
      delete foodItems[restName];
    }
    else{
      foodItems[restName]=filterfoodItems;
    }
    
    setData(foodItems);
    localStorage.setItem('foodItems',JSON.stringify(foodItems));
  }
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('foodItems')) || null;
    setData(storedData);

    const storedCartCount = parseInt(localStorage.getItem('cartItems'), 10) || 0;
    setCountCart(storedCartCount);
  },[])
  return (
    <>
      {data !=null ?
        (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{countCart} items</b>
          </h2>
          {Object.keys(data).map(key=>(
            <>
              <h3 className="mt-5">
                Restaurant: <b>{key}</b>
              </h3>
               {
                data[key].map((subItem,index)=>(
                  <div className="row d-flex justify-content-between align-items-center cartt border-bottom border-dark">
                    <div className="col-12 col-lg-8">
                        <div className="cart-item d-flex align-content-center" key={index}>
                          <div className="row">
                            <div className="col-4 col-lg-3">
                              {
                                <img
                                  src={subItem.images[0].url}
                                  alt="items"
                                  height="90"
                                  width="115"
                                />
                              }
                            </div>
                            <div className="col-5 col-lg-3">{subItem.name}</div>
                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                              <p id="card_item_price">
                                <LiaRupeeSignSolid />
                                {subItem.price}
                              </p>
                            </div>
                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                              <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus">-</span>
                                <input
                                  type="number"
                                  className="form-control count d-inline"
                                  value={1}
                                  readOnly
                                />
                                <span className="btn btn-primary plus">+</span>
                              </div>
                            </div>
                            <div onClick={()=>removeCartItem(subItem._id.$oid,key)} className="col-4 col-lg-1 mt-4 mt-lg-0">
                              <i
                                id="delete_cart_item"
                                className="fa fa-trash btn btn-danger"
                              ></i>
                            </div>
                          </div>
                   
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>
                          Subtotal:
                          <span className="order-summary-values">
                            {fakeCartItems.reduce(
                              (acc, item) => acc + Number(item.quantity),
                              0
                            )}
                            (Units)
                          </span>
                        </p>
                        <p>
                          Total:
                          <span className="order-summary-values">
                            <LiaRupeeSignSolid />
                            {fakeCartItems
                              .reduce(
                                (acc, item) =>
                                  acc + item.quantity * item.foodItem.price,
                                0
                              )
                              .toFixed(2)}
                          </span>
                        </p>
                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block">
                          Check Out
                        </button>
                      </div>
                    </div>
                    
             </div>
             
                ))
               }
             </>
          ))}
        </>
      ):
      <h2 className="mt-5">Your Cart is empty</h2>
    }
    </>
  );
};

export default Cart;
