# React Test Task - Questions and Answers

---

### **1. What is the difference between Component and PureComponent?**

**Answer:**

- **Component** re-renders every time its parent re-renders, regardless of whether props or state have changed.
- **PureComponent** skips re-renders if props and state haven't changed (uses shallow comparison).

**Example:**

```tsx
import React, { useState, memo } from 'react'

const Child = memo(({ count }) => {
  console.log('Child rendered')
  return <div>Count: {count}</div>
})

const Parent = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <Child count={count} />
    </div>
  )
}
export default Parent
```

**When it might break:**  
If props are objects or arrays, shallow comparison can lead to unnecessary re-renders:

```tsx
const Child = memo(({ user }) => <div>User: {user.name}</div>)
```

Solution: Memoize objects or arrays to prevent new references:

```tsx
const updateUser = () => setUser((prevUser) => ({ ...prevUser, name: 'Alice' }))
```

---

### **2. Why is using Context with shouldComponentUpdate dangerous?**

**Answer:**

- Context updates are not tied to props or state, so `shouldComponentUpdate` can block updates from Context.

**Example of the issue:**

```tsx
class Component extends React.Component {
  static contextType = MyContext

  shouldComponentUpdate(nextProps) {
    return nextProps.propName !== this.props.propName
  }

  render() {
    return <div>{this.context.propName}</div>
  }
}
```

Solution: Use functional components with `useContext` to ensure updates:

```tsx
const Component = () => {
  const value = useContext(MyContext)
  return <div>{value.propName}</div>
}
```

---

### **3. Describe 3 ways to pass information from a child to a parent.**

**Answer:**

1. **Callback Function:**
   Pass a function from the parent to the child. The child calls this function with the data.

   ```tsx
   const Parent = () => {
     const handleChildData = (text) => console.log('Data:', text)
     return <Child onSendData={handleChildData} />
   }

   const Child = ({ onSendData }) => (
     <button onClick={() => onSendData('Hello!')}>Send</button>
   )
   ```

2. **React Context:**
   Use Context to share data and updates.

   ```tsx
   const DataContext = createContext()

   const Parent = () => {
     const [data, setData] = useState('')
     return (
       <DataContext.Provider value={{ setData }}>
         <Child />
         <div>{data}</div>
       </DataContext.Provider>
     )
   }

   const Child = () => {
     const { setData } = useContext(DataContext)
     return <button onClick={() => setData('From child!')}>Send</button>
   }
   ```

3. **State Lifting:**
   Move shared state to the parent and pass down update functions.

   ```tsx
   const Parent = () => {
     const [childData, setChildData] = useState('')
     return <Child updateData={setChildData} />
   }

   const Child = ({ updateData }) => (
     <input onChange={(e) => updateData(e.target.value)} />
   )
   ```

---

### **4. Two ways to prevent components from re-rendering.**

1. **React.memo:**

   ```tsx
   const Child = React.memo(({ count }) => <div>{count}</div>)
   ```

   Prevents re-renders unless props change.

2. **useCallback and useMemo:**
   Optimize functions and derived data passed as props.
   ```tsx
   const increment = useCallback(() => setCount((prev) => prev + 1), [])
   ```

---

### **5. What is a Fragment and why use it?**

**Answer:**
Fragments group elements without adding extra DOM nodes.  
**Example:**

```tsx
<>
  <h1>Title</h1>
  <p>Description</p>
</>
```

---

### **6. Give 3 examples of the HOC pattern.**

1. **Fetching Data:**

   ```tsx
   const withData = (WrappedComponent, fetchData) => (props) => {
     const [data, setData] = useState(null)

     useEffect(() => {
       fetchData().then(setData)
     }, [])

     if (!data) return <div>Loading...</div>
     return <WrappedComponent {...props} data={data} />
   }
   ```

2. **Authentication:**

   ```tsx
   const withAuth = (WrappedComponent) => (props) => {
     const isAuthenticated = true
     return isAuthenticated ? (
       <WrappedComponent {...props} />
     ) : (
       <div>Login required</div>
     )
   }
   ```

3. **Dynamic Styling:**
   ```tsx
   const withTheme = (WrappedComponent, theme) => (props) => (
     <WrappedComponent {...props} theme={theme} />
   )
   ```

---

### **7. How to handle exceptions in Promises, Callbacks, and async/await?**

**Promises:**

```tsx
fetch('URL')
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
```

**Callbacks:**

```tsx
fetchData((err, data) => {
  if (err) console.error(err)
  else console.log(data)
})
```

**async/await:**

```tsx
try {
  const res = await fetch('URL')
  const data = await res.json()
  console.log(data)
} catch (err) {
  console.error(err)
}
```

---

### **8. How many arguments does setState take, and why is it async?**

**Answer:**

- Takes **two arguments**:
  1. New state or updater function.
  2. Optional callback executed after state update.

**Why async?** React batches multiple `setState` calls for performance, reducing unnecessary re-renders.

---

### **9. Steps to migrate Class to Function Component**

1. Change `class` to `function`.
2. Replace `state` with `useState`.
3. Replace lifecycle methods with `useEffect`.
4. Remove `this`.

---

### **10. Ways to style components.**

- **Inline styles:** `<div style={{ color: "blue" }}>Text</div>`
- **CSS Modules:** Scoped styles for components.
- **Styled Components:** CSS-in-JS.
- **Tailwind CSS:** Utility-first framework.

---

### **11. How to render an HTML string from the server?**

**Basic method:** `dangerouslySetInnerHTML`.  
**Better options:**

1. **Sanitize with DOMPurify** to prevent XSS.
2. Use `html-react-parser` to convert HTML into React components.
