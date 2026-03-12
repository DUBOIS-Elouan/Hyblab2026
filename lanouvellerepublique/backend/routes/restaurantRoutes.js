import express from 'express';
const restaurantRoutes = express.Router();
import { getAllRestaurant, getRestaurantCat, getRestaurantPos} from '../controllers/restaurantController.js';

restaurantRoutes.get('/', getAllRestaurant);
restaurantRoutes.get('/getRestaurantCat/:id', getRestaurantCat);
restaurantRoutes.get('/getRestaurantPos/:id', getRestaurantPos);

export default restaurantRoutes;
