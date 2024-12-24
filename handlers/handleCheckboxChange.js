const handleCheckboxChange = (id) => {
    setInvolved((prev) => {
      if (prev.includes(id)) {
        // If person is already involved, remove them
        return prev.filter((p) => p !== id);
      } else {
        // Otherwise, add them to the list
        return [...prev, id];
      }
    });
  };
  export default handleCheckboxChange;