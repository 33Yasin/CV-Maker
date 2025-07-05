import React from 'react';

function GeneralInfo({ userInfo, setUserInfo }) {
  // Input değiştiğinde state'i güncelleyen fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>General Info</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={userInfo.firstName}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={userInfo.lastName}
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userInfo.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={userInfo.phone}
        onChange={handleChange}
      />
    </div>
  );
}

export default GeneralInfo;
