import axios from "axios";
import React, { useEffect, useState } from "react";
import LineChart from "../Components/CoinPage/LineChart";
import Info from "../Components/CoinPage/Info";
import SelectCoin from '../Components/CoinPage/SelectCoin'
import SelectDays from '../Components/CoinPage/SelectDays'
import Toggle from '../Components/CoinPage/Toggle'
import Header from "../Components/Header/Header";
import Loading from "../Components/DashboardPage/Loading";
import List from "../Components/DashboardPage/List";
import { ConvertNumbers } from "../Functions/ConverNumber";
import { getDate } from "../Functions/getDate";
import getCoinPrices from "../Functions/getCoinPrices";
import getCoinData from "../Functions/getCoinData";


function Compare() {
    const [coin1, setCoin1] = useState("bitcoin");
    const [coin2, setCoin2] = useState("ethereum");
    const [days, setDays] = useState(90);
    const [priceType, setPriceType] = useState("prices");
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coinData1, setCoinData1] = useState({});
    const [coinData2, setCoinData2] = useState({});

    const DASHBOARD_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{}],
    });

    const options = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            y: {
                type: "linear",
                display: true,
                position: "left",
                ticks:
                    priceType == "market_caps"
                        ? {
                            callback: function (value) {
                                return "$" + ConvertNumbers(value);
                            },
                        }
                        : priceType == "total_volumes"
                            ? {
                                callback: function (value) {
                                    return ConvertNumbers(value);
                                },
                            }
                            : {
                                callback: function (value, index, ticks) {
                                    return "$" + value.toLocaleString();
                                },
                            },
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",
                ticks:
                    priceType == "market_caps"
                        ? {
                            callback: function (value) {
                                return "$" + ConvertNumbers(value);
                            },
                        }
                        : priceType == "total_volumes"
                            ? {
                                callback: function (value) {
                                    return ConvertNumbers(value);
                                },
                            }
                            : {
                                callback: function (value, index, ticks) {
                                    return "$" + value.toLocaleString();
                                },
                            },
            },
        },
    };

    useEffect(() => {
        axios
            .get(DASHBOARD_API_URL)
            .then((response) => {
                setAllCoins(response.data);
            })
            .catch((error) => {
                console.log("Error>>>", error);
            });

        getCoinsData();
    }, []);

    const getCoinsData = async () => {
        const data1 = await getCoinData(coin1);
        const data2 = await getCoinData(coin2);

        if (data1) {
            setCoinData1({
                id: data1.id,
                name: data1.name,
                symbol: data1.symbol,
                image: data1.image.large,
                desc: data1.description.en,
                price_change_percentage_24h:
                    data1.market_data.price_change_percentage_24h,
                total_volume: data1.market_data.total_volume.usd,
                current_price: data1.market_data.current_price.usd,
                market_cap: data1.market_data.market_cap.usd,
            });
        }

        if (data2) {
            setCoinData2({
                id: data2.id,
                name: data2.name,
                symbol: data2.symbol,
                image: data2.image.large,
                desc: data2.description.en,
                price_change_percentage_24h:
                    data2.market_data.price_change_percentage_24h,
                total_volume: data2.market_data.total_volume.usd,
                current_price: data2.market_data.current_price.usd,
                market_cap: data2.market_data.market_cap.usd,
            });
        }
        getPrices(coin1, coin2, days, priceType);
        setLoading(false);
    };

    const getPrices = async (coin1, coin2, days, priceType) => {
        const prices1 = await getCoinPrices(coin1, days, priceType);
        const prices2 = await getCoinPrices(coin2, days, priceType);

        setChartData({
            labels: prices1?.map((data) => getDate(data[0])),
            datasets: [
                {
                    label: coin1.slice(0, 1).toUpperCase() + coin1.slice(1),
                    data: prices1?.map((data) => data[1]),
                    borderWidth: 1,
                    fill: false,
                    tension: 0.25,
                    backgroundColor: "transparent",
                    borderColor: "#3a80e9",
                    pointRadius: 0,
                    yAxisID: "y",
                },
                {
                    label: coin2.slice(0, 1).toUpperCase() + coin2.slice(1),
                    data: prices2?.map((data) => data[1]),
                    borderWidth: 1,
                    fill: false,
                    tension: 0.25,
                    backgroundColor: "transparent",
                    borderColor: "#61c96f",
                    pointRadius: 0,
                    yAxisID: "y1",
                },
            ],
        });
    };

    const handleCoinChange = async (e, isCoin2) => {
        if (!isCoin2) {
            setCoin1(e.target.value);
            const data1 = await getCoinData(e.target.value);
            if (data1) {
                setCoinData1({
                    id: data1.id,
                    name: data1.name,
                    symbol: data1.symbol,
                    image: data1.image.large,
                    desc: data1.description.en,
                    price_change_percentage_24h:
                        data1.market_data.price_change_percentage_24h,
                    total_volume: data1.market_data.total_volume.usd,
                    current_price: data1.market_data.current_price.usd,
                    market_cap: data1.market_data.market_cap.usd,
                });
                getPrices(e.target.value, coin2, days, priceType);
            }
        } else {
            setCoin2(e.target.value);
            const data2 = await getCoinData(e.target.value);
            if (data2) {
                setCoinData2({
                    id: data2.id,
                    name: data2.name,
                    symbol: data2.symbol,
                    image: data2.image.large,
                    desc: data2.description.en,
                    price_change_percentage_24h:
                        data2.market_data.price_change_percentage_24h,
                    total_volume: data2.market_data.total_volume.usd,
                    current_price: data2.market_data.current_price.usd,
                    market_cap: data2.market_data.market_cap.usd,
                });
                getPrices(coin1, e.target.value, days, priceType);
            }
        }
    };

    const handlePriceChange = (event) => {
        setPriceType(event.target.value);
        getPrices(coin1, coin2, days, event.target.value);
    };

    return (
        <>
            <Header />
            <div className="div-flex">
                <p className="crypto-heading">Crypto 1</p>
                <SelectCoin
                    coin={coin1}
                    handleChange={(e) => handleCoinChange(e)}
                    allCoins={allCoins.filter((coin) => coin.id != coin2)}
                />
                <p className="crypto-heading">Crypto 2</p>
                <SelectCoin
                    coin={coin2}
                    handleChange={(e) => handleCoinChange(e, true)}
                    allCoins={allCoins.filter((coin) => coin.id != coin1)}
                />
                <SelectDays
                    noText={true}
                    days={days}
                    handleChange={(e) => {
                        setDays(e.target.value);
                        getPrices(coin1, coin2, e.target.value, priceType);
                    }}
                />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="grey-container">
                        <List coin={coinData1} />
                    </div>
                    <div className="grey-container">
                        <List coin={coinData2} />
                    </div>
                    <div className="grey-container">
                        <Toggle
                            priceType={priceType}
                            handleChange={handlePriceChange}
                        />
                        <LineChart chartData={chartData} options={options} />
                    </div>
                    <div className="grey-container">
                        <Info name={coinData1.name} desc={coinData1.desc} />
                    </div>
                    <div className="grey-container" style={{ marginBottom: "2rem" }}>
                        <Info name={coinData2.name} desc={coinData2.desc} />
                    </div>
                </>
            )}
        </>
    );
}

export default Compare;