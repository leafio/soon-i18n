import Content from "./components/Content";

import "./App.css";

import SwitchLang from "./components/SwitchLang";

function App() {
  return (
    <div className="app card">
      <div>app.tsx</div>
      <SwitchLang />
      <Content />
    </div>
  );
}

export default App;
