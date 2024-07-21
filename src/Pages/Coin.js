import List from '../Components/DashboardPage/List'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/DashboardPage/Loading";
import Header from "../Components/Header/Header";
import '../index.css'
import Info from '../Components/CoinPage/Info';
import getCoinData from '../Functions/getCoinData';
import LineChart from '../Components/CoinPage/LineChart';
import getCoinPrices from '../Functions/getCoinPrices';
import { getDate } from '../Functions/getDate';
import SelectDays from '../Components/CoinPage/SelectDays';
import Toggle from '../Components/CoinPage/Toggle';
import { ConvertNumbers } from '../Functions/ConverNumber';



function CoinPage() {
    const { id } = useParams();
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(7);
    const [priceType, setPriceType] = useState("prices");

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{}],
    });

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            y: {
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
        if (id) {
            getData();
        }
    }, [id]);

    const getData = async () => {
        // console.log("hii") 
        const data = await getCoinData(id);
        const prices = await getCoinPrices(id, days,priceType);


        if (data) {
            console.log("data", data)
            setCoin({
                id: data.id,
                name: data.name,
                symbol: data.symbol,
                image: data.image.large,
                desc: data.description.en,
                price_change_percentage_24h: data.market_data.price_change_percentage_24h,
                total_volume: data.market_data.total_volume.usd,
                current_price: data.market_data.current_price.usd,
                market_cap: data.market_data.market_cap.usd,
            });
            setLoading(false);
        }


        if (prices) {
            setChartData({
                labels: prices?.map((data) => getDate(data[0])),
                datasets: [
                    {
                        label: "Price",
                        data: prices?.map((data) => data[1]),
                        borderWidth: 1,
                        fill: false,
                        tension: 0.25,
                        backgroundColor: "transparent",
                        borderColor: "#3a80e9",
                        pointRadius: 0,
                    },
                ],
            });
        }
    }



    const handleDaysChange = async (event) => {
        console.log("handle change")
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value,priceType);
        if (prices) {
            setChartData({
                labels: prices?.map((data) => getDate(data[0])),
                datasets: [
                    {
                        label: "Price",
                        data: prices?.map((data) => data[1]),
                        borderWidth: 1,
                        fill: false,
                        tension: 0.25,
                        backgroundColor: "transparent",
                        borderColor: "#3a80e9",
                        pointRadius: 0,
                    },
                ],
            });
        }
    };

    const handlePriceChange = async (event) => {
        setPriceType(event.target.value);
        const prices = await getCoinPrices(id, days, event.target.value);
        if (prices) {
            setChartData({
                labels: prices?.map((data) => getDate(data[0])),
                datasets: [
                    {
                        label: "Price",
                        data: prices?.map((data) => data[1]),
                        borderWidth: 1,
                        fill: false,
                        tension: 0.25,
                        backgroundColor: "transparent",
                        borderColor: "#3a80e9",
                        pointRadius: 0,
                    },
                ],
            });
        }
    };



    return (
        <div>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            {loading ? (<Loading />) : (
                <>
                    <div className="grey-container">
                        <List coin={coin} delay={0.5} />
                    </div>
                    <div className="grey-container">
                        <SelectDays days={days} handleChange={handleDaysChange} />
                        <Toggle
                            priceType={priceType}
                            handleChange={handlePriceChange}
                        />
                        <LineChart chartData={chartData} options={options} />
                    </div>

                    <div className="grey-container">
                        <Info name={coin.name} desc={coin.desc} />
                    </div>
                </>
            )}
        </div>
    );
}
export default CoinPage;