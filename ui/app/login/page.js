"use client";
import styles from "./page.module.css";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  return (
    <div className={styles.pageContent}>
      <h1 className={styles.title}>Login</h1>
      <h4 className={styles.subTitle}>Enter your information to continue</h4>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.inputLabelContainer}>
            <h4>Email Address</h4>
          </div>
          <Input className={styles.input} size="large" placeholder="Email" />
          <div className={styles.inputLabelContainer}>
            <h4>Password</h4>
          </div>
          <Input className={styles.input} size="large" placeholder="Password" />
        </form>
        <Button variant="solid" type="primary" className={styles.submitButton}>
          Login
        </Button>
        <Link href="/" className={styles.forgotPassword}>
          Forgot Password?
        </Link>
        <div className={styles.signUpContainer}>
          <h4 className={styles.signUpTitle}>{"New to Lunexa?"}</h4>
          {/* TODO: create and link Forgot Password page */}
          <Link href="/" className={styles.createAccount}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
