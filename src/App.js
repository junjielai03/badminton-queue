import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

const QueueAndStackComponent = ({ title, queue, setQueue, stack, setStack }) => {
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
  }, [queue, stack, setQueue, setStack]);

  return (
    <div className="component">
      <h1>{title}</h1>
        <div className="court-container">
          {stack.length > 0 && (
            <div className="court-name">
              {stack[0]}
            </div>
          )}
          {stack.length > 1 && (
            <div className="court-name">
              {stack[1]}
            </div>
          )}
        </div>
      <div>
        <button onClick={() => removeFirstFromStack(stack, setStack, queue, setQueue)} disabled={stack.length < 1}>
          Remove First
        </button>
        <button onClick={() => removeSecondFromStack(stack, setStack, queue, setQueue)} disabled={stack.length < 2}>
          Remove Second
        </button>
      </div>
      <h2>Next:</h2>
      <div className="list-container">
        <ul>
          {queue.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => removeFromQueueByIndex(index, queue, setQueue)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper functions for managing queues and stacks
const addToQueue = (inputValue, queue, setQueue, stack, setStack) => {
  if (inputValue.trim() !== '' && !queue.includes(inputValue) && !stack.includes(inputValue)) {
    if (queue.length === 0 && stack.length < 2) {
      // If queue is empty and stack has less than 2 items, add to stack
      setStack([...stack, inputValue]);
    } else {
      // Otherwise, add to the queue
      setQueue([...queue, inputValue]);
    }
  }
};

const removeFromQueueByIndex = (index, queue, setQueue) => {
  setQueue(queue.filter((_, i) => i !== index));
};

const removeFromQueueByName = (name, queue, setQueue) => {
  setQueue(queue.filter((item) => item !== name));
};

const removeFirstFromStack = (stack, setStack, queue, setQueue) => {
  if (stack.length > 0) {
    const newStack = stack.slice(1);
    if (queue.length > 0) {
      newStack.push(queue[0]);
      setQueue(queue.slice(1));
    }
    setStack(newStack);
  }
};

const removeSecondFromStack = (stack, setStack, queue, setQueue) => {
  if (stack.length > 1) {
    const newStack = [stack[0]];
    if (queue.length > 0) {
      newStack.push(queue[0]);
      setQueue(queue.slice(1));
    }
    setStack(newStack);
  }
};

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedQueue, setSelectedQueue] = useState('court1');
  const [court1Queue, setCourt1Queue] = useState([]);
  const [court1Stack, setCourt1Stack] = useState([]);
  const [court2Queue, setCourt2Queue] = useState([]);
  const [court2Stack, setCourt2Stack] = useState([]);

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to add name to the selected queue
  const handleAddName = () => {
    
    // Make input case sensitive and split input by "/" and join together with whitespace
    const formattedName = inputValue
      .split("/")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (selectedQueue === 'court1') {
      addToQueue(formattedName, court1Queue, setCourt1Queue, court1Stack, setCourt1Stack);
    } else if (selectedQueue === 'court2') {
      addToQueue(formattedName, court2Queue, setCourt2Queue, court2Stack, setCourt2Stack);
    }
    setInputValue('');
  };

  // Function to remove name from the selected queue
  const handleRemoveName = () => {
    if (selectedQueue === 'court1') {
      removeFromQueueByName(inputValue, court1Queue, setCourt1Queue);
    } else if (selectedQueue === 'court2') {
      removeFromQueueByName(inputValue, court2Queue, setCourt2Queue);
    }
    setInputValue('');
  };

  return (
    <div className="container">
      <div className="half">
        <QueueAndStackComponent
          title="Court 1"
          queue={court1Queue}
          setQueue={setCourt1Queue}
          stack={court1Stack}
          setStack={setCourt1Stack}
        />
      </div>
      <div className="half">
        <QueueAndStackComponent
          title="Court 2"
          queue={court2Queue}
          setQueue={setCourt2Queue}
          stack={court2Stack}
          setStack={setCourt2Stack}
        />
      </div>
      <div className="input-section">
        <p className="instruction-text">Enter names separated by "/" if playing doubles. Example: "Bob/Joe"</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
        <select
          value={selectedQueue}
          onChange={(e) => setSelectedQueue(e.target.value)}
        >
          <option value="court1">Court 1</option>
          <option value="court2">Court 2</option>
        </select>
        <button onClick={handleAddName}>Add Name</button>
        <button onClick={handleRemoveName}>Remove Name</button>
      </div>
    </div>
  );
};

export default App;
