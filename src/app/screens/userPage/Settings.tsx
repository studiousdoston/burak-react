import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
     
export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg",
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDescription: authMember?.memberDescription,
      memberImage: authMember?.memberImage,
    },
  );

  //* HANDLERS
  const handleMemberNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const memberNick = e.target.value;
    setMemberUpdateInput((prev) => ({ ...prev, memberNick }));
  };

  const handleMemberPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const memberPhone = e.target.value;
    setMemberUpdateInput((prev) => ({ ...prev, memberPhone }));
  };

  const handleMemberAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const memberAddress = e.target.value;
    setMemberUpdateInput((prev) => ({ ...prev, memberAddress }));
  };
  const handleMemberDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const memberDescription = e.target.value;
    setMemberUpdateInput((prev) => ({ ...prev, memberDescription }));
  };

  const handleSubmit = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDescription === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 1500);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("file:", file);
    const fileType = file.type;
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
      return;
    }

    // update local state and preview
    setMemberUpdateInput((prev) => ({ ...prev, memberImage: file }) as any);
    setMemberImage(URL.createObjectURL(file));
  };

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img className={"mb-image"} src={memberImage} alt="User Avatar" />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label">
              <CloudDownloadIcon />
              <input type="file" hidden onChange={handleImage} />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={handleMemberNick}
          />
        </div>
      </Box>

      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone || "No phone"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={handleMemberPhone}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={
              authMember?.memberAddress
                ? authMember.memberAddress
                : "no address"
            }
            value={memberUpdateInput.memberAddress}
            name="memberAddress"
            onChange={handleMemberAddress}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={
              authMember?.memberDescription
                ? authMember.memberDescription
                : "No description"
            }
            value={memberUpdateInput.memberDescription}
            name="memberDescription"
            onChange={handleMemberDescription}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
