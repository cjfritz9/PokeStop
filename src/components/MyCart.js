import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api';
import '../stylesheets/MyCart.css';

const MyCart = ({ loggedIn, priceTotal, setPriceTotal }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [updateQuantity, setUpdateQuantity] = useState(0);
  const [error, setError] = useState('');
  const Monetize = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  const token = localStorage.getItem('token');

  const getCurrentCart = async () => {
    const sessionCart = localStorage.getItem('cartItems');
    const cartArr = sessionCart ? JSON.parse(sessionCart) : null;
    // const cartid = loggedIn ? await getCartId() : null;
    // if (!loggedIn && sessionCart) {
    setCart(cartArr);
    // cartTotal();
    // } else if (loggedIn && !sessionCart) {
    //   console.log('logged in and no session cart');
    //   setCart(await fetchCustomerCart());
    //   // cartTotal();
    // } else if (loggedIn && sessionCart) {
    //   await Promise.all(
    //     cartArr.map((cartItem) => {
    //       addCartItemsToExistingCart({
    //         productid: cartItem.id,
    //         quantity: cartItem.quantity
    //       });
    //     })
    //   );
    //   setCart(await fetchCustomerCart());
    //   localStorage.removeItem('cartItems');
    //   // cartTotal();
    //   // console.log("LOCAL + DB CART", cart)
    // } else {
    //   setCart([]);
    // }
  };

  const getCartId = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart_products/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomerCart = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart_products/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      setCart([]);
    }
  };

  const addCartItemsToExistingCart = async ({
    cartid,
    productid,
    quantity
  }) => {
    // console.log("CART ITEM", cartItem)
    try {
      const response = await fetch(`${BASE_URL}/cart_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          cartid,
          productid,
          quantity
        })
      });
      const result = await response.json();
    } catch (error) {
      console.error(error);
      setCart([]);
    }
  };

  const handleDelete = async (id, cartItemPrice) => {
    setPriceTotal(priceTotal - cartItemPrice);
    // if (loggedIn) {
    //   try {
    //     const response = await fetch(`${BASE_URL}/cart_products`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //       },
    //       body: JSON.stringify({
    //         id
    //       })
    //     });
    //     const result = await response.json();
    //     console.log('DEL RESULT', id, result.deletedProduct.id);
    //     await getCurrentCart();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    const storageCart = JSON.parse(localStorage.getItem('cartItems'));
    storageCart.map((item, i) => {
      item.id === id ? storageCart.splice(i, 1) : null;
    });
    if (storageCart.length) {
      localStorage.setItem('cartItems', JSON.stringify(storageCart));
    } else {
      localStorage.removeItem('cartItems');
    }
    getCurrentCart();
    // }
  };

  const handleQuantity = async (id, priceDifference) => {
    const currentTotal = priceTotal;

    if (priceDifference + priceTotal < 0) {
      setError('Nice Try');
    } else {
      try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const { data } = await response.json();

        if (data) {
          if (updateQuantity > data.inventorycount) {
            setError('Quantity exceeds Inventory');
            setPriceTotal(currentTotal);
            await getCurrentCart();
          } else if (loggedIn) {
            const response = await fetch(`${BASE_URL}/cart_products`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                id,
                quantity: updateQuantity
              })
            });
            const result = await response.json();
            // setError("")
            setPriceTotal(priceTotal + priceDifference);
            await getCurrentCart();
          } else {
            const storageCart = JSON.parse(localStorage.getItem('cartItems'));
            storageCart.map((item, i) => {
              item.id === id ? (item.quantity = updateQuantity) : null;
            });
            localStorage.setItem('cartItems', JSON.stringify(storageCart));
            // setError("")
            setPriceTotal(priceTotal + priceDifference);
            getCurrentCart();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const fetchCart = async () => {
      await getCurrentCart();
    };
    fetchCart();
  }, [loggedIn]);

  return (
    <div className='cart-wrap'>
      <div className='items-wrap'>
        <h1>Welcome to your Cart</h1>
        {error ? <div className='error'>{error}</div> : null}
        {cart && cart.length ? (
          cart.map((singleItem, i) => {
            return (
              <div className='cart-item' key={i}>
                <div id='img-name'>
                  <img
                    id='cp-img'
                    src={singleItem.imagelink}
                    width='50px'
                    height='75px'
                  />
                  <h2 id='cp-name'>{singleItem.name}</h2>
                  <div id='cp-si-price'>
                    {Monetize.format(Number(singleItem.price.replace(',', '')))}
                  </div>
                </div>
                <div id='qty-group'>
                  <div id='qty-txt'>Qty: </div>
                  <input
                    className='qty-input'
                    type='number'
                    min='1'
                    placeholder={singleItem.quantity}
                    onChange={(e) => setUpdateQuantity(e.target.value)}
                  ></input>
                  <i
                    id='edit'
                    className='fa-solid fa-pen-to-square fa-xl'
                    onClick={() =>
                      handleQuantity(
                        singleItem.id,
                        Number(singleItem.price.replace(',', '')) *
                          (updateQuantity - singleItem.quantity)
                      )
                    }
                  ></i>
                </div>
                <i
                  id='trash'
                  className='fa-solid fa-trash-can fa-xl'
                  onClick={() =>
                    handleDelete(
                      singleItem.id,
                      Number(singleItem.price.replace(',', '')) *
                        singleItem.quantity
                    )
                  }
                ></i>
                <h3 id='cp-ttl-price'>
                  Subtotal:{' '}
                  {Monetize.format(
                    Number(singleItem.price.replace(',', '')) *
                      singleItem.quantity
                  )}
                </h3>
                <div></div>
              </div>
            );
          })
        ) : (
          <h2>No Items In Cart</h2>
        )}
      </div>
      <div className='ttl-checkout'>
        <img
          id='umbreon'
          src='https://i.ibb.co/7JLS4QJ/imgbin-pixel-art-umbreon-pok-mon-pikachu-png.png'
        />
        <h2>Total: {Monetize.format(priceTotal)}</h2>
        {loggedIn ? (
          <button className='form-btn' onClick={goToCheckout}>
            Proceed to Checkout
          </button>
        ) : (
          <button className='form-btn' onClick={goToLogin}>
            Login to Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default MyCart;
