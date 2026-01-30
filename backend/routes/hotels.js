const express = require("express");
const router = express.Router();
const {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  addReview,
} = require("../controllers/hotelController");
const {
  searchHotels: searchTBOHotels,
  getAgencyBalance,
  getCountryList,
  getCityList,
  getHotelCodeList,
  getHotelDetails,
  browseHotels,
} = require("../controllers/hotelTBOController");
const { protect, authorize } = require("../middleware/auth");

// TBO Hotel Routes (Must be before /:id)
router.post("/search", searchTBOHotels);
router.post("/browse", browseHotels);
router.get("/balance", protect, authorize("admin"), getAgencyBalance);
router.get("/static/countries", getCountryList);
router.post("/static/cities", getCityList);
router.post("/static/hotel-codes", getHotelCodeList);
router.post("/static/hotel-details", getHotelDetails);

router.route("/").get(getHotels).post(protect, authorize("admin"), createHotel);

router
  .route("/:id")
  .get(getHotel)
  .put(protect, authorize("admin"), updateHotel)
  .delete(protect, authorize("admin"), deleteHotel);

router.post("/:id/reviews", protect, addReview);

module.exports = router;
