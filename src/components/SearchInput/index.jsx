import React from "react";
import { Input } from "antd";

const SearchInput = () => {
  const onSearch = (value) => console.log(value);
  return (
    <>
      <Input.Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        size="large"
      />
    </>
  );
};

export default SearchInput;
