import styles from "./page.module.css";
import ProfilePic from "../components/profilePicture";
import Link from "next/link";
import { Card } from "antd";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.leftSection}>
        <h2 className={styles.leftTitle}>Lunexa</h2>
        <ProfilePic
          url="https://pyxis.nymag.com/v1/imgs/5ff/9bc/6098962edd260c49d52d4b2b58d4df0b62-13-miles-morales-lede.rsquare.w400.jpg"
          size="medium"
        />
        <div className={styles.userInfoContainer}>
          <h2>Miles Morales</h2>
          <h3>milesm@gmail.com</h3>
        </div>
        <div className={styles.linkContainer}>
          <Link
            className={styles.link}
            href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hollywoodreporter.com%2Fmovies%2Fmovie-news%2Fwhy-spider-man-spider-verse-is-important-fans-color-1168367%2F&psig=AOvVaw1HQRdoxMCTgTQ6v6Oz8tGW&ust=1755659376998000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiK7P3ylY8DFQAAAAAdAAAAABAM"
          >
            Dashboard
          </Link>
          <Link
            className={styles.link}
            href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hollywoodreporter.com%2Fmovies%2Fmovie-news%2Fwhy-spider-man-spider-verse-is-important-fans-color-1168367%2F&psig=AOvVaw1HQRdoxMCTgTQ6v6Oz8tGW&ust=1755659376998000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiK7P3ylY8DFQAAAAAdAAAAABAM"
          >
            Analytics
          </Link>
          <Link
            className={styles.link}
            href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hollywoodreporter.com%2Fmovies%2Fmovie-news%2Fwhy-spider-man-spider-verse-is-important-fans-color-1168367%2F&psig=AOvVaw1HQRdoxMCTgTQ6v6Oz8tGW&ust=1755659376998000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiK7P3ylY8DFQAAAAAdAAAAABAM"
          >
            Task List
          </Link>
          <Link
            className={styles.link}
            href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hollywoodreporter.com%2Fmovies%2Fmovie-news%2Fwhy-spider-man-spider-verse-is-important-fans-color-1168367%2F&psig=AOvVaw1HQRdoxMCTgTQ6v6Oz8tGW&ust=1755659376998000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiK7P3ylY8DFQAAAAAdAAAAABAM"
          >
            Tracking
          </Link>
          <Link
            className={styles.link}
            href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hollywoodreporter.com%2Fmovies%2Fmovie-news%2Fwhy-spider-man-spider-verse-is-important-fans-color-1168367%2F&psig=AOvVaw1HQRdoxMCTgTQ6v6Oz8tGW&ust=1755659376998000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKiK7P3ylY8DFQAAAAAdAAAAABAM"
          >
            Settings
          </Link>
        </div>
      </div>
      <div className={styles.sectionDivider} />
      <div className={styles.middleSection}>
        <div className={styles.pageHeaders}>
          <h1>Hello, Miles</h1>
          <h4 className={styles.subtitle}>Today is Monday, 18 August 2025</h4>
        </div>
        <div className={styles.cardSection}>
          <Card
            className={styles.matchesCard}
            title="Matches"
            extra={<a href="#">Explore</a>}
            style={{ width: 264, height: 264 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            className={styles.feedbackCard}
            title="Feedback Forms"
            extra={<a href="#">Complete</a>}
            style={{ width: 264, height: 264 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            className={styles.appointmentCard}
            title="Appointments"
            extra={<a href="#">View</a>}
            style={{ width: 264, height: 264 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.lowerLeft}>
            <h2 className={styles.lowerTitle}>Tasks for Today</h2>
            <div className={styles.taskContainer}>
              <Card
                className={styles.card}
                title="Confirm with Peter"
                extra={<a href="#">View</a>}
                style={{ width: 400, height: 124 }}
              >
                <p>Card content</p>
              </Card>
              <Card
                className={styles.card}
                title="Confirm with Mike"
                extra={<a href="#">View</a>}
                style={{ width: 400, height: 124 }}
              >
                <p>Card content</p>
              </Card>
            </div>
          </div>
          <div className={styles.lowerRight}>
            <h2 className={styles.lowerTitle}>Statistics</h2>
            <div className={styles.statContainer}>
              <Card className={styles.card} style={{ width: 124, height: 124 }}>
                <h2>50</h2>
                <p>Matches</p>
              </Card>
              <Card className={styles.card} style={{ width: 124, height: 124 }}>
                <h2>30 h</h2>
                <p>Tracked Time</p>
              </Card>
              <Card className={styles.card} style={{ width: 124, height: 124 }}>
                <h2>3</h2>
                <p>Mentees</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sectionDivider} />
      <div className={styles.rightSection}>
        <h2 className={styles.rightTitle}>Calendar</h2>
        <div className={styles.daySummary}>
          <h4 className={styles.rightSubtitle}>Aug 18, 2025</h4>
          <div className={styles.calendarCard}>
            <h2 className={styles.cardTime}>10:00</h2>
            <div className={styles.colorBlock}></div>
            <div className={styles.cardInfo}>
              <h4 className={styles.category}>Mentorship</h4>
              <h4 className={styles.description}>Intro to Senior SWE</h4>
            </div>
          </div>
          <div className={styles.calendarCard}>
            <h2 className={styles.cardTime}>10:00</h2>
            <div className={styles.colorBlock}></div>
            <div className={styles.cardInfo}>
              <h4 className={styles.category}>Mentorship</h4>
              <h4 className={styles.description}>Intro to Senior SWE</h4>
            </div>
          </div>
        </div>
        <div className={styles.daySummary}>
          <h4 className={styles.rightSubtitle}>Aug 18, 2025</h4>
          <div className={styles.calendarCard}>
            <h2 className={styles.cardTime}>10:00</h2>
            <div className={styles.colorBlock}></div>
            <div className={styles.cardInfo}>
              <h4 className={styles.category}>Mentorship</h4>
              <h4 className={styles.description}>Intro to Senior SWE</h4>
            </div>
          </div>
          <div className={styles.calendarCard}>
            <h2 className={styles.cardTime}>10:00</h2>
            <div className={styles.colorBlock}></div>
            <div className={styles.cardInfo}>
              <h4 className={styles.category}>Mentorship</h4>
              <h4 className={styles.description}>Intro to Senior SWE</h4>
            </div>
          </div>
        </div>
        <div className={styles.daySummary}>
          <h4 className={styles.rightSubtitle}>Aug 18, 2025</h4>
          <div className={styles.calendarCard}>
            <h2 className={styles.cardTime}>10:00</h2>
            <div className={styles.colorBlock}></div>
            <div className={styles.cardInfo}>
              <h4 className={styles.category}>Mentorship</h4>
              <h4 className={styles.description}>Intro to Senior SWE</h4>
            </div>
          </div>
          <div className={styles.calendarCard}>
            <h2 className={styles.cardTime}>10:00</h2>
            <div className={styles.colorBlock}></div>
            <div className={styles.cardInfo}>
              <h4 className={styles.category}>Mentorship</h4>
              <h4 className={styles.description}>Intro to Senior SWE</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
