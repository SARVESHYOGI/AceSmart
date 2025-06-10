import express,{Router} from 'express';

const parentRoute = Router();

parentRoute.post("/login", (req, res) => {
    // Handle login
});

parentRoute.post("/register", (req, res) => {
    // Handle registration
});

export default parentRoute;
