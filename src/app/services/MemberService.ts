import axios from "axios";

import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      let url = `${this.path}/member/top-users`;

      const result = await axios.get(url);
      console.log("GetTopUsers:", result);
      return result.data;
    } catch (err) {
      console.log("ERROR, getTopUsers:", err);
      throw err;
    }
  }
}
export default MemberService;
