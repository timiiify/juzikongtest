import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { AudioOutlined ,CameraOutlined  } from '@ant-design/icons';
const { Search } = Input;
const data = [
  {
    "text": "中国银行",
    "id": 1
  },
  {
    "text": "中国邮政",
    "id": 2
  },
  {
    "text": "中国移动",
    "id": 3
  },
  {
    "text": "上海天气",
    "id": 4
  },
  {
    "text": "中国电信",
    "id": 5
  },
  {
    "text": "上海市政府",
    "id": 6
  },
  {
    "text": "上海人口",
    "id": 7
  },
  {
    "text": "北京天气",
    "id": 8
  },
  {
    "text": "北京时间",
    "id": 9
  },
  {
    "text": "北京旅游攻略",
    "id": 10
  }
]
const suggestions = data.map(suggestion => suggestion.text);
const SearchBar = () => {
  const [inputValue, setInputValue] = useState(""); 
  const [suggestedWords, setSuggestedWords] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  useEffect(() => {
    const filteredSuggestions = suggestions.filter((word) =>
      word.startsWith(inputValue)
    );
    setSuggestedWords(filteredSuggestions);
  }, [inputValue]);

  const InputChange = (value) => {
    setInputValue(value);
    setShowSuggestions(true);
    setSelectedSuggestionIndex(-1);
  };

  const Select = (value) => {
    setInputValue(value);
    setShowSuggestions(false);
  };

  const onSearch = (value) => console.log(value);
  const KeyDown = (e) => {
    if (e.keyCode === 38) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.keyCode === 40) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestedWords.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (selectedSuggestionIndex !== -1) {
        setInputValue(suggestedWords[selectedSuggestionIndex]);
        setShowSuggestions(false);
      }
    }
  };

  return (
    <AutoComplete
    style={{ marginTop: 200 ,marginLeft: 650}}
      value={inputValue}
      dataSource={suggestedWords}
      onSelect={Select}
      onChange={InputChange}
      onKeyDown={KeyDown}
      onBlur={() => setShowSuggestions(false)}
    >
      <Search
      placeholder="请输入关键字"
      enterButton="搜索"
      size="large"
      allowClear
      onSearch={onSearch}
      onPressEnter={() => Select(inputValue)}
      suffix={<div><AudioOutlined /> <CameraOutlined /></div>}
    />
    </AutoComplete>
  );
};

export default SearchBar;