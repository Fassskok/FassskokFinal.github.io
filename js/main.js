var app = new Vue({
    el: "#app",
    data: {
      products: [
        {
          id: 1,
          title: "Adretta",
          short_text: "High-yielding variety with excellent taste.",
          image: "img/potato/potatoadretta.jpg",
          desc: "A German-bred potato variety known for its yellow flesh and soft texture when cooked.",
          plant: [
            "Strong vigor that provides good leaf coverage.",
            "Very high productivity with good fruit setting.",
            "Early matured variety."
          ],
          fruit: [
            "Long shelf life on plant and post harvest.",
            "Nice shiny attractive deep red color.",
            "Average fruit size: 140 – 160 grams."
          ]
        },
        {
          id: 2,
          title: "Bellarosa",
          short_text: "Early-maturing red-skinned potato.",
          image: "img/potato/potatobelarosa.jpg",
          desc: "Popular for its resistance to diseases and its ability to thrive in different climates.",
          plant: [
            "Compact growth with high resistance.",
            "Fast development and early harvest.",
            "Requires moderate watering."
          ],
          fruit: [
            "Bright red skin with a smooth surface.",
            "Medium-sized tubers with creamy flesh.",
            "Good storability and transportability."
          ]
        },
        {
          id: 3,
          title: "Gala",
          short_text: "Yellow-skinned potato with firm flesh.",
          image: "img/potato/potatogala.jpg",
          desc: "A versatile variety suitable for boiling, frying, and baking.",
          plant: [
            "Strong stems and lush foliage.",
            "Excellent disease resistance.",
            "Medium to late maturity."
          ],
          fruit: [
            "Firm, non-crumbling texture.",
            "Smooth yellow skin with shallow eyes.",
            "Ideal for multiple culinary uses."
          ]
        },
        {
          id: 4,
          title: "Nevsky",
          short_text: "One of the most popular Russian potato varieties.",
          image: "img/potato/potatonevski.jpg",
          desc: "Resistant to drought and diseases, with white flesh and a slightly sweet taste.",
          plant: [
            "Vigorous plant with good foliage cover.",
            "Adapted to different climatic conditions.",
            "Moderate growth rate."
          ],
          fruit: [
            "Oval tubers with smooth white skin.",
            "Great for frying and boiling.",
            "High starch content."
          ]
        },
        {
          id: 5,
          title: "Red Scarlett",
          short_text: "Smooth red skin with a creamy interior.",
          image: "img/potato/potatoredscarlet.jpg",
          desc: "A well-known variety appreciated for its long shelf life and great taste.",
          plant: [
            "Compact plant with strong resistance.",
            "Requires moderate watering and fertilization.",
            "Early harvest with high productivity."
          ],
          fruit: [
            "Attractive red-skinned tubers.",
            "Creamy interior with excellent taste.",
            "Stores well for long periods."
          ]
        }
      ],
      product: {},
      btnVisible: 0,
      cart: [],
      contactFields: {},
      orderSubmitted: false
    },
    mounted: function() {
      this.getProduct();
      this.checkInCart();
      this.cart = this.getCart();
    },
    methods: {
      makeOrder: function() {
        console.log("Order placed. User information:", this.contactFields);
        this.cart = [];
        localStorage.removeItem("cart");
        this.orderSubmitted = true;
      },
      addToCart: function(id) {
        var cart = [];
        if (window.localStorage.getItem("cart")) {
          cart = window.localStorage.getItem("cart").split(",");
        }
        if (cart.indexOf(String(id)) === -1) {
          cart.push(id);
          window.localStorage.setItem("cart", cart.join(","));
          this.btnVisible = 1;
        }
      },
      getProduct: function() {
        if (window.location.hash) {
          var id = window.location.hash.replace("#", "");
          if (this.products.length > 0) {
            for (let i in this.products) {
              if (this.products[i].id == id) {
                this.product = this.products[i];
              }
            }
          }
        }
      },
      checkInCart: function() {
        let cart = window.localStorage.getItem("cart")
          ? window.localStorage.getItem("cart").split(",")
          : [];
        this.btnVisible = cart.includes(String(this.product.id)) ? 1 : 0;
      },
      getCart: function() {
        let storedCart = window.localStorage.getItem("cart")
          ? window.localStorage.getItem("cart").split(",")
          : [];
        let cart = [];
        storedCart.forEach(id => {
          let product = this.products.find(item => item.id == id);
          if (product) {
            cart.push(product);
          }
        });
        return cart;
      },
      removeFromCart: function(index) {
        let stored = window.localStorage.getItem("cart");
        if (!stored) return;
        let storedCart = stored.split(",");
        let product = this.cart[index];
        let idStr = String(product.id);
        let newCart = storedCart.filter(item => item !== idStr);
        window.localStorage.setItem("cart", newCart.join(","));
        this.cart.splice(index, 1);
      }
    }
  });
  