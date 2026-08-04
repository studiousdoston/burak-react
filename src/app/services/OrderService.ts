import axios from "axios";
import { serverApi } from "../../lib/config";
import { Order, OrderItemInput } from "../../lib/types/order";

class OrderService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  //! ----- getMyOrders -----
  public async getMyOrders(): Promise<Order[]> {
    return [];
  }

  //! ----- createOrder -----
  public async createOrder(input: OrderItemInput): Promise<Order> {
    try {
      const url = `${serverApi}/order/create`;
      const result = await axios.post(url, input, { withCredentials: true });
    } catch (err) {
      console.log("ERROR, createOrder: ", err);
      throw err;
    }
  }
}

export default OrderService;
