import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Productdetails.css";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router";
import { Productcontext } from "../context/Productdata";
import Carousel from "./Carousel";
import { cartContax } from "../context/Cart";

export default function Productdetails() {

  const {addItem} = useContext(cartContax)

  const [product, setproduct] = useState({
    product_name: "",
    product_price: 0,
    product_stock: 0,
    product_images : [],
    product_desc: "",
    product_composition: "",
    product_usage: "",
  })
  const {getproductbyid} = useContext(Productcontext)

  const {id} = useParams();

  useEffect(() => {
    // console.log(id);
    getproductbyid(id).then((data) => {
      // console.log(data);
      setproduct({...data});
      // eslint-disable-next-line
    });
   
  }, [getproductbyid , id])

  
  
  const reducer = (state , action)=>{
    switch (action.type) {
      case 'add':
        return {numberofproduct : state.numberofproduct + 1};

      case 'subs':
        return {numberofproduct : state.numberofproduct - 1};  
    
      default:
        return {numberofproduct : state.numberofproduct};
    }
  }

  const [state, dispatch] = useReducer(reducer, {numberofproduct : 1});

  // console.log(state)

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={product.product_images.length>0?product.product_images[0].url:'https:reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'}
                    alt="..."
                  />
                </div>

                  {product.product_images.length>0 && product.product_images.map((curr , index)=>{
                    return (<Carousel key={index} img={curr.url} />)
                  })}

                {/* <div className="carousel-item">
                <img
                    src={product.product_images?product.product_images[1].url:"https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"}
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                <img
                    src={product.product_images?product.product_images[2].url:"https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"}
                    alt="..."
                  />
                </div> */}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <p className="newarrival text-center">NEW</p>
          </div>
          <div className="col-md-7">
            <h2>{product.product_name?product.product_name:"loading"}</h2>
            <p className="price">
              {" "}
              <b>${product.product_price?product.product_price:"loading"}</b>
            </p>
            <div className="rate">
              <input type="radio" id="star5" name="rate" value="5" />
              <label htmlFor="star5" title="text">
                5 stars
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label htmlFor="star4" title="text">
                4 stars
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label htmlFor="star3" title="text">
                3 stars
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label htmlFor="star2" title="text">
                2 stars
              </label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label htmlFor="star1" title="text">
                1 star
              </label>
              <p>
                <b> 2 Customer Reviews </b>
              </p>
            </div>
            <hr />

            <p>
            {product.product_composition?product.product_composition:"loading"}
            </p>
            <p>REF.4634/8563</p>
            <p>{product.product_stock?product.product_stock>0?'available':'out of stock':"loading"}</p>
            <div className="choosequantitycontainer">
              <div className="choosequantity"> Choose Quantity</div>
              <div className="quantity">
                <div className="quantityvalue">{state.numberofproduct}</div>
                <div className="changebtn">
                  <div className="choosequantityadd" onClick={()=>dispatch({type : "add"})}>+</div>
                  <div className="choosequantitysub" onClick={()=>dispatch({type : "subs"})}>-</div>
                </div>
              </div>
            </div>
            {/* <div className="quantity">
                {" "}
                Choose Quantity :
                <button className="minus-btn" type="button" name="button">
                  <img src="minus.png" alt="-" width="20px" height="20px" />
                </button>
                <input
                  type="number"
                  name="name"
                  value="1"
                  className="inputcontainer"
                />
                <button className="plus-btn" type="button" name="button">
                  <img src="add.jpg" alt="+" width="20px" height="20px" />
                </button>
              </div> */}
          </div>
        </div>
        <div className="productbtn">
              <button className="addtocartbtn" onClick={()=>addItem(id)}>
                Add to Cart
              </button>
              <button className="addtowishbtn"> Add to Wishlist</button>
            </div>
            <div className="product-details-content-social">
              <div className="product-details-content-social-text">
                Share with friends
              </div>
              <div className="social-media-icons">
                <ul>
                  <li>
                    <Link to="#">
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-instagram" aria-hidden="true"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fab fa-pinterest" aria-hidden="true"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
        <section className="product-content">
          <div className="container_desc">
            <h2 className="product-content-title">Description</h2>
            <p>
            {product.product_desc?product.product_desc:"loading"}
            </p>
            <p>
            {product.product_usage?product.product_usage:"loading"}
            </p>
          </div>
        </section>
        <section className="product-review">
          <div className="container">
            <h3 className="product-content-title">2 Reviews</h3>
            <div className="product-review-item">
              <div className="product-review-item-image">
                <Avatar />
              </div>
              <div className="product-review-item-content">
                <div className="product-review-item-star">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <h4 className="product-review-item-title">Mike Hardson</h4>
                <div className="product-review-item-meta">
                  20 Sep, 2021 <span>.</span> 4:00 pm
                </div>
                <p className="product-review-item-text">
                  Aliquam et facilisis arcuut olestie augue. Suspendisse sodales
                  tortor nunc quis auctor ligula posuere cursus duis aute irure
                  dolor in reprehenderit in voluptate velit esse cill doloreeu
                  fugiat nulla pariatur excepteur sint. Vivaus sed delly
                  molestie sapien. Aliquam et facilisis arcuut molestie augue.
                </p>
              </div>
              {/* <hr /> */}
            </div>
            <div className="product-review-item">
              <div className="product-review-item-image">
                <Avatar src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=990&auto=webp&quality=75" />
              </div>
              <div className="product-review-item-content">
                <div className="product-review-item-star">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <h4 className="product-review-item-title">Sarah Rose</h4>
                <div className="product-review-item-meta">
                  20 Sep, 2021 <span>.</span> 4:00 pm
                </div>
                <p className="product-review-item-text">
                  Aliquam et facilisis arcuut olestie augue. Suspendisse sodales
                  tortor nunc quis auctor ligula posuere cursus duis aute irure
                  dolor in reprehenderit in voluptate velit esse cill doloreeu
                  fugiat nulla pariatur excepteur sint. Vivaus sed delly
                  molestie sapien. Aliquam et facilisis arcuut molestie augue.
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <div className="review-container">
          <div className="addreview">Add a Review</div>
          <div className="ratethisproduct">Rate this Product? </div>
          <div className="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label htmlFor="star5" title="text">
              5 stars
            </label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label htmlFor="star4" title="text">
              4 stars
            </label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label htmlFor="star3" title="text">
              3 stars
            </label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label htmlFor="star2" title="text">
              2 stars
            </label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label htmlFor="star1" title="text">
              1 star
            </label>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label"
            ></label>
            <textarea
              className="form-control"
              placeholder="Write Message"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label"
            ></label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label"
            ></label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email Address"
            />
          </div>
          <button className="addtocartbtn">SUBMIT</button>
        </div>
      </div>
    </>
  );
}
