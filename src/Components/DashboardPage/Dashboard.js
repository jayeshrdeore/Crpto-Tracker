import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Tabs from './Tabs';
import Header from '../Header/Header';
import Search from "./Search.js"
import Loading from './Loading';
import PaginationComponent from './Pagination';

const Dashboard = () => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCoins, setPageCoins] = useState([]);

  const DASHBOARD_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  var filteredCoins = data.filter((item) => {
    if (
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    }
  });

  useEffect(() => {
    axios
      .get(DASHBOARD_API_URL)
      .then((response) => {
        console.log("Response Data >>>", response.data);
        setData(response.data);
        setLoading(false);
        setPageCoins(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.log("Error>>>", error);
      });
  }, []);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  let mybutton = document.getElementById("myBtn");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }

  const handleChange = (event, value) => {
    setPageNumber(value);
    setPageCoins(data.slice((value - 1) * 10, (value - 1) * 10 + 10));
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />
          <Tabs data={search ? filteredCoins : pageCoins} />
          <div onClick={() => topFunction()} id="myBtn" className="top-btn">
            <ArrowUpwardIcon sx={{ color: "var(--blue)" }} />
          </div>
          {!search && (
            <PaginationComponent
              pageNumber={pageNumber}
              handleChange={handleChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard