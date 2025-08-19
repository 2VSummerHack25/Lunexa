import styles from "../stylesheets/userInfo.module.css";
import ProfilePic from "../components/profilePicture";
import { MailOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button } from "antd";
{
}

export default function UserInfo() {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <ProfilePic
          url="https://pyxis.nymag.com/v1/imgs/5ff/9bc/6098962edd260c49d52d4b2b58d4df0b62-13-miles-morales-lede.rsquare.w400.jpg"
          size="small"
        />
        <div className={styles.userInfo}>
          <h2>Miles Morales</h2>
          <h4 className={styles.subtitle}>Design Engineer</h4>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.topButtons}>
            <Button type="primary" shape="circle" icon={<MailOutlined />} />
            <Button type="primary" shape="circle" icon={<EllipsisOutlined />} />
          </div>
          <Button className={styles.meetingButton} type="primary">
            Set up meeting
          </Button>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.cardBottom}>
        <h4 className={styles.subtitle}>Match Reason</h4>
        <h3>Mentorship</h3>
      </div>
    </div>
  );
}
