      paypal.Buttons({
        createOrder() {
          return fetch("/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: [
                {
                  sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                  quantity: "YOUR_PRODUCT_QUANTITY",
                },
              ],
            }),
          })
          .then(response  => {
            if(response.ok) return response.json()
            return res.json().then(err =>Promise.reject(err))
          }).then(({id})=>{returnid})
        },
        onApprove(data, actions) {
          return actions.order.capture()
        }
      }).render('#paypal-button-container');
    