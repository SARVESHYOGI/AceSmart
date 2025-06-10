import express,{Router} from 'express';

const testRoute = Router();

testRoute.post("/login", (req, res) => {
    // Handle login
});

testRoute.post("/register", (req, res) => {
    // Handle registration
});

export default testRoute;
