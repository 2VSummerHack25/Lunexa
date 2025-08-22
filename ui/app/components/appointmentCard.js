import styles from "../stylesheets/appointmentCard.module.css";
import { Button } from "antd";
import {
  MailOutlined,
  TeamOutlined,
  SlackOutlined,
  CalendarOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import ProfilePic from "../components/profilePicture";

export default function ReplaceWithComponentName() {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <ProfilePic
          url="https://pyxis.nymag.com/v1/imgs/5ff/9bc/6098962edd260c49d52d4b2b58d4df0b62-13-miles-morales-lede.rsquare.w400.jpg"
          size="small"
        />
        <div className={styles.userInfo}>
          <h2>User Name</h2>
          <h4 className={styles.subtitle}>Example Role</h4>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.topButtons}>
            <Button
              className={styles.circleButton}
              type="primary"
              shape="circle"
              icon={<MailOutlined />}
            />
            <Button
              className={styles.circleButton}
              type="primary"
              shape="circle"
              icon={<SlackOutlined />}
            />
            <Button
              className={styles.circleButton}
              type="primary"
              shape="circle"
              icon={<TeamOutlined />}
            />
          </div>
          <Button className={styles.meetingButton} type="primary">
            Set up meeting
          </Button>
        </div>
      </div>
      <div className={styles.meetingInfo}>
        <div className={styles.dateContainer}>
          <CalendarOutlined className={styles.calendarIcon} />
          <div className={styles.details}>
            <h4 className={styles.miniTitle}>Date & Time</h4>
            <h4>Thu, Aug 14, 2025 • 2:00-2:30 PM ET</h4>
          </div>
        </div>
        <div className={styles.meetingLinkInfo}>
          <VideoCameraOutlined className={styles.meetingIcon} />
          <div className={styles.details}>
            <h4 className={styles.miniTitle}>Online Meeting</h4>
            <div className={styles.linkContainer}>
              <h4>Join:meet.company.com/abc-123</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
