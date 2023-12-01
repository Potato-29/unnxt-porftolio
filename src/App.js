import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

function App({ children }) {
  return (
    <>
      <Sidebar />
      <main className="h-screen -ml-[calc(0%-16.66667%)] px-3 py-4">
        {children}
      </main>
    </>
  );
}

export default App;
