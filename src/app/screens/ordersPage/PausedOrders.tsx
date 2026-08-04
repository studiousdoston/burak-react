import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrders } from "./ordersSelector";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

//* REDUX SELECTOR
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => {
    return {
      pausedOrders: pausedOrders,
    };
  },
);

export default function PausedOrders() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  


  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((orderItem: OrderItem) => {
                  const product: Product | undefined = order.productData?.find(
                    (ele: Product) => orderItem.productId === ele._id,
                  );
                  const imagePath = product?.productImages?.[0]
                    ? `${serverApi}/${product.productImages[0]}`
                    : "/icons/noimage-list.svg";

                  return (
                    <Box key={orderItem._id} className={"orders-name-price"}>
                      <img
                        src={imagePath}
                        className={"order-dish-img"}
                        alt="img"
                      />
                      <p className={"title-dish"}>{product?.productName}</p>
                      <Box className={"price-box"}>
                        <p>${orderItem.itemPrice}</p>
                        <img src={"/icons/close.svg"} alt="img" />
                        <p>{orderItem.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} alt="img" />
                        <p style={{ marginLeft: "15px" }}>
                          ${orderItem.itemQuantity * orderItem.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product Total:</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img
                    src={"/icons/plus.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="img"
                  />
                  <p>Delivery Fee:</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="img"
                  />
                  <p>Total:</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  className={"cancel-button"}
                >
                  Cancel
                </Button>
                <Button variant="contained" className={"pay-button"}>
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {(!pausedOrders || pausedOrders.length === 0) && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 300, height: 300 }}
              alt="img"
            />
          </Box>
        )}
      </Stack>   
    </TabPanel>
  );
}
