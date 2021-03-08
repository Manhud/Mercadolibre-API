var express = require("express");

var app = express();
const axios = require('axios').default;

// =============================
// SEARCH PRODUCT
// =============================

app.get("/api/items", async (req, res) => {
  let query = req.query.search;
  try {
    const { data } = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
    items = data.results.map(product => (
      {
        id: product.id,
        title: product.title,
        price: {
          currency: product.currency_id,
          amount: product.price
        },
        picture: product.thumbnail,
        condition: product.condition,
        free_shipping: product.shipping.free_shipping
      }
    )

    ).slice(-4);
        res.status(200).json({
          author: {
            name: 'Juan',
            lastname: 'Rozo'
          },
          categories: data.filters,
          items
        });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
// =============================
// SEARCH PRODUCT BY ID
// =============================

app.get("/api/items/:id", async (req, res) => {

  var id = req.params.id;

  try {
    const { data } = await axios.get(`https://api.mercadolibre.com/items/${id}`)
    const  {data: description}  = await axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    res.status(200).json({
      author: {
        name: 'Juan',
        lastname: 'Rozo'
      },
      item: {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: data.price
        },
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quatity: data.sold_quantity,
        description: description.plain_text
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

module.exports = app;
