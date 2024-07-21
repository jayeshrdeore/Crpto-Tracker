import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "./Grid";
import List from "./List";
import { createTheme, ThemeProvider } from "@mui/material";
// import Grid from "../GridComponent/Grid";
// import "./styles.css";

export default function Tabs({ data }) {
    const [value, setValue] = useState("grid");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        width: "50vw",
        fontSize: "1.2rem",
        fontWeight: 600,
        fontFamily: "Inter",
        textTransform: "capitalize",
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#3a80e9",
            },
        },
    });

    return (
        <div style={{ marginTop: "3rem" }}>
            <ThemeProvider theme={theme}>
                <TabContext value={value} sx={{ color: "var(--white" }}>
                    <div style={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList variant="fullWidth" onChange={handleChange}>
                            <Tab label="Grid" value="grid" sx={style} />
                            <Tab label="List" value="list" sx={style} />
                        </TabList>
                    </div>
                    <TabPanel value="grid">
                        <div className="grid-flex">
                            {data.map((item, i) => (
                                <Grid coin={item} key={i} delay={(i%5)*0.1} />
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel style={{padding:"13px"}} value="list">
                        <div className="list-flex">
                            {data.map((item, i) => (
                                <List coin={item}  delay={(i%7)*0.1}/>
                            ))}
                        </div>
                    </TabPanel>
                </TabContext>
            </ThemeProvider>
        </div>
    );
}