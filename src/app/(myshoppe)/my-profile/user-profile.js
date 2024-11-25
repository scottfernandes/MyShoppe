"use client";

import React, { useState } from "react";
import styles from "@/app/(myshoppe)/my-profile/user-profile.module.css";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  const [activeTab, setActiveTab] = useState("personalInfo");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
   
  });

  const [passwordData,setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const orders = [
    { id: 12345, status: "Delivered", link: "#" },
    { id: 67890, status: "Shipped", link: "#" },
    { id: 11223, status: "Processing", link: "#" },
  ];

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Changes saved successfully!");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2 className={styles.heading}>My Profile</h2>
          <ul className={styles.menu}>
            <li
              className={`${styles.menuItem} ${
                activeTab === "personalInfo" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("personalInfo")}
            >
              Personal Information
            </li>
            <li
              className={`${styles.menuItem} ${
                activeTab === "addresses" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("addresses")}
            >
              Addresses
            </li>
            <li
              className={`${styles.menuItem} ${
                activeTab === "myOrders" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("myOrders")}
            >
              My Orders
            </li>
            <li
              className={`${styles.menuItem} ${
                activeTab === "changePass" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("changePass")}
            >
              Change Password
            </li>
            <li
              className={`${styles.menuItem} ${styles.logout}`}
              onClick={signOut}
            >
              Log Out
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === "personalInfo" && (
            <div>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h2 className={styles.sectionTitle}>Addresses</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Address:</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Save Address
                </button>
              </form>
            </div>
          )}
          {activeTab==="changePass" && (
            <>
            <h2 className={styles.subSectionTitle}>Change Password</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter your current password"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Save Changes
                </button>
            </>
          )}
          {activeTab === "myOrders" && (
            <div>
              <h2 className={styles.sectionTitle}>My Orders</h2>
              {orders.length > 0 ? (
                <ul className={styles.orderList}>
                  {orders.map((order) => (
                    <li key={order.id} className={styles.orderItem}>
                      <span>Order #{order.id}</span>
                      <span>Status: {order.status}</span>
                      <a href={order.link} className={styles.detailsLink}>
                        View Details
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.noOrders}>No orders found!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
