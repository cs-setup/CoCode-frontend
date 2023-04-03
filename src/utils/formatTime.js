const formatTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
  
    const diffSeconds = Math.floor((now - date) / 1000);
  
    if (diffSeconds < 60) {
      return '刚刚';
    } else if (diffSeconds < 3600) {
      return `${Math.floor(diffSeconds / 60)}分钟前`;
    } else if (diffSeconds < 86400) {
      return `${Math.floor(diffSeconds / 3600)}小时前`;
    } else if (diffSeconds < 604800) {
      return `${Math.floor(diffSeconds / 86400)}天前`;
    } else {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日`;
    }
}

export default formatTime