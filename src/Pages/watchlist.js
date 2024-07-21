import React, { useEffect, useState } from "react";
import Tabs from "../Components/DashboardPage/Tabs";
import Header from "../Components/Header/Header";
import { get100Coins } from "../Functions/get100Coins";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import Button from "../components/Common/Button/Button";
// import Footer from "../components/Common/Footer/footer";
// import Header from "../components/Common/Header";
// import TopButton from "../components/Common/TopButton/topButton";
// import Tabs from "../components/Dashboard/Tabs/tabs";
// 
// import { get100Coins } from "../functions/get100Coins";
function WatchListPage() {
  const watchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").split(",")
    : [];

  const [coins, setCoins] = useState([]);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
    console.log("watchlist was changed");
  }, [watchlist]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await get100Coins();
    var myCoins = response.filter((coins) => watchlist.includes(coins.id));
    setCoins(myCoins);
  };

  return (
    <div style={{marginTop:"9rem",height:"75vh"}}>
      <Header />
      <div>
        {coins.length > 0 ? (
          <Tabs data={coins} />
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>
              Your watchlist is Currently Empty
            </h1>
            <p style={{ textAlign: "center", color: "var(--grey)" }}>
              Please Add Coins in your watchlist
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a href="/dashboard">
                <button className='landing-btn' style={{width:"15rem"}}>Back to Dashboard</button>
              </a>
            </div>
          </div>
        )}
      </div>
      <div onClick={() => topFunction()} id="myBtn" className="top-btn">
            <ArrowUpwardIcon sx={{ color: "var(--blue)" }} />
          </div>
      {/* <Footer /> */}
    </div>
  );
}

export default WatchListPage;