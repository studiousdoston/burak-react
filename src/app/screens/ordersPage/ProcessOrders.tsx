import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveProcessOrders } from "./ordersSelector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

//* REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => {
    return {
      processOrders: processOrders,
    };
  },
);

interface ProcessOrderProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrderProps) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  //* HANDLERS
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date()); //* ORDER REBUILD
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders.map((order) => {
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
                        <p>${orderItem?.itemPrice}</p>
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
                <p className={"data-compl"}>
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"verify-button"}
                  onClick={finishOrderHandler}
                >
                  Verify to Fulfil
                </Button>
              </Box>
            </Box>
          );
        })}

        {(!processOrders || processOrders.length === 0) && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              alt="img"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
