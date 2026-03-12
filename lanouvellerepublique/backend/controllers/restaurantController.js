import db from '../config/db.js';

export const getAllRestaurant = (req, res) => {
  try {
    res.json(db.Restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRestaurantCat = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = db.Restaurant.find(r => r.id === id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant non trouvé" });
    }

    const diet = db.Diet.find(d => d.id === id) || {};
    const cuisine = db.Cuisine_type.find(c => c.id === id) || {};
    const client = db.Client_type.find(cl => cl.id === id) || {};
    const service = db.Service.find(s => s.id === id) || {};

    const result = [{
      ...diet,
      ...cuisine,
      ...client,
      ...service
    }];

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRestaurantPos = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = db.Restaurant.find(r => r.id === id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant non trouvé" });
    }

    res.json([{
      latitude: restaurant.latitude,
      longitude: restaurant.longitude
    }]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
