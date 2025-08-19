import styles from "../stylesheets/userInfo.module.css";
import ProfilePic from "../components/profilePicture";
import { MailOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button } from "antd";
{
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
              <Button type="primary" shape="circle" icon={<MailOutlined />} />
              <Button
                type="primary"
                shape="circle"
                icon={<EllipsisOutlined />}
              />
            </div>
            <Button className={styles.meetingButton} type="primary">
              Set up meeting
            </Button>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.cardBottom}>
          <h4 className={styles.subtitle}>Match Reason</h4>
          <h3>{matchReason}</h3>
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
              <Button type="primary" shape="circle" icon={<MailOutlined />} />
              <Button
                type="primary"
                shape="circle"
                icon={<EllipsisOutlined />}
              />
            </div>
            <Button className={styles.meetingButton} type="primary">
              Set up meeting
            </Button>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.cardBottom}>
          <h4 className={styles.subtitle}>Match Reason</h4>
          <h3>Example Match Reason</h3>
        </div>
      </div>
    );
  }
}
