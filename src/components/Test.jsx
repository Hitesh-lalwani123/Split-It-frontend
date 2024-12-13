import React, { useState } from 'react';

function Test() {
  const persons = ['one', 'two', 'three']; // List of persons
  const [involved, setInvolved] = useState([]); // State to track selected persons

  // Handle checkbox change
  const handleCheckboxChange = (person) => {
    setInvolved((prev) => {
      if (prev.includes(person)) {
        // If person is already involved, remove them
        return prev.filter((p) => p !== person);
      } else {
        // Otherwise, add them to the list
        return [...prev, person];
      }
    });
  };

  return (
    <div>
      <h2>Persons</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={involved.includes(person)}
                onChange={() => handleCheckboxChange(person)}
              />
              {person}
            </label>
          </li>
        ))}
      </ul>
      <h3>Involved Persons:</h3>
      <ul>
        {involved.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
