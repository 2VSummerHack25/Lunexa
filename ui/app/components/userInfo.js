import styles from "../stylesheets/userInfo.module.css";
import ProfilePic from "../components/profilePicture";
import { MailOutlined, TeamOutlined, SlackOutlined } from "@ant-design/icons";
import { Button } from "antd";

{
  /* <SlackOutlined /> */
}

export default function UserInfo({ url, userName, userRole, matchReason }) {
  if (url && userName && userRole && matchReason) {
    return (
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <ProfilePic url={url} size="small" />
          <div className={styles.userInfo}>
            <h2>{userName}</h2>
            <h4 className={styles.subtitle}>{userRole}</h4>
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
        <div className={styles.divider} />
        <div className={styles.cardBottom}>
          <h4 className={styles.lowerTitle}>Match Reason</h4>
          <h3 className={styles.lowerReason}>{matchReason}</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <ProfilePic size="small" />
          <div className={styles.userInfo}>
            <h2>User Name</h2>
            <h4 className={styles.subtitle}>User Role</h4>
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
        <div className={styles.divider} />
        <div className={styles.cardBottom}>
          <h4 className={styles.lowerTitle}>Match Reason</h4>
          <h3 className={styles.lowerReason}>Example Match Reason</h3>
        </div>
      </div>
    );
  }
}
