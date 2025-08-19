import { Avatar, Image } from "antd";
import styles from "../stylesheets/profilePicture.module.css";
import { UserOutlined } from "@ant-design/icons";

export default function ProfilePicture({ size, url }) {
  let width = 200;
  switch (size) {
    case "xsmall":
      width = 50;
      break;
    case "small":
      width = 100;
      break;
    case "medium":
      width = 150;
      break;
    case "large":
      width = 250;
      break;
    default:
      break;
  }
  if (url) {
    return (
      <Image
        className={styles.round}
        width={width}
        alt="Profile Picture"
        src={url}
      />
    );
  } else {
    return <Avatar size={width} icon={<UserOutlined />} />;
  }
}
