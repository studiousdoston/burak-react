import { useState, SyntheticEvent, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";

import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "./ordersSlice";
import "../../../css/order.css";
import { OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";

export default function OrdersPage() {
  const [value, setValue] = useState("1");
  const { orderBuilder } = useGlobals();
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });
  const dispatch = useDispatch();

  //* BACKEND DATA FETCHING
  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => {
        dispatch(setPausedOrders(data));
      })
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => {
        dispatch(setProcessOrders(data));
      })
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => {
        dispatch(setFinishedOrders(data));
      })
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder, dispatch]);

  //* HANDLERS
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={"/icons/default-user.svg"}
                  className={"order-user-avatar"}
                  alt="img"
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={"/icons/user-badge.svg"}
                    className={"order-user-prof-img"}
                    alt="img"
                  />
                </div>
              </div>
              <span className={"order-user-name"}>Martin</span>
              <span className={"order-user-prof"}>User</span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div className={"spec-address-txt"}>Do not exist</div>
            </Box>
          </Box>
          <Box className={"order-info-box"} sx={{ mt: "15px" }}>
            <input
              type={"text"}
              name={"cardNumber"}
              placeholder={"Card number : **** 4090 2002 7495"}
              className={"card-input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input
                type={"text"}
                name={"cardPeriod"}
                placeholder={"07 / 24"}
                className={"card-half-input"}
              />
              <input
                type={"text"}
                name={"cardCVV"}
                placeholder={"CVV : 010"}
                className={"card-half-input"}
              />
            </div>
            <input
              type={"text"}
              name={"cardCreator"}
              placeholder={"Justin Robertson"}
              className={"card-input"}
            />
            <div className={"cards-box"}>
              <img src={"/icons/western-card.svg"} alt="img" />
              <img src={"/icons/master-card.svg"} alt="img" />
              <img src={"/icons/paypal-card.svg"} alt="img" />
              <img src={"/icons/visa-card.svg"} alt="img" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
