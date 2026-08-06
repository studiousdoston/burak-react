import axios from "axios";

import { serverApi } from "../../lib/config";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  //! ------- getTopUsers -------
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

  //! ------- getRestaurant -------
  public async getRestaurant(): Promise<Member> {
    try {
      const url = `${this.path}/member/restaurant`;
      const result = await axios.get(url);
      console.log("getRestaurant:", result);

      const restaurant: Member = result.data;
      return restaurant;
    } catch (err) {
      console.log("ERROR, getRestaurant:", err);
      throw err;
    }
  }

  //! ------- signup -------
  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = `${serverApi}/member/signup`;
      const result = await axios.post(url, input, { withCredentials: true });
      //console.log("signup:", result);
      const member = result.data.member;
      // console.log("member_info:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("ERROR, signup:", err);
      throw err;
    }
  }

  //! ------- login -------
  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = `${serverApi}/member/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      const member = result.data.member;
      console.log("LOGGEED IN USER:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("ERROR, login:", err);
      throw err;
    }
  }

  //! ------- logout -------
  public async logout(): Promise<void> {
    try {
      const url = `${serverApi}/member/logout`;
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout:", result);

      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("ERROR, logout:", err);
      throw err;
    }
  }

  //! ------- updateMember -------
  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberDescription", input.memberDescription || "");
      formData.append("memberImage", input.memberImage || "");

      const url = `${serverApi}/member/update`;
      const result = await axios(url, {
        method: "post",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("updateMember:", result);
      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("ERROR, updateMember:", err);
      throw err;
    }
  }
}
export default MemberService;
