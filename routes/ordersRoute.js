const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
router.get("/", (req, res) => {
	try {
		con.query("SELECT * FROM orders", (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	} catch (error) {
		console.log(error);
	}
});
router.post("/", (req, res) => {
	const {
		order_id,
		user_id,
		amount,
		shipping_address,
		order_email,
		order_date,
		order_status,
	} = req.body;
	try {
		con.query(
			`INSERT INTO orders (order_id,user_id,amount,shipping_address,order_email,order_date,order_status) values ("${order_id}","${user_id}","${amount}","${shipping_address}", "${order_email}", "${order_date}", "${order_status}")`,
			(err, result) => {
				if (err) throw err;
				res.send(result);
			}
		);
	} catch (error) {
		console.log(error);
	}
});

router.get("/:id", (req, res) => {
	try {
		con.query(
			`SELECT * FROM orders where order_id= ${req.params.id} `,
			(err, result) => {
				if (err) throw err;
				res.send(result);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});
router.put("/:id", (req, res) => {
	const {
		order_id,
		user_id,
		amount,
		shipping_address,
		order_email,
		order_date,
		order_status,
	} = req.body;
	try {
		con.query(
			`UPDATE orders SET order_id="${order_id}","${user_id}","${amount}","${shipping_address}", "${order_email}", "${order_date}", "${order_status}" WHERE order_id= ${req.params.id}`,
			(err, result) => {
				if (err) throw err;
				res.send(result);
			}
		);
	} catch (error) {
		console.log(error);
	}
});
router.delete("/:id", (req, res) => {
	try {
		con.query(
			`Delete from orders WHERE order_id= ${req.params.id}`,
			(err, result) => {
				if (err) throw err;
				res.send(result);
			}
		);
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
