import React, { useState } from 'react'
import "./Dashboard.css"
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import IconButton from "@mui/material/IconButton";
import { addToWatchlist } from "../../Functions/Watchlist";
import { removeFromWatchlist } from "../../Functions/Watchlist";

const Grid = ({ coin }) => {
  const isWatchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").includes(coin.id)
    : false;
  const [isAdded, setIsAdded] = useState(false);
  return (

    <div className={`grid-box ${coin.price_change_percentage_24h < 0 && "grid-box-red"}`}>
      <div className="grid-inner">
        <div className="info-flex">
          <img src={coin.image} className="coin-logo" />
          <div className="name-flex">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
        </div>
        {isWatchlist || isAdded ? (
        <div
          className="bookmark-icon-div"
          onClick={() => {
            setIsAdded(false);
            removeFromWatchlist(coin.id);
          }}
        >
          <IconButton>
            <BookmarkRoundedIcon className="bookmark-icon" />
          </IconButton>
        </div>
      ) : (
        <div
          className="bookmark-icon-div"
          onClick={() => {
            setIsAdded(true);
            addToWatchlist(coin.id);
          }}
        >
          <IconButton>
            <BookmarkBorderRoundedIcon className="bookmark-icon" />{" "}
          </IconButton>
        </div>
      )}
      </div>
        
      

      

      <a href={`/coin/${coin.id}`} className="grid-a">
        {coin.price_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="coin-chip">
              {coin.price_change_percentage_24h.toFixed(2) + " %"}
            </div>
            <TrendingUpRoundedIcon className="icon" />
          </div>
        ) : (
          <div className="chip-flex">
            <div className="coin-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2) + " %"}
            </div>
            <TrendingDownRoundedIcon className="icon chip-red" />
          </div>
        )}

        <p
          className="coin-price"
          style={{
            color:
              coin.price_change_percentage_24h < 0
                ? "var(--red)"
                : "var(--green)",
          }}
        >
          $ {coin.current_price.toLocaleString()}
        </p>
        <div>
          <p className="volume-text">
            <strong>Total Volume :</strong> ${coin.total_volume.toLocaleString()}
          </p>
          <p className="volume-text">
            <strong>Total Market Cap :</strong> $
            {coin.market_cap.toLocaleString()}
          </p>
        </div>
      </a>
    </div>

  )
}

export default Grid