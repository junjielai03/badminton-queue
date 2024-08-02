import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

const QueueAndStackComponent = ({ title }) => {
  // Initialize the queue and stack state
  const [queue, setQueue] = useState([]);
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to add an item to the queue or stack
  const addToQueue = () => {
    if (inputValue.trim() !== '' && !queue.includes(inputValue) && !stack.includes(inputValue)) {
      if (queue.length === 0 && stack.length < 2) {
        // If queue is empty and stack has less than 2 items, add to stack
        setStack([...stack, inputValue]);
      } else {
        // Otherwise, add to the queue
        setQueue([...queue, inputValue]);
      }
      setInputValue(''); // Clear the input field
    }
  };

  // Function to remove a specific item from the queue
  const removeFromQueueByIndex = (index) => {
    setQueue(queue.filter((_, i) => i !== index));
  };

  // Function to remove a specific name from the queue
  const removeFromQueueByName = () => {
    setQueue(queue.filter((item) => item !== inputValue));
    setInputValue(''); // Clear the input field
  };

  // Function to remove the first item from the stack and refill from the queue
  const removeFirstFromStack = () => {
    if (stack.length > 0) {
      const newStack = stack.slice(1);
      if (queue.length > 0) {
        newStack.push(queue[0]);
        setQueue(queue.slice(1));
      }
      setStack(newStack);
    }
  };

  // Function to remove the second item from the stack and refill from the queue
  const removeSecondFromStack = () => {
    if (stack.length > 1) {
      const newStack = [stack[0]];
      if (queue.length > 0) {
        newStack.push(queue[0]);
        setQueue(queue.slice(1));
      }
      setStack(newStack);
    }
  };

  // Automatically move items from the queue to the stack when necessary
  useEffect(() => {
    if (stack.length < 2 && queue.length > 0) {
      const newStack = [...stack];
      while (newStack.length < 2 && queue.length > 0) {
        newStack.push(queue[0]);
        setQueue(queue.slice(1));
      }
      setStack(newStack);
    }
  }, [queue, stack]);

  return (
    <div className="component">
      <h1>{title}</h1>
      <h2>On Court</h2>
      <ul>
        {stack.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <button onClick={removeFirstFromStack} disabled={stack.length < 1}>Remove First</button>
        <button onClick={removeSecondFromStack} disabled={stack.length < 2}>Remove Second</button>
      </div>
      <h2>Queue</h2>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
        <button onClick={addToQueue}>Add Name</button>
        <button onClick={removeFromQueueByName}>Remove Name</button>
      </div>
      <ul>
        {queue.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeFromQueueByIndex(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
const App = () => {
  return (
    <div className="container">
      <div className="half">
        <QueueAndStackComponent title="Court 1" />
      </div>
      <div className="half">
        <QueueAndStackComponent title="Court 2" />
      </div>
    </div>
  );
};

export default App;
